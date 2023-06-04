import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Chat from '../chat'
import Orders from './landing'
import Confirm from '../confirm'
import CallChat from '../callChat'
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
            <Stack.Screen name='CallChat' component={CallChat}/>
            <Stack.Screen name='Chat' component={Chat}/>
           


        </Stack.Navigator>
    )
}

export default OrdersStack