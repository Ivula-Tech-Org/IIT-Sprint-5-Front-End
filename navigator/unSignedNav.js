import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../components/signIn'
import Login from '../components/login'
import Forgot from '../components/forgot'
import SignUp from '../components/signup'
import { useEffect, useState } from 'react'

const UnSignedNav = ({loginHandle})=>{
    const [reload,setReload] = useState()
    const Stack = createNativeStackNavigator()

    const upadateRel = (triger)=>{
        setReload(triger)
        loginHandle(triger)
        console.log('triger',triger)
    }
    return(
        
        <NavigationContainer 
        documentTitle={false}
        >
            <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{ 
                headerShown:false,
                
                
            }}
            >
                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='Forgot' component={Forgot}/>
                <Stack.Screen name='Login' component={Login} initialParams={{reload,upadateRel}} />
                <Stack.Screen name='SignIn' component={SignIn}/>

            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default UnSignedNav