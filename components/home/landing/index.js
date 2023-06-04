import React, { useEffect, useState } from "react";
import { Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, FlatList } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { CategBar, HeaderBar, ListGas, SearchBar } from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Home = ({ navigation }) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]
    const [stationList, setStationList]= useState([])
    const [categList, setCategList] = useState([])
    const [userToken, setUserToken] = useState('default')
    const [userDetials, setUserDetails] = useState()

    

    useEffect(()=>{
        (async ()=>{
            
            try
            {
    
                const token = await AsyncStorage.getItem('Token')
                const details = jwtDecode(token)
                console.log('this is the token',token)
                setUserToken(token)
                setUserDetails(details)
    
                axios.get('http://192.168.1.109:8000/front_end_service/categories', { headers: { authorization: token}})
                .then(async (res) => {
                    setUserToken(res.data.token)
                    setCategList(res.data.data)

                    await AsyncStorage.setItem('Token',res.data.token)
                }).catch((err)=>{
                    alert('Sorry an error occured')
                 
                })
                axios.get('http://192.168.1.109:8000/front_end_service', { headers: { authorization: token}})
                .then(async (res) => {
                    setStationList(res.data.data)
                    console.log('station list',res.data.data)

                }).catch((err)=>{
                    alert('Sorry an error occured')
                 
                })
            }catch(err){
                alert('something went wrong')
            }
    })()
        
    },[])

    return (
        <SafeAreaView style={{
        }}>
            <HeaderBar text={'Home'} source={gasWin}/>
            <SearchBar searchLogic={() => {
            }} custom={{
                marginTop: 10
            }} />

            <View>
                <CategBar itemList={categList} handleCat={() => {
                    alert('handle')
                }} />

            </View>
                <ListGas
                onClick={(item)=>{
                    console.log(item)
                    navigation.navigate('Station', { station : item, user:userDetials, token:userToken })

                }}
                listGas={stationList}
                custom={{
                    height:'68%'
                }} />
        </SafeAreaView>

    )
}

export default Home