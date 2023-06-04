import React, { useEffect, useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CategBar,
  Container,
  GasPlate,
  HeaderBar,
  ListGas,
  MenuContainer,
  SearchBar,
} from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { COLORS } from "../../globals/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
const Orders = ({ navigation }) => {
  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];
  const [orderList, setOrderList] = useState([]);
  const [token, setToken] = useState()
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("Token");
      setToken(token)
      const userDetails = jwtDecode(token);
      axios
        .get("http://192.168.1.109:8000/orders_service", {
          headers: { authorization: token },
          params: { requester: userDetails, forWho: "user" },
        })
        .then((res) => {
          setOrderList(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("error occured", err);
        });
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
      <HeaderBar text={"Orders"} source={gasWin} />

      <GasPlate
        custom={{
          height: "74%",
        }}
        dataList={orderList}
        config={{
          navigation: navigation,
          to: "CallChat",
          params: { currPage:'Orders', chatPage:'Chat', nextPage:'Chat', token:token },
        }}
      />

      <Container
        custom={{
          // height:20
          marginTop: "-11%",
        }}
        RenderItem={() => {
          return (
            <View
              style={
                {
                  // alignItems: 'center',
                  // borderWidth:1
                }
              }
            >
              <Text>Average waiting time</Text>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                {(() => {
                  const timeList = orderList.map((item) =>
                    parseInt(item.estTime)
                  );
                  const addRedux = (val, a) => {
                    return val + a;
                  };
                  let sum = timeList.reduce(addRedux, 0) / timeList.length;
                  return <Text>{sum ? sum : 0} min</Text>;
                })()}
              </Text>

              <Text
                style={{
                  marginTop: "5%",
                  fontSize: 12,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: COLORS.primary,
                }}
              >
                {(() => {
                  const priceList = orderList.map((item) =>
                    parseInt(item.price)
                  );
                  const addRedux = (val, a) => {
                    return val + a;
                  };
                  let sum = priceList.reduce(addRedux, 0);
                  return <Text>{sum}</Text>;
                })()}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default Orders;
