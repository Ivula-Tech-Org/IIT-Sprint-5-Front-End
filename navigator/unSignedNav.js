import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../components/signIn'
import Login from '../components/login'
import Forgot from '../components/forgot'
import SignUp from '../components/signup'

const UnSignedNav = ()=>{
    const Stack = createNativeStackNavigator()
    
    return(
        
        <NavigationContainer 
        documentTitle={false}
        >
            <Stack.Navigator
            initialRouteName='SignUp'
            screenOptions={{
                headerShown:false,
                
                
            }}
            >
                <Stack.Screen name='SignUp' component={SignUp}/>
                <Stack.Screen name='Forgot' component={Forgot}/>
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='SignIn' component={SignIn}/>

            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default UnSignedNav