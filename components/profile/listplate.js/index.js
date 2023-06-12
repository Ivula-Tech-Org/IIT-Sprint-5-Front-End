import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertBox, CategBar, Deals, HeaderBar } from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ListPlate = ({ navigation, route }) => {
  const { title, gasList, accList } = route.params;
  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];
  const [alertBox, setAlertBox] = useState(false);
  const [userToken, setUserToken] = useState()
  const [userDetails, setUserDetails] = useState()
  const [categList, setCategList]=useState([])
  
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("Token");
      const details = jwtDecode(token);
      console.log("this is the token", token);
      setUserToken(token);
      setUserDetails(details);

      axios
        .get(`${variables.HOST_URL}front_end_service/categories`, {
          headers: { authorization: token },
        })
        .then(async (res) => {
          setUserToken(res.data.token);
          setCategList(res.data.data);

          await AsyncStorage.setItem("Token", res.data.token);
        })
        .catch((err) => {
          alert("Sorry an error occured");
        });
    })();
  },[]);
  return (
    <SafeAreaView>
      <HeaderBar text={title} source={gasLift} custom={{ left: "350%" }} />

      <CategBar
        itemList={categList}
        handleCat={() => {
          alert("handle");
        }}
      />
      <View
        style={{
          width: "100%",
          // , borderWidth: 1,
          padding: 20,
          height: "75%",
        }}
      >
        <Text
          style={{
            borderBottomWidth: 1,
          }}
        >
          Gass Deals
        </Text>
        {/* <ScrollView> */}
        <Deals
          custom={{
            height: "40%",
          }}
          onClick={(item) => {
            if (title == "Orders") {
              navigation.navigate("DConfirm", {
                currPage: "Dashboard",
                chatPage: "DChat",
                cartItems:[item],
                nextPage: "DCallChat",
              });
            } else if (title == "Confirmed" || title == "Waiting") {
              setAlertBox(true);
            } else if (title == "Canceled") {
              alert("You canceled this order");
            }
          }}
          dealData={gasList}
        />
        {/* </ScrollView> */}
      </View>
      {alertBox && (
        <AlertBox
          navTo={() => {
            alert("remove here");
            setAlertBox(false);
          }}
          options={{ main: "Is this delivered?", left: "No", right: "Yes" }}
          closePop={() => {
            setAlertBox(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default ListPlate;
