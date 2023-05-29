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
        
            <Stack.Navigator
            initialRouteName='SignIn'
            screenOptions={{ 
                headerShown:false,
                
                
            }}
            >
                <Stack.Screen name='SignUp' component={SignUp}  initialParams={{reload,upadateRel}}/>
                <Stack.Screen name='Forgot' component={Forgot}/>
                <Stack.Screen name='Login' component={Login} initialParams={{reload,upadateRel}} />
                <Stack.Screen name='SignIn' component={SignIn}  initialParams={{reload,upadateRel}}/>

            </Stack.Navigator>
        
    )
}

export default UnSignedNav