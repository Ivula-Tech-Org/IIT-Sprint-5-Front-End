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
  HeaderBar,
  ListGas,
  SearchBar,
  variables,
} from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Home = ({ navigation }) => {
  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];
  const [stationList, setStationList] = useState([]);
  const [categList, setCategList] = useState([]);
  const [userToken, setUserToken] = useState("default");
  const [userDetials, setUserDetails] = useState();
  const [filterList, setFilterList] = useState();
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("Token");
        const details = jwtDecode(token);
        console.log("this is the token", token);
        setUserToken(token);
        setUserDetails(details);

        axios
          .get(`${variables.HOST_URL}front_end_service`, {
            headers: { authorization: token },
          })
          .then(async (res) => {
            setStationList(res.data.data);
            console.log("station list", res.data.data);
          })
          .catch((err) => {
            alert("Sorry an error occured");
          });

      axios
      .get(`${variables.HOST_URL}front_end_service/categories`, {
        headers: { authorization: token },
      })
      .then(async (res) => {
        list = res.data.data;
        setCategList(list)
        console.log("inside ", list);
      })
      .catch((err) => {
        alert("Sorry an error occured");
      });
      } catch (err) {
        alert("something went wrong");
      }


    })();
  }, []);

  const filterByCateg = (itemString) => {
    let list = stationList.filter((item) => {
      console.log(item);
      console.log(item.gasCategories);
      return JSON.stringify(item.gasCategories)
        .toLocaleLowerCase()
        .includes(itemString.toLowerCase());
    });
    console.log(list);
    setFilterList(list);
  };
  const filterBySearch = (itemString) => {
    setFilterList(stationList);
    if (itemString === " " || itemString === "" || !itemString) {
      setFilterList(stationList);
    } else {
      let list = stationList.filter((item) => {
        return JSON.stringify(item)
          .toLocaleLowerCase()
          .includes(itemString.trim().toLowerCase());
      });
      console.log(list);
      setFilterList(list);
    }
  };

  return (
    <SafeAreaView style={{}}>
      <HeaderBar text={"Home"} source={gasWin} />
      <SearchBar
        searchLogic={() => {
          filterBySearch(searchText);
        }}
        custom={{
          marginTop: 10,
        }}
        getText={(item) => {
          setSearchText(item);
          filterBySearch(item);
        }}
      />

      <View>
        <CategBar
          handleCat={(item) => {
            filterByCateg(item);
          }}
        />
      </View>
      <ListGas
        onClick={(item) => {
          navigation.navigate("Station", {
            station: item,
            user: userDetials,
            token: userToken,
            categList: categList,
          });
        }}
        listGas={filterList ? filterList : stationList}
        custom={{
          height: "68%",
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
