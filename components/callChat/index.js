import { Text, View, ActivityIndicator, TouchableOpacity, Linking } from 'react-native'
import { useEffect, useRef, useState, } from 'react'
import * as Location from 'expo-location'
import { Container, IconButton, Maps, MenuContainer, ProfileCircle } from '../globals/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gasLift } from '../globals/images'
import jwtDecode from 'jwt-decode'

const CallChat = ({ navigation ,route}) => {
  const [currRegion, setCurrRegion] = useState({
    latitude: -1.3198768,
    longitude: 36.8998693
  })
  const [error, setError] = useState();
  const [initialRegion, setInitialRegion] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [loader, setLoader] = useState()
  const [userDetails, setUserDetails] = useState(null)
  const MapsRef = useRef(null)
  const [loadUser, setLoadUser] = useState(false)
  const [refreshMap,setRefreshMap] = useState((false))
  const {currPage,nextPage} = route.params
  const skipLocator = () => {
    navigation.navigate('HomeCast')
  }
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('Token')
      if (token) {

        const details = jwtDecode(token)
        if(details){

          setUserDetails(details)
          console.log('hii hapau',details.userName)
          setLoadUser(true)
        }else{
          console.log('something')
        }
        
      }
      setRefreshMap(false)
    })()
  },[refreshMap])

  useEffect(() => {
    let subscription;
console.log('user login')
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location denied');
          return;
        }

        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 10000 },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setCurrRegion({ latitude, longitude });
            // console.log(latitude,longitude)
            setInitialRegion({ latitude: latitude, longitude: longitude })
            const clientRegion = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }

            const suppRegion = {
                latitude: -1.2590906,
                longitude: 36.7858022,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              }
  
              let minLat = Math.min(clientRegion.latitude, suppRegion.latitude)
              let maxLat = Math.max(clientRegion.latitude, suppRegion.latitude)
              let minLong = Math.min(clientRegion.longitude, suppRegion.longitude)
              let maxLong = Math.max(clientRegion.longitude, suppRegion.longitude)
              const finalRegion = {
                latitude: (minLat + maxLat) / 2,
                longitude: (minLong + maxLong) / 2,
                latitudeDelta: (maxLat - minLat) * 2.2,
                longitudeDelta: (maxLong - minLong) * 2.2,
              }
              MapsRef.current.animateToRegion(finalRegion, 500)
  

          }
        );
      } catch (error) {
        setError('Error retrieving location');
      }
    };

    getLocationAsync();
setRefreshMap(false)
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [refreshMap]);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <Maps
        withRef={MapsRef}
        withMarker={false}
        currRegion={currRegion}
        tracer={true}
        custom={{
          height: '61%'
        }}
      />
            <IconButton onClick={()=>{
              setRefreshMap(true)
            }} icon={'refresh'} size={{box:30,icon:15}} custom={{
              marginTop:'-25%',
              alignSelf:'flex-end',
              marginRight:'10%',
              backgroundColor:'white'
            }}/>

      <Container

        custom={{
          marginTop: '3%',
          height: '47%'
        }}
        RenderItem={() => {
          return (
            <>
              {loadUser ?
                <View style={{
                  justifyContent:'center',
                  alignItems: 'center',
                  marginTop:'10%'
                }}>
                  <Text style={{
                    marginBottom:5,
                    fontWeight:'bold',
                    marginTop:-5
                  }}>Your Order is on the way</Text>
                  <ProfileCircle
                    source={gasLift}
                    custom={{
                      height: 100,
                      width: 100,
                    }}
                  />
                  <Text>
                    {userDetails.userName}
                  </Text>
                  <Text>
                    {userDetails.phoneNumber}
                  </Text>
                  <View
                  style={{
                    height:'10%'
                  }}
                  ></View>
                  <MenuContainer
                  custom={{
                    paddingLeft:20,
                    paddingRight:20,
                    borderRadius:8,
                    marginTop:'3%',
                    // alignItems:'flex-start'
                    right:'-20%'
                  }}
                    RenderItem={() => {
                      return (
                        <TouchableOpacity

                          onPress={() => {
                            navigation.navigate(nextPage)
                          }}
                        >
                          <Text>chat</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                  <MenuContainer
                  custom={{
                    paddingLeft:20,
                    paddingRight:20,
                    borderRadius:8,
                    marginTop:'-10%',
                    // alignItems:'flex-start'
                    right:'20%'
                  }}
                    RenderItem={() => {
                      return (
                        <TouchableOpacity

                          onPress={() => {
                            Linking.openURL(`tel: 0741741381`)
                            // navigation.navigate('HomeCast')
                          }}
                        >
                          <Text>call</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View> : <ActivityIndicator />}
            </>

          )
        }}
      />
    </SafeAreaView>
  )
}

export default CallChat