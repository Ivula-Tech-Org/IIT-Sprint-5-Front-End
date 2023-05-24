import React from "react";
import { Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, FlatList } from 'react-native'
// import Icon from "react-native-ionicons";
import Iconicons from '@expo/vector-icons/Ionicons'
import Ionicons from "@expo/vector-icons/Ionicons";
import Locator from "../locator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategBar, HeaderBar, ListGas, SearchBar } from "../globals/utils";
import { gasLift, gasWin } from "../globals/images";
import { COLORS } from "../globals/theme";
const Home = ({ navigation }) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]
    return (
        //  <KeyboardAvoidingView   behavior="padding" enabled> 


        <SafeAreaView style={{
            // backgroundColor:'red'
        }}>
            <HeaderBar text={'Home'} />
            <SearchBar searchLogic={() => {
                console.log('mkuu')
            }} custom={{
                marginTop: 10
            }} />

            <View>
                <CategBar itemList={dummyList} handleCat={() => {
                    alert('handle')
                }} />

            </View>
                <ListGas custom={{
                    height:'68%'
                }} config={{navigation:navigation, to:'Station'}}/>
        </SafeAreaView>
        // </KeyboardAvoidingView>

    )
}

export default Home