import React from "react";
import {Text,TouchableOpacity,View} from 'react-native'
// import Icon from "react-native-ionicons";
import Iconicons from '@expo/vector-icons/Ionicons'
import Ionicons from "@expo/vector-icons/Ionicons";
const Home = ({navigation})=>{
    return(
        <View>

        <Text>hello world</Text>
        {/* <Icon name="add"/> */}
        <Ionicons name='home' size={32} color='green'/>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Chat',{clientID:'123493412',contrID:'0809876234'})
        }}><Text>click</Text></TouchableOpacity>
        </View>
    )
}

export default Home