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
  variables,
} from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { COLORS } from "../../globals/theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";

const Orders = ({ navigation }) => {
  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];
  const [orderList, setOrderList] = useState([]);
  const [token, setToken] = useState()
  const [loader, setLoader]=useState(true)
  const isfocused = useIsFocused()
const [optionTier,setOptionTier]=useState('Pending')

  useEffect(() => {
    if(isfocused){
    (async () => {
      setLoader(true)
      const token = await AsyncStorage.getItem("Token");
      setToken(token)
      const userDetails = jwtDecode(token);
      axios
        .get(`${variables.HOST_URL}orders_service`, {
          headers: { authorization: token },
          params: { requester: userDetails, forWho: "user" },
        })
        .then((res) => {
          const list  = res.data.filter((item)=>{
            if(optionTier == 'Pending'){
            return item.orderStatus.done == false
            }else{
            return item.orderStatus.done == true

            }

          })
          console.log('this is the list',list)
          setOrderList(list);
          setLoader(false)
          console.log(res.data);
        })
        .catch((err) => {
          console.log("error occured", err);
        });
    })();}
  }, [isfocused, optionTier]);

const changeTiers = (status)=>{
  setOptionTier(status)
}
  return (

    <SafeAreaView
      style={
        {
          // backgroundColor:'red'
        }
      }
    >
      <HeaderBar text={"Orders"} source={gasWin} />
{loader?<View style={{
  height:'66%',
  marginTop:'20%'
  ,backgroundColor:'white'
  ,borderTopEndRadius:20
  ,borderTopRightRadius:20
  ,borderTopLeftRadius:20
  ,borderTopWidth:1
  ,justifyContent:'center'
  ,alignItems:'center'
}}>
<ActivityIndicator color={COLORS.primary} size={30}/>
<Text>Getting your orders ...</Text>
</View>:
<>
<View>
          <RadioButton.Group
            onValueChange={(option) => {
              changeTiers(option)
            }}
            value={optionTier}
            
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <RadioButton.Item
                labelStyle={{
                  fontSize: 12,
                }}
                labelVariant="labelSmall"
                label="Pending"
                value="Pending"
                size={10}
              />
              <RadioButton.Item
                labelStyle={{
                  fontSize: 12,
                }}
                labelVariant="labelSmall"
                label="Done"
                value="Done"
                size={10}
              />
            </View>
          </RadioButton.Group>
        </View>
      <GasPlate
        custom={{
          height: "66%",
        }}
        dataList={orderList}
        optiontier={optionTier}
        config={{
          navigation: navigation,
          to: "CallChat",
          params: { currPage:'Orders' ,chatPage:'Chat', nextPage:'Chat', token:token },
        }}
      />
      </>
      }

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
                  return <Text>{sum} /=</Text>;
                })()}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Orders;
