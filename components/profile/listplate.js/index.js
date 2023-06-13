import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertBox, CategBar, Deals, HeaderBar, variables } from "../../globals/utils";
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
  const [selected, setSelected] = useState();
  const [filterList, setFilterList]=useState()
  const [loader, setLoader]=useState(true)
useEffect(()=>{
  (async ()=>{
    const token = await AsyncStorage.getItem('Token')
    setUserToken(token)
  })()
})
  const updateOrder = async (method, to) => {
    const cartItems = selected
    axios
      .post(
        `${variables.HOST_URL}update_service/update_order`,
        {
          cartItems: cartItems,
          method: method,
          to: to,
        },
        { headers: { authorization: userToken } }
      )
      .then((res) => {
        alert("The Order was updated succesfully");
        navigation.navigate('Dashboard');
      })
      .catch((err) => {
        alert("something went wrong try again");
        console.log(err);
      });
  };

  const filterByCateg = (itemString) => {
    setLoader(true)
    let list = gasList.filter((item) => {
      console.log(item);
      console.log(item.gasCategories);
      return JSON.stringify(item)
        .toLocaleLowerCase()
        .includes(itemString.toLocaleLowerCase());
    });
    console.log(list);
    setFilterList(list);
    setLoader(false)
  };
  return (
    <SafeAreaView>
      <HeaderBar text={title} source={gasLift} custom={{ left: "350%" }} />

      <CategBar
        itemList={categList}
        handleCat={(e) => {
          console.log(e)
          filterByCateg(e)
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
            setSelected(item)
            if (title == "Orders") {
              navigation.navigate("DConfirm", {
                currPage: "Dashboard",
                chatPage: "DChat",
                cartItems:[item],
                nextPage: "DCallChat",
                token:userToken
              });
            } else if ( title == "Waiting") {
              setAlertBox(true)
            } else if (title == "Canceled") {
              alert("You canceled this order");
            }else if(title == 'Done'){
              alert("This order has been completed")
            }
          }}
          loader={loader}

          dealData={filterList ? filterList : gasList}
        />
        {/* </ScrollView> */}
      </View>
      {alertBox && (
        <AlertBox
          navTo={() => {
            updateOrder("done","Done")
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
