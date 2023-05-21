import React from "react";
import {Text,TouchableOpacity,View} from 'react-native'
// import Icon from "react-native-ionicons";
import Iconicons from '@expo/vector-icons/Ionicons'
import Ionicons from "@expo/vector-icons/Ionicons";
import Locator from "../locator";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = ({navigation})=>{
    return(
        <View>

        <Text>hello world</Text>
        {/* <Icon name="add"/> */}
        <Ionicons name='home' size={32} color='green'/>
        <TouchableOpacity onPress={async()=>{
            // navigation.navigate('Chat',{clientID:'123493412',contrID:'0809876234'})
            await AsyncStorage.clear()
        }}><Text>click</Text></TouchableOpacity>
        </View>
    )
}

export default Home