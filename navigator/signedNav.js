import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Locator from '../components/locator'
import HomeNav from './homeNav'
import Home from '../components/home'
import Chat from '../components/chat'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignIn from '../components/signIn'

const SignedNav = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <NavigationContainer 
        documentTitle={false}
        >
            <Stack.Navigator
            initialRouteName='HomeCast'
            screenOptions={{
                headerShown:false,
                // TransitionEvent:false
                
            }}
            
            >
                <Stack.Screen name='Locator' component={Locator}/>
                <Stack.Screen name='HomeCast' component={HomeNav}/>
                <Stack.Screen name='Chat' component={Chat}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default SignedNav