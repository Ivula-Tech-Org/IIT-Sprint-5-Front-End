import { View, Text, KeyboardAvoidingView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from '../components/home'
import Chat from '../components/chat'
import Ionicons from "@expo/vector-icons/Ionicons";

import { useEffect } from 'react'
import { COLORS } from '../components/globals/theme'
import Profile from '../components/profile'
import Search from '../components/search'
import OrdersStack from '../components/orders'
import CartStack from '../components/cart'
const HomeNav = ({route}) => {
    const Tab = createBottomTabNavigator()
    // useEffect(() => {
    //     const loadFont = async () => {
    //         await Font.loadAsync({
    //             Ionicons: require('react-native-ionicons/fonts/Ionicons.ttf')
    //         })
    //     }
    //     loadFont
    // })
    const {token,LoadHandler} = route.params
    console.log('ths',LoadHandler)
    return (
        <View style={{
            flex: 1
        }}>
            <Tab.Navigator
            initialRouteName='Cart'
                screenOptions={({ route }) => ({

                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    
                    
                })}
            >
                <Tab.Screen name='Profile' component={Profile} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <Ionicons name='person' color={COLORS.primary} size={20} /> : <Ionicons color={COLORS.primary} name='person-outline' size={20} />
                    ),
                    keyboardHidesTabBar: true
                }
                } 
                initialParams={{token:token,LoadHandler:LoadHandler}}
                />
                <Tab.Screen name='Order' component={OrdersStack} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <Ionicons name='reader' color={COLORS.primary} size={20} /> : <Ionicons color={COLORS.primary} name='reader-outline' size={20} />
                    ),
                    keyboardHidesTabBar: true
                }
                } />
                <Tab.Screen name='Home' component={HomeStack} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <Ionicons name='home' color={COLORS.primary} size={20} /> : <Ionicons color={COLORS.primary} name='home-outline' size={20} />
                    ),
                    keyboardHidesTabBar: true
                }
                } />
                <Tab.Screen name='Search' component={Search} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <Ionicons name='search' color={COLORS.primary} size={20} /> : <Ionicons color={COLORS.primary} name='search-outline' size={20} />
                    ),
                    keyboardHidesTabBar: true
                }
                } />

                <Tab.Screen name='Cart' component={CartStack} options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? <Ionicons name='cart' color={COLORS.primary} size={20} /> : <Ionicons color={COLORS.primary} name='cart-outline' size={20} />
                    ),
                    keyboardHidesTabBar: true
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
        </View>

    )
}

export default HomeNav