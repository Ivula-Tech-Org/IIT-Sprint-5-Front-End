import { Text, View, ActivityIndicator } from 'react-native'
import { useEffect, useRef, useState, } from 'react'
import * as Location from 'expo-location'
import locStyles from './style'
import { ErrorBox, LongButtonDark, LongButtonLight, Maps } from '../globals/utils'
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
  const [loadView, setLoadView]= useState(false)
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

//   useEffect(()=>{
// const toRegion = {
//   latitude: -1.3198768,
//   longitude: 36.8998693,
//   latitudeDelta: 0.02,
//   longitudeDelta: 0.02
// }

//   MapsRef.current.animateToRegion(toRegion,1000)

//   },[])
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
            
  MapsRef.current.animateToRegion(toRegion,500)

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
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <Maps
      withRef={MapsRef}
      withMarker={false}
      currRegion={currRegion}
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
          To deliver you gass. We would like to know where to deliver them to.
        </Text>
        {errorMessage && <ErrorBox text={errorMessage} />}
        {loader && <ActivityIndicator color={COLORS.primary} style={{
          marginBottom: 10
        }} />}
        <LongButtonDark text={'Set Automatically'} butStyle={{ marginTop: 0 }} submit={setLocator} />
        <LongButtonLight text={'Set Latter'} butStyle={{ marginTop: 15 }} submit={skipLocator} />

      </View>
    </SafeAreaView>
  )
}

export default Locator