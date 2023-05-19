import { Text, View, SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useEffect, useState, } from 'react'
import * as Location from 'expo-location'
import locStyles from './style'
import { LongButtonDark, LongButtonLight } from '../globals/utils'
import { COLORS } from '../globals/theme'
const Locator = ({navigation}) => {
    const [currRegion, setCurrRegion] = useState({
        latitude: -1.3198768,
        longitude: 36.8998693})
    const [error, setError] = useState();
    const [initialRegion,setInitialRegion ]= useState({
        latitude: -1.3198768,
        longitude: 36.8998693,
        latitudeDelta:0.02,
        longitudeDelta:0.02
    })

    const setLocator = ()=>{
        navigation.navigate('HomeCast')
    }
    const skipLocator = ()=>{
        navigation.navigate('HomeCast')
    }
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
              { accuracy: Location.Accuracy.High, timeInterval: 1000 },
              (newLocation) => {
                const { latitude, longitude } = newLocation.coords;
                setCurrRegion({ latitude, longitude });
                // console.log(latitude,longitude)
                setInitialRegion({latitude:latitude,longitude:longitude})
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
      },[currRegion,initialRegion]);

    return (
        <SafeAreaView
            style={{ flex:1 }}
        >
            <Text>hello world ofr locator</Text>
            <View style={{height:'50%'}}>
            <MapView
                initialRegion={initialRegion}
                style={{  height:'100%'}}
            >
                <Marker
                    coordinate={{
                        latitude: currRegion.latitude,
                        longitude: currRegion.longitude,
                    }}
                    title="sample marker"
                    description="sample marker"
                    
                >

                </Marker>
            </MapView>
            </View>

            <View style={locStyles.container}>

            <Text style={{
                fontSize:25,
                marginTop:'-10%',
                color:COLORS.primary
            }}>Where are you?</Text>
            <Text style={
                {
                    fontSize:13,
                    width:'80%',
                    padding:10,
                    textAlign:'center'
                }
            }>
            To deliver you gass. We would like to know where to deliver them to.
            </Text>
            <LongButtonDark  text={'Set Automatically'} butStyle={{marginTop:0}} submit={setLocator}/>
            <LongButtonLight  text={'Set Latter'} butStyle={{marginTop:15}} submit={skipLocator}/>
            
            </View>
        </SafeAreaView>
    )
}

export default Locator