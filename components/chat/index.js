import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {ActivityIndicator, ActivityIndicatorBase, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TypingIndicator } from '../globals/animation'
import chatStyles from './style'
import { Ionicons } from '@expo/vector-icons'

const Chat = ({navigation,route})=>{
    const isFocused = useIsFocused()
    const [smsAvailable,setSmsAvailable]=useState(false)
  
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={chatStyles.avatorBox}>
                <View style={chatStyles.avator}></View>
                <Text style={chatStyles.avatorName}>name</Text>

            </View>
            <View>

            <ScrollView style={{height:'80%',padding:'5%'}}>
                <Text style={{fontSize:10, textAlign:'center',color:'grey',fontStyle:'italic'}}>Your chats are end to end encrypted</Text>
            <Text style={chatStyles.sentText}>Hello world this is the chat page {route.params?.data}</Text>
            <Text style={chatStyles.sentText}>Hello world this is the chat page {route.params?.data}</Text>
            <Text style={chatStyles.recText}>Hello world this is the chat page {route.params?.data}</Text>
            <Text style={chatStyles.sentText}>Hello world this is the chat page {route.params?.data}</Text>
            <Text style={chatStyles.sentText}>Hello world this is the chat page {route.params?.data}</Text>
            <Text style={chatStyles.recText}>Hello world this is the chat page {route.params?.data}</Text>

            {smsAvailable ? <></>:<ActivityIndicator style={{marginTop:'5%'}} />}
            </ScrollView>
            </View>
            <View style={chatStyles.typeBox}>
                <View style={{marginLeft:'10%'}}> 
            <TypingIndicator/>
                </View>
            <View style={chatStyles.innerBox}>
            <TextInput style={chatStyles.input} placeholder='enter message'/>
            <TouchableOpacity style={chatStyles.sendButton}>
            <Ionicons name='send-outline' color='brown' size={18}/>
            </TouchableOpacity>
            </View>
            </View>
           
        </View>
        </SafeAreaView>
    )
}

export default Chat