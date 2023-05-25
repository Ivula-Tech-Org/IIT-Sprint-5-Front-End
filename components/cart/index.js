import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Station from '../station'
import Cart from './cart'
import Chat from '../chat'
import CallChat from '../callChat'
import Confirm from '../confirm'

const CartStack = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <Stack.Navigator
        initialRouteName='Confirm'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Cartie' component={Cart}/>
            <Stack.Screen name='Chat' component={Chat}/>
            <Stack.Screen name='CallChat' component={CallChat}/>
            <Stack.Screen name='Confirm' component={Confirm}/>
            


        </Stack.Navigator>
    )
}

export default CartStack