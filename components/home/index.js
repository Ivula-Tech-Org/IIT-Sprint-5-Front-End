import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './landing'
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