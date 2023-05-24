import React from "react";
import { Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, FlatList } from 'react-native'
// import Icon from "react-native-ionicons";
import Iconicons from '@expo/vector-icons/Ionicons'
import Ionicons from "@expo/vector-icons/Ionicons";
import Locator from "../locator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategBar, Container, GasPlate, HeaderBar, ListGas, MenuContainer, SearchBar } from "../globals/utils";
import { gasLift, gasWin } from "../globals/images";
import { COLORS } from "../globals/theme";
const Cart = ({ navigation }) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]

    return (
        //  <KeyboardAvoidingView   behavior="padding" enabled> 


        <SafeAreaView style={{
            // backgroundColor:'red'
        }}>
            <HeaderBar text={'Cart'} />
            
<GasPlate
custom={{
    height:'70%'
}}

dataList={dummyList}
config={{navigation:navigation,to:'Chat'}}
/>
<Container 
custom={{
    // height:20
    marginTop:'-7%'
}}
RenderItem={() => {
    return (
        <View style={{
            // alignItems: 'center',
            // borderWidth:1
        }}>
            <Text style={{
                fontSize:15,
            }}>waiting time : 20 min</Text>
            <Text
            style={{
                marginTop:'5%'
                ,fontSize:12
            }}
            >Total</Text>
            <Text
            style={{
                fontSize:20,
                fontWeight:'bold'
                ,color:COLORS.primary
            }}
            >2000 /=</Text>
            <MenuContainer 
            custom={{
                width:100,
                alignItems:'center',
                borderRadius:10,
                alignSelf:'flex-end',
                marginRight:'10%'
            }}
            RenderItem={()=>{
                return(
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.navigate('Confirm')
                    }}
                    >
                        <Text 
                        style={{
                            fontWeight:'bold',
                            color:COLORS.primary
                        }}
                        >Check Out</Text>
                    </TouchableOpacity>
                )
            }}
            />
        </View>
    )
}}
/>
        </SafeAreaView>
        // </KeyboardAvoidingView>

    )
}

export default Cart