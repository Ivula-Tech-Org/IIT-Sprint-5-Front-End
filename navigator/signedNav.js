import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Locator from '../components/locator'
import HomeNav from './homeNav'

const SignedNav = ({myInitialParams})=>{
    const Stack = createNativeStackNavigator()
    const {token,LoadHandler} = myInitialParams
    const loadInstance = new LoadHandler()

    const navigation = useNavigation()
    return(
        
            <Stack.Navigator
            initialRouteName='HomeCast'
            screenOptions={{
                headerShown:false,
                // TransitionEvent:false
                
            }}
            
            >
                <Stack.Screen name='Locator'  component={Locator}/>
                <Stack.Screen name='HomeCast' initialParams={{token:token,LoadHandler:LoadHandler}} component={HomeNav}/>
            </Stack.Navigator>
        
        
    )
}

export default SignedNav