import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Container,
  GasPlate,
  HeaderBar,
  ListGas,
  MenuContainer,
  SearchBar,
} from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { COLORS } from "../../globals/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const Cart = ({ navigation }) => {
  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];
  const [alertBox, setAlertBox] = useState(false);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState();
  const [refresh, setRefresh] = useState();
  const [loader, setLoader] = useState(true);
  const [total, setTotal] = useState();
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const getData = navigation.addListener("focus", async () => {
      let cartItems = await AsyncStorage.getItem("CartItems");
      if(cartItems){
      cartItems = JSON.parse(cartItems);
      setCart(cartItems.reverse());
      console.log(cartItems);
      const cartPrice = cartItems.map((item) => parseInt(item.price));
      const add = (val, a) => {
        return val + a;
      };
      let sum = cartPrice.reduce(add, 0);
      setTotal(sum);
      setLoader(false);
    }
    });
    return getData;
  }, [navigation]);
useEffect(()=>{
  (async()=>{
    const userToken = await AsyncStorage.getItem('Token')
    console.log(userToken)
    setUserToken(userToken)
  })()
}, [])
  return (
    <SafeAreaView style={{}}>
      <HeaderBar text={"Cart"} source={gasLift} />

      <GasPlate
        custom={{
          height: "70%",
        }}
        loader={loader}
        dataList={cart}
        onClick={(item) => {
          setAlertBox(true);
          setSelected(item);
        }}
      />
      <Container
        custom={{
          // height:20
          marginTop: "-7%",
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
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                waiting time : {cart.length > 0 && cart[0].estTime}
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
                {total}
              </Text>
              <MenuContainer
                custom={{
                  width: 100,
                  alignItems: "center",
                  borderRadius: 10,
                  alignSelf: "flex-end",
                  marginRight: "10%",
                }}
                RenderItem={() => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (cart.length > 0) {
                          navigation.navigate("Confirm", {
                            currPage: "Cartie",
                            chatPage: "Chat",
                            nextPage: "CallChat",
                            cartItems: cart,
                            token:userToken
                          });
                        } else {
                          alert("nothing to check out");
                        }
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: COLORS.primary,
                        }}
                      >
                        Check Out
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        }}
      />

      {alertBox && (
        <View
          style={{
            backgroundColor: "rgba(255,255,255, 0.8)",
            position: "absolute",
            height: "105%",
            width: "100%",
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MenuContainer
            custom={{}}
            RenderItem={() => {
              return (
                <View
                  style={{
                    backgroundColor: "white",
                    // ,flex:1
                    // , height: 100,
                    width: 200,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: COLORS.primary,
                    }}
                  >
                    Cancel Order ?
                  </Text>
                  <Text
                    style={{
                      marginTop: 10,
                    }}
                  >
                    Order : {selected.service}
                  </Text>
                  <Text>Weight : {selected.size} kg</Text>
                  <Text>Price : {selected.price} /=</Text>
                  <View
                    style={{
                      marginTop: "15%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setAlertBox(false);
                      }}
                      style={{
                        width: "60%",
                      }}
                    >
                      <MenuContainer
                        custom={{
                          backgroundColor: COLORS.primary,
                          borderRadius: 7,
                        }}
                        RenderItem={() => {
                          return (
                            <Text
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              No
                            </Text>
                          );
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={async () => {
                        let index;
                        cart.map((value, ind) => {
                          if (value == selected) {
                            console.log("found one");
                            index = ind;
                          }
                        });
                        cart.splice(index, 1);
                        let finalCart = JSON.stringify(cart);
                        await AsyncStorage.setItem("CartItems", finalCart);

                        const cartPrice = cart.map((item) =>
                          parseInt(item.price)
                        );
                        const add = (val, a) => {
                          return val + a;
                        };
                        let sum = cartPrice.reduce(add, 0);
                        setTotal(sum);
                        setAlertBox(false);
                        setRefresh(true);
                      }}
                      style={{
                        width: "60%",
                        marginLeft: 10,
                      }}
                    >
                      <MenuContainer
                        custom={{
                          backgroundColor: COLORS.primary,
                          borderRadius: 7,
                        }}
                        RenderItem={() => {
                          return (
                            <Text
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Yes
                            </Text>
                          );
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default Cart;
