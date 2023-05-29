import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from './landing'
import Chat from '../chat'
import CallChat from '../callChat'
import Confirm from '../confirm'
import ConfirmLocation from '../locator/confirmLocation'

const CartStack = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <Stack.Navigator
        initialRouteName='Cartie'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Cartie' component={Cart}/>
            <Stack.Screen name='Chat' component={Chat}/>
            <Stack.Screen name='CallChat' component={CallChat}/>
            <Stack.Screen name='Confirm' component={Confirm}/>
            <Stack.Screen name='Location' component={ConfirmLocation}/>
            


        </Stack.Navigator>
    )
}

export default CartStack