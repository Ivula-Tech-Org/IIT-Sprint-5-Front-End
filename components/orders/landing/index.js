import React from "react";
import { Text, KeyboardAvoidingView, TouchableOpacity, View, ImageBackground, FlatList, Linking } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { CategBar, Container, GasPlate, HeaderBar, ListGas, MenuContainer, SearchBar } from "../../globals/utils";
import { gasLift, gasWin } from "../../globals/images";
import { COLORS } from "../../globals/theme";
const Orders = ({ navigation }) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]

    return (
        //  <KeyboardAvoidingView   behavior="padding" enabled> 


        <SafeAreaView style={{
            // backgroundColor:'red'
        }}>
            <HeaderBar text={'Orders'} source={gasWin}/>
            
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
                        Linking.openURL('https://rumaretreat.org')
                    }}
                    >
                        <Text 
                        style={{
                            fontWeight:'bold',
                            color:COLORS.primary
                        }}
                        >Reach Out</Text>
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

export default Orders