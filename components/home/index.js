import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Home from './home'
import Station from '../station'

const HomeStack = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <Stack.Navigator
        initialRouteName='Homie'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name='Homie' component={Home}/>
            <Stack.Screen name='Station' component={Station}/>

        </Stack.Navigator>
    )
}

export default HomeStack