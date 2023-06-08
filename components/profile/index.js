import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from '../chat'
import CallChat from '../callChat'
import Confirm from '../confirm'
import Profile from './landing'
import Dashboard from './dashboard'
import ListPlate from './listplate.js'
import StationStore from '../stationStore'

const ProfileStack = ({ route }) => {
    const Stack = createNativeStackNavigator()
    const { token, LoadHandler } = route.params

    return (

        <Stack.Navigator
            initialRouteName='StationStore'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                initialParams={{ token: token, LoadHandler: LoadHandler }}
                name='Profile' component={Profile} />

            <Stack.Screen
                name='Dashboard' component={Dashboard} />


            <Stack.Screen
                name='ListPlate' component={ListPlate} />

            <Stack.Screen name='DCallChat' component={CallChat} />
            <Stack.Screen name='DConfirm' component={Confirm} />
            <Stack.Screen name='DChat' component={Chat} />
            <Stack.Screen name='StationStore' component={StationStore} />

        </Stack.Navigator>

    )
}

export default ProfileStack