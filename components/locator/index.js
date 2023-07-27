import { Text, View, ActivityIndicator } from 'react-native'
import { useEffect, useRef, useState, } from 'react'
import * as Location from 'expo-location'
import locStyles from './style'
import { ErrorBox, LongButtonDark, LongButtonLight, Maps, variables } from '../globals/utils'
import { COLORS } from '../globals/theme'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'

const Locator = ({ navigation }) => {
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
  const [loadView, setLoadView] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState(false)

  const setLocator = async () => {
    setLoader(true)
    setErrorMessage(null)
    console.log(userDetails)
    await axios.post(`${variables.HOST_URL}post_location`, null, { params: { lat: currRegion.latitude, long: currRegion.longitude }, headers: { authorization: userDetails } })
      .then((res) => {
        if (res.status == '200') {
          setLoader(false)
          navigation.navigate('HomeCast')
        } else {
          setLoader(false)
          setErrorMessage('something went wrong')
        }
      })
      .catch((err) => {
        setLoader(false)
        console.log(err)
        setErrorMessage('something went wrong')

      })
  }

  const skipLocator = () => {
    navigation.navigate('HomeCast')
  }
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('Token')
      if (token) {
        setUserDetails(token)
      }
    })()
  })

  useEffect(() => {
    let subscription;

    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location denied');
          return;
        }
setPermissionStatus(true)
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 10000 },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setCurrRegion({ latitude, longitude });
            // console.log(latitude,longitude)
            setInitialRegion({ latitude: latitude, longitude: longitude })
            const toRegion = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }

            const zoomLevel = 15
            const animationDelay = 300

            MapsRef.current.injectJavaScript(`
  function delayedAnimation() {
    const newLat = ${toRegion.latitude} + ${toRegion.latitudeDelta};
    const newLon = ${toRegion.longitude} + ${toRegion.latitudeDelta};
  
    mymap.flyTo([newLat, newLon], ${zoomLevel}, {
      animate: true,
      duration: 0.7
    });
  
    const marker = L.marker([newLat, newLon], {
      icon: new L.Icon.Default({
        iconSize: [20, 30],
        shadowSize:[0,0]
      }),
    }).addTo(mymap);
  }

  setTimeout(delayedAnimation, ${animationDelay});
`)

          }
        );
      } catch (error) {
        setError('Error retrieving location');
      }
    };

    getLocationAsync();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <>{permissionStatus ? <SafeAreaView
      style={{ flex: 1 }}
    >
      <Maps
        withRef={MapsRef}
      />

      <View style={locStyles.container}>

        <Text style={{
          fontSize: 25,
          marginTop: '-10%',
          color: COLORS.primary
        }}>Where are you?</Text>
        <Text style={
          {
            fontSize: 13,
            width: '80%',
            padding: 10,
            textAlign: 'center'
          }
        }>
          To deliver your gass. We would like to know where to deliver them to.
        </Text>
        {errorMessage && <ErrorBox text={errorMessage} />}
        {loader && <ActivityIndicator color={COLORS.primary} style={{
          marginBottom: 10
        }} />}
        <LongButtonDark text={'Set Automatically'} butStyle={{ marginTop: 0 }} submit={setLocator} />
        <LongButtonLight text={'Set Latter'} butStyle={{ marginTop: 15 }} submit={skipLocator} />

      </View>
    </SafeAreaView> : <View
    style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center', 
      
    }}>
      <ActivityIndicator color={COLORS.primary} size={25}/>
      <Text>loading... Waiting for location permissions</Text>

    </View>}</>

  )
}

export default Locator