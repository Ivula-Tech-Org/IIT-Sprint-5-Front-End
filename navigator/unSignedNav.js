import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from '../components/signIn'
import Login from '../components/login'

const UnSignedNav = ()=>{
    const Stack = createNativeStackNavigator()
    return(
        
        <NavigationContainer 
        documentTitle={false}
        >
            <Stack.Navigator
            screenOptions={{
                headerShown:false,
                
                
            }}
            >
                <Stack.Screen name='Login' component={Login}/>
                <Stack.Screen name='SingIn' component={SignIn}/>

            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

export default UnSignedNav