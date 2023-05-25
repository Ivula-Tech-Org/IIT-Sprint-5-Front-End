import React from "react";
import { Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, FlatList } from 'react-native'
// import Icon from "react-native-ionicons";
import Iconicons from '@expo/vector-icons/Ionicons'
import Ionicons from "@expo/vector-icons/Ionicons";
import Locator from "../locator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategBar, Container, Deals, GasPlate, HeaderBar, ListGas, SearchBar } from "../globals/utils";
import { gasLift, gasWin } from "../globals/images";
import { COLORS } from "../globals/theme";
const Search = ({ navigation }) => {
    const dummDeals = ['dummy_1', 'dummy_2', 'dummy_3', 'dummy_4', 'dummy_5']

    return (
        //  <KeyboardAvoidingView   behavior="padding" enabled> 


        <SafeAreaView style={{
            // backgroundColor:'red'
        }}>
            <HeaderBar text={'Search'} />
            <SearchBar searchLogic={() => {
                console.log('mkuu')
            }} custom={{
                marginTop: 10
            }} />
            
            <View
                style={{
                    width: '100%',
                    // , borderWidth: 1,
                    padding: 20
                }}
            >
                <Text style={{
                    borderBottomWidth: 1
                }}>
                    Gass Deals 

                </Text>
                {/* <ScrollView> */}
                <Deals
                custom={{
                    height:'40%'
                }}
                onClick={() => {
                    navigation.navigate('Station')
                }} dealData={dummDeals} />
                {/* </ScrollView> */}

                <Text style={{
                    borderBottomWidth: 1,
                    marginTop: 20
                }}>
                    Gass Accessories  

                </Text>
                <Deals 
                custom={{
                    height:'35%'
                }}
                dealData={dummDeals}
                    onClick={() => {
                    navigation.navigate('Station')

                    }}
                />
            </View>
        </SafeAreaView>
        // </KeyboardAvoidingView>

    )
}

export default Search