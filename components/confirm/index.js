import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
  variables,
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
  const { currPage, chatPage, nextPage, cartItems, token } = route.params;
  const [markerList, setMarkerList] = useState();
  const [alertbox, setAlertBox] = useState(false);
  const notesRef = useRef();
  useEffect(() => {
    navigation.addListener("focus", () => {
      if (!cartItems) {
        navigation.navigate("Cartie");
      }
    });
  }, [navigation]);
  const skipLocator = () => {
    navigation.navigate("HomeCast");
  };

  const updateOrder = async (method, to) => {
    console.log("to update", token);
    axios
      .post(
        `${variables.HOST_URL}update_service/update_order`,
        {
          cartItems: cartItems,
          method: method,
          to: to,
        },
        { headers: { authorization: token } }
      )
      .then((res) => {
        alert("The Order was updated succesfully");
        navigation.navigate(currPage);
      })
      .catch((err) => {
        alert("something went wrong try again");
        console.log(err);
      });
  };

  const sendOrder = async () => {
    console.log("this is the user token", token);
    let postCart = cartItems;
    postCart.notes = notesRef.current;

    axios
      .post(`${variables.HOST_URL}orders_service`, null, {
        headers: { authorization: token },
        params: { cartItems: postCart },
      })
      .then(async (res) => {
        console.log("helo orders here", res.data);
        if ((res.data.message = "success")) {
          setAlertBox(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
            // suppRegionLat.push(parseFloat(clientRegion.lat));
            // suppRegionLong.push(parseFloat(clientRegion.long));
            // console.log(suppRegionLat, ",", suppRegionLong);

            // let minLat = Math.min(...suppRegionLat);
            // let maxLat = Math.max(...suppRegionLat);
            // let minLong = Math.min(...suppRegionLong);
            // let maxLong = Math.max(...suppRegionLong);
            // console.log(minLong, maxLong);

            // const finalRegion = {
            //   latitude: (minLat + maxLat) / 2,
            //   longitude: (minLong + maxLong) / 2,
            //   latitudeDelta: (maxLat - minLat) * 2.2,
            //   longitudeDelta: (maxLong - minLong) * 2.2,
            // };
            // alert(suppRegionLong)
            MapsRef.current?.injectJavaScript(`
      // Add two markers

      const currRegionLat = ${currRegion.latitude}
      const currRegionLong = ${currRegion.longitude}
      const suppRegionLat = ${suppRegionLat}
      const suppRegionLong = ${suppRegionLong}

      var marker1 = L.marker([suppRegionLat,suppRegionLong]).addTo(mymap);
      var marker2 = L.marker([currRegionLat,currRegionLong]).addTo(mymap);


      // var marker1 = L.marker([-1.285467, 36.824426]).addTo(mymap);
      // var marker2 = L.marker([-1.269844, 36.811267]).addTo(mymap);


      var markers = L.featureGroup([marker1, marker2]);

      mymap.fitBounds(markers.getBounds().pad(0.1));

      var accessToken =
        "pk.eyJ1IjoibWNzaGVsdG9uIiwiYSI6ImNsa2twMXIwMzBvdGIzZm42MGx4NzF1a3QifQ.gw16yt_45I6zX2HEMRgM8g";
      var directionsURL = \`https://api.mapbox.com/directions/v5/mapbox/driving/\${
        marker1.getLatLng().lng
      },\${marker1.getLatLng().lat};\${marker2.getLatLng().lng},\${
        marker2.getLatLng().lat
      }?geometries=geojson&access_token=\${accessToken}\`;

      fetch(directionsURL)
        .then((response) => response.json())
        .then((data) => {
          var tPathCoordinates = data.routes[0].geometry.coordinates;
          function reverseCoordinates(coordinates) {
            return coordinates.map((coordinate) => [
              coordinate[1],
              coordinate[0],
            ]);
          }

          var pathCoordinates = reverseCoordinates(tPathCoordinates);

          console.log("Original Coordinates:", tPathCoordinates);
          console.log("Reversed Coordinates:", pathCoordinates);

          var path = L.polyline(pathCoordinates).addTo(mymap);

          var markers = L.featureGroup([marker1, marker2]);
          mymap.fitBounds(markers.getBounds().pad(0.1));

          function animatePath() {
            var index = 0;
            var animateInterval = setInterval(function () {
              if (index < pathCoordinates.length) {
                var deltaLat =
                  pathCoordinates[index][0] - mymap.getCenter().lat;
                var deltaLng =
                  pathCoordinates[index][1] - mymap.getCenter().lng;
                var zoomDelta = 2; 

                mymap.flyTo(
                  [
                    mymap.getCenter().lat + deltaLat,
                    mymap.getCenter().lng + deltaLng,
                  ],
                  mymap.getZoom() + zoomDelta,
                  {
                    duration: 1, 
                  }
                );

                index++;
              } else {
                clearInterval(animateInterval);
              }
            }, 1000);
          }
          function delayedAnimation() {
          mymap.on("load", animatePath);
          }
  setTimeout(delayedAnimation, 2000);

        })
        .catch((error) => console.error("Error fetching route:", error));

`)
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

  // useEffect(()=>{
  //   (async ()=>{
  //     let newLocation = await AsyncStorage.getItem('newLocation')
  //     if(newLocation){

  //       newLocation = JSON.parse(newLocation)
  //       setRefreshMap(true)
  //     }

  //   })()
  // }, [navigation])

  return (
    <SafeAreaView>
      {alertbox && (
        <AlertBox
          closePop={async () => {
            await AsyncStorage.removeItem("CartItems");
            navigation.navigate("Cartie");
            navigation.navigate("Order");
            setAlertBox(false);
          }}
          options={{
            main: "Your order will be processed and delivered",
            left: "ok",
            right: "orders",
          }}
          navTo={async () => {
            await AsyncStorage.removeItem("CartItems");
            navigation.navigate("Cartie");
            navigation.navigate("Order");
            setAlertBox(false);
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
                        color: COLORS.primary,
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
            <ScrollView
              style={{
                overflow: "hidden",
              }}
            >
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
                            onChangeText={(e) => {
                              console.log(e);
                              notesRef.current = e;
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
                            console.log(currPage);
                            currPage === "Dashboard"
                              ? updateOrder("update", "Waiting")
                              : sendOrder();
                          }}
                        >
                          <Text>confirm</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
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
                              currPage === "Dashboard"
                                ? updateOrder("cancel", "Cancel")
                                : sendOrder();
                              navigation.navigate(currPage);
                            }}
                          >
                            <Text>cancel</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                </View>
              ) : (
                <ActivityIndicator />
              )}
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Confirm;
