import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
// import locStyles from './style'
import {
  AlertBox,
  Container,
  ErrorBox,
  IconButton,
  LongButtonDark,
  LongButtonLight,
  Maps,
  MenuContainer,
  ProfileCircle,
} from "../globals/utils";
import { COLORS } from "../globals/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { gasLift } from "../globals/images";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Confirm = ({ navigation, route }) => {
  const [currRegion, setCurrRegion] = useState({
    latitude: -1.2590906,
    longitude: 36.7858022,
  });
  const [error, setError] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loader, setLoader] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const MapsRef = useRef(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshMap, setRefreshMap] = useState(false);
  const { currPage, chatPage, nextPage, cartItems ,token } = route.params;
  const [markerList, setMarkerList] = useState();
  const [alertbox, setAlertBox] = useState(false);
  
  useEffect(()=>{
    navigation.addListener('focus',()=>{
      if(!cartItems){
          navigation.navigate('Cartie')
      }
    })
  },[navigation])
  const skipLocator = () => {
    navigation.navigate("HomeCast");
  };

  const sendOrder = async()=>{
    console.log('this is the user token', token)
    console.log('this is the user cart', cartItems)
    axios.post('http://192.168.1.109:8000/orders_service', null,{headers:{authorization: token},params:{cartItems:cartItems}}).then(async(res)=>{
      console.log('helo orders here', res.data)
      if(res.data.message = 'success'){
        setAlertBox(true)
        await AsyncStorage.removeItem('CartItems')


      }else{
        alert(res.data.message)
      }

    }).catch((err)=>{
      alert(err.message)
    })

  }

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("Token");
      if (token) {
        const details = jwtDecode(token);
        if (details) {
          setUserDetails(details);
          console.log("hii hapau", details.userName);
          setLoadUser(true);
        } else {
          console.log("something");
        }
      }
      setRefreshMap(false);
    })();
  }, [refreshMap]);

  useEffect(() => {
    let subscription;
    console.log("user login");
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location denied");
          return;
        }

        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 10000 },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setCurrRegion({ latitude, longitude });
            // console.log(latitude,longitude)
            setInitialRegion({ latitude: latitude, longitude: longitude });
            const clientRegion = {
              lat: latitude,
              long: longitude,
            };
            const suppRegion = {
              latitude: -1.2590906,
              longitude: 36.7858022,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            };

            
            //to remove on debug
            // cartItems[0].location.long =
            //   parseFloat(cartItems[0].location.long) + 10;
            // cartItems[1].location.long =
            //   parseFloat(cartItems[1].location.long) + 20;
            //kindly remember

            const markingList = cartItems.map((val) => val.location);
            setMarkerList(markingList);

            const suppRegionLat = cartItems.map((val) =>
              parseFloat(val.location.lat)
            );
            const suppRegionLong = cartItems.map((val) =>
              parseFloat(val.location.long)
            );
            suppRegionLat.push(parseFloat(clientRegion.lat));
            suppRegionLong.push(parseFloat(clientRegion.long));
            console.log(suppRegionLat, ",", suppRegionLong);

            let minLat = Math.min(...suppRegionLat);
            let maxLat = Math.max(...suppRegionLat);
            let minLong = Math.min(...suppRegionLong);
            let maxLong = Math.max(...suppRegionLong);
            console.log(minLong, maxLong);

            const finalRegion = {
              latitude: (minLat + maxLat) / 2,
              longitude: (minLong + maxLong) / 2,
              latitudeDelta: (maxLat - minLat) * 2.2,
              longitudeDelta: (maxLong - minLong) * 2.2,
            };
            MapsRef.current.animateToRegion(finalRegion, 500);
          }
        );
      } catch (error) {
        setError("Error retrieving location");
      }
    };

    getLocationAsync();
    setRefreshMap(false);
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [refreshMap]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {alertbox && (
        <AlertBox
          closePop={async() => {
            setAlertBox(false);
            navigation.navigate("Order");
          }}
          options={{
            main: "Your order will be processed and delivered",
            left: "ok",
            right: "orders",
          }}
          navTo={async() => {
            navigation.navigate("Order");
            setAlertBox(false)
            // alert()
            // sendOrder()
          }}
        />
      )}
      <Maps
        withRef={MapsRef}
        markerList={markerList}
        withMarker={false}
        currRegion={currRegion}
        tracer={true}
        custom={{
          height: "57%",
        }}
      />
      <View
        style={{
          marginTop: "-25%",
          alignSelf: "flex-end",
          marginRight: "10%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currPage != "Dashboard" && (
          <View>
            <TouchableOpacity
              style={{
                marginRight: 10,
              }}
              onPress={() => {
                navigation.navigate("Location");
              }}
            >
              <MenuContainer
                custom={{
                  width: 80,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderColor: COLORS.primary,
                }}
                RenderItem={() => {
                  return (
                    <Text
                      style={{
                        fontWeight: "bold",
                        colors: COLORS.primary,
                      }}
                    >
                      change?
                    </Text>
                  );
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        <IconButton
          onClick={() => {
            setRefreshMap(true);
          }}
          icon={"refresh"}
          size={{ box: 30, icon: 15 }}
          custom={{
            backgroundColor: "white",
          }}
        />
      </View>

      <Container
        custom={{
          marginTop: "3%",
          height: "51%",
        }}
        RenderItem={() => {
          return (
            <>
              {loadUser ? (
                <View
                  style={{
                    // justifyContent:'center',
                    alignItems: "center",
                    // marginTop:'-10%'
                  }}
                >
                  <ProfileCircle
                    source={gasLift}
                    custom={{
                      height: 100,
                      width: 100,
                    }}
                  />
                  <Text>{userDetails.userName}</Text>
                  <Text>{userDetails.phoneNumber}</Text>
                  <MenuContainer
                    custom={{
                      height: "35%",
                      width: "70%",
                      marginTop: "5%",
                    }}
                    RenderItem={() => {
                      return (
                        <>
                          <TextInput
                            multiline={true}
                            style={{
                              flex: 1,
                            }}
                            placeholder="Add a note"
                          />
                        </>
                      );
                    }}
                  />

                  <MenuContainer
                    custom={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 8,
                      marginTop: "3%",
                      // alignItems:'flex-start'
                      right: "-20%",
                    }}
                    RenderItem={() => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            sendOrder()
                          }}
                        >
                          <Text>confirm</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  {userDetails.tier == "contractor" ? (
                    <MenuContainer
                      custom={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 8,
                        marginTop: "-10%",
                        // alignItems:'flex-start'
                        right: "20%",
                      }}
                      RenderItem={() => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              alert(currPage);
                              navigation.navigate(currPage);
                            }}
                          >
                            <Text>cancel</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Confirm;
