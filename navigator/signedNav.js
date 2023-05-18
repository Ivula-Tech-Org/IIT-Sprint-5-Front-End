import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Locator from '../components/locator'
import HomeNav from './homeNav'
import Home from '../components/home'
import Chat from '../components/chat'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignedNav = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <NavigationContainer 
        documentTitle={false}
        >
            <Stack.Navigator
            screenOptions={{
                headerShown:false

            }}
            >
                <Stack.Screen name='HomeCast' component={HomeNav}/>
                <Stack.Screen name='Chat' component={Chat}/>
                {true && <Stack.Screen name='Locator' component={Locator}/>}
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default SignedNav