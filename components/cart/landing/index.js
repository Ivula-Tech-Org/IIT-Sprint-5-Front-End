import React, { useState } from "react";
import { Text,  TouchableOpacity, View, ImageBackground, FlatList } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import {  Container, GasPlate, HeaderBar, ListGas, MenuContainer, SearchBar } from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { COLORS } from "../../globals/theme";
const Cart = ({ navigation }) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]
    const [alertBox,setAlertBox] = useState(false)

    return (
        //  <KeyboardAvoidingView   behavior="padding" enabled> 


        <SafeAreaView style={{
            // backgroundColor:'red'
        }}>
            <HeaderBar text={'Cart'} source={gasLift}/>
            
<GasPlate
custom={{
    height:'70%'
}}

dataList={dummyList}
onClick={()=>{
    setAlertBox(true)
}}
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
                        navigation.navigate('Confirm',{currPage:'Cart', chatPage:'Chat', nextPage:'CallChat'})
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

{alertBox &&
                <View style={{
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    position: 'absolute',
                    height: '105%',
                    width: '100%',
                    zIndex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MenuContainer
                        custom={{
                        }}

                        RenderItem={() => {
                            return (
                                <View style={{
                                    backgroundColor: 'white'
                                    // ,flex:1
                                    // , height: 100,
                                    ,width: 200,
                                    padding: 20
                                }}>
                                    <Text style={{
                                        fontWeight:'bold',
                                        color:COLORS.primary
                                    }}>Cancel Order ?</Text>
                                    <Text style={{
                                        marginTop:10
                                    }}>Order : Gass Fills</Text>
                                    <Text>Weight : 20 kg</Text>
                                    <Text>Price : 100 /=</Text>
                                    <View

                                        style={{
                                            marginTop: '15%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAlertBox(false)
                                            }}
                                            style={{
                                                width: '60%'
                                            }}
                                        >
                                            <MenuContainer
                                                custom={{
                                                    backgroundColor: COLORS.primary
                                                    ,borderRadius:7
                                                }}
                                                RenderItem={() => {
                                                    return (
                                                        <Text style={{
                                                            textAlign: 'center'
                                                            , color: 'white'
                                                            , fontWeight: 'bold'
                                                        }}>Continue</Text>
                                                    )
                                                }}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                alert('canceled order')
                                                setAlertBox(false)
                                                
                                            }}
                                            style={{
                                                width: '60%',
                                                marginLeft: 10
                                            }}
                                        >
                                            <MenuContainer
                                                custom={{
                                                    backgroundColor: COLORS.primary
                                                    ,borderRadius:7
                                                }}
                                                RenderItem={() => {
                                                    return (
                                                        <Text style={{
                                                            textAlign: 'center'
                                                            , color: 'white'
                                                            , fontWeight: 'bold'
                                                        }}>Cancel</Text>
                                                    )
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>}
        </SafeAreaView>
        // </KeyboardAvoidingView>

    )
}

export default Cart