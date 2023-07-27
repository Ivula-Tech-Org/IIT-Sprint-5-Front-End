import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import {
  Container,
  IconButton,
  Maps,
  MenuContainer,
  ProfileCircle,
} from "../globals/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { gasLift } from "../globals/images";
import jwtDecode from "jwt-decode";

const CallChat = ({ navigation, route }) => {
  const [currRegion, setCurrRegion] = useState({
    latitude: -1.3198768,
    longitude: 36.8998693,
  });
  const [error, setError] = useState();
  const [initialRegion, setInitialRegion] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loader, setLoader] = useState();
  const [userDetails, setUserDetails] = useState(null);
  const MapsRef = useRef(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshMap, setRefreshMap] = useState(false);
  const { currPage, nextPage, cartItems } = route.params;

  const skipLocator = () => {
    navigation.navigate("HomeCast");
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
            // cartItems.Location.long = cartItems.Location.long + 10
            setInitialRegion({ latitude: latitude, longitude: longitude });

            const clientRegion = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            };

            const suppRegion = {
              latitude: cartItems.location.lat,
              longitude: cartItems.location.long,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            };

            let minLat = Math.min(clientRegion.latitude, suppRegion.latitude);
            let maxLat = Math.max(clientRegion.latitude, suppRegion.latitude);
            let minLong = Math.min(
              clientRegion.longitude,
              suppRegion.longitude
            );
            let maxLong = Math.max(
              clientRegion.longitude,
              suppRegion.longitude
            );
            const finalRegion = {
              latitude: (minLat + maxLat) / 2,
              longitude: (minLong + maxLong) / 2,
              latitudeDelta: (maxLat - minLat) * 2.2,
              longitudeDelta: (maxLong - minLong) * 2.2,
            };

            MapsRef.current?.injectJavaScript(`
      // Add two markers

      const currRegionLat = ${currRegion.latitude}
      const currRegionLong = ${currRegion.longitude}
      const suppRegionLat = ${suppRegion.latitude}
      const suppRegionLong = ${suppRegion.longitude}

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

          mymap.on("load", animatePath);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Maps
        withRef={MapsRef}
        withMarker={false}
        currRegion={currRegion}
        tracer={true}
        custom={{
          height: "61%",
        }}
        markerList={[cartItems.location]}
      />
      <IconButton
        onClick={() => {
          setRefreshMap(true);
        }}
        icon={"refresh"}
        size={{ box: 30, icon: 15 }}
        custom={{
          marginTop: "-25%",
          alignSelf: "flex-end",
          marginRight: "10%",
          backgroundColor: "white",
        }}
      />

      <Container
        custom={{
          marginTop: "3%",
          height: "47%",
        }}
        RenderItem={() => {
          return (
            <>
              {loadUser ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10%",
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 5,
                      fontWeight: "bold",
                      marginTop: -5,
                    }}
                  >
                    Your Order is being processed
                  </Text>
                  <ProfileCircle
                    source={gasLift}
                    custom={{
                      height: 100,
                      width: 100,
                    }}
                  />
                  <Text>{cartItems.name}</Text>
                  <Text>{cartItems.phoneNumber}</Text>
                  <View
                    style={{
                      height: "10%",
                    }}
                  ></View>
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
                            console.log(
                              "these are the passed ids : ",
                              cartItems.clientID,
                              cartItems.contID
                            );
                            navigation.navigate(nextPage, {
                              clientID: cartItems.clientID,
                              contID: cartItems.contID,
                              tier: userDetails.tier,
                              cart: cartItems,
                            });
                          }}
                        >
                          <Text>chat</Text>
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
                            const number =
                              cartItems.phoneNumber || " 0741741381";
                            Linking.openURL(`tel: ${number}`);
                            navigation.navigate(currPage)
                          }}
                        >
                          <Text>call</Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
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

export default CallChat;
