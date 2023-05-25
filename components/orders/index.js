import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Chat from '../chat'
import Orders from './orders'

const OrdersStack = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <Stack.Navigator
        initialRouteName='Orders'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Orders' component={Orders}/>
            <Stack.Screen name='Chat' component={Chat}/>
           


        </Stack.Navigator>
    )
}

export default OrdersStack