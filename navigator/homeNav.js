import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../components/home'
import Chat from '../components/chat'
import Ionicons from "@expo/vector-icons/Ionicons";

import { useEffect } from 'react'
const HomeNav = () => {
    const Tab = createBottomTabNavigator()
    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                Ionicons: require('react-native-ionicons/fonts/Ionicons.ttf')
            })
        }
        loadFont
    })
    
    return (<Tab.Navigator
                screenOptions={({ route }) => ({
        
                tabBarVisible:false
                })}
            >
                <Tab.Screen name='Home' component={Home} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                       focused ?<Ionicons name='home' size={18}/>: <Ionicons name='home-outline' size={18}/>
                    )
                }
                } />
                {/* <Tab.Screen name='Chat' component={Chat} options={{
                    tabBarIcon:({focused})=>(
                        focused ?<Ionicons name='chatbubble-ellipses' size={18}/>:<Ionicons name='chatbubble-ellipses-outline' size={18}/>
                    )
                }}/> */}
                {/* <Tab.Screen name='Chat' component={Chat}
                options={{
                    tabBarVisible:false
                }}
                /> */}
            </Tab.Navigator>
        // <View><Text>kj;kjsdf </Text></View>
    )
}

export default HomeNav