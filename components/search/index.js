import React, { useEffect, useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CategBar,
  Container,
  Deals,
  GasPlate,
  HeaderBar,
  ListGas,
  SearchBar,
  variables,
} from "../globals/utils";
import { gasLift, gasWin } from "../globals/images";
import { COLORS } from "../globals/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
const Search = ({ navigation }) => {
  const dummDeals = ["dummy_1", "dummy_2", "dummy_3", "dummy_4", "dummy_5"];
  const [gassDeals, setGassDeals] = useState();
  const [AccDeals, setAccDeals] = useState();
  const [searchText, setSearchText] = useState();
  const [stationList, setStationList] = useState([]);
  const [categList, setCategList] = useState([]);
  const [userToken, setUserToken] = useState("default");
  const [userDetials, setUserDetails] = useState();

  useEffect(() => {
    (async () => {
      try {
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
      } catch (err) {
        alert("an error occured");
        console.log("here erro r", err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        axios
          .get(`${variables.HOST_URL}front_end_service/search`, {
            headers: { authorization: token },
          })
          .then((res) => {
            const { gass, acc } = res.data;

            setGassDeals(gass);
            setAccDeals(acc);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log("something went wrong", err);
      }
    })();
  }, []);

  return (
    //  <KeyboardAvoidingView   behavior="padding" enabled>

    <SafeAreaView
      style={
        {
          // backgroundColor:'red'
        }
      }
    >
      <HeaderBar text={"Search"} source={gasWin} />
      <SearchBar
        getText={(e) => {
          setSearchText(e);
        }}
        searchLogic={() => {
          const duplicate = gassDeals;
          const results = duplicate.filter((element) => {
            JSON.stringify(element)
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          setGassDeals(results);

          const anotherDuplicate = AccDeals;
          const anotherResults = anotherDuplicate.filter((element) => {
            JSON.stringify(element)
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          setAccDeals(anotherResults);
        }}
        custom={{
          marginTop: 10,
        }}
      />

      <View
        style={{
          width: "100%",
          // , borderWidth: 1,
          padding: 20,
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
          onClick={async (item) => {
            console.log("this is the selecdted ", item.gassStationName);
            const token = item.gassStationName;
            axios
              .get(
                `${variables.HOST_URL}front_end_service/gasService/gass_service`,
                {
                  headers: { authorization: userToken },
                  params: { gassId: token },
                }
              )
              .then((res) => {
                let station = res.data.data;
                navigation.navigate("Station", {
                  user: userDetials,
                  station: station,
                  token: userToken,
                  categList: categList,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          dealData={gassDeals}
        />
        {/* </ScrollView> */}

        <Text
          style={{
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        >
          Gass Accessories
        </Text>
        <Deals
          custom={{
            height: "35%",
          }}
          dealData={AccDeals}
          onClick={() => {
            navigation.navigate("Station");
          }}
        />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default Search;
