import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, IconButton, MenuContainer, ProfileCircle } from '../globals/utils'
import { gasLift, gasWin } from '../globals/images'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

const Profile = ({ route }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const expandMenu = () => {
        openMenu ? setOpenMenu(false) : setOpenMenu(true)
    }
    const { token, LoadHandler } = route.params
    const userDetails = jwtDecode(token)
    const loadHandler = new LoadHandler()
    return (
        <SafeAreaView>
            <ProfileCircle
                source={gasWin}
                custom={{
                    height: 130,
                    width: 130,
                    marginTop: '50%',
                    top: '10%',
                    zIndex: 1
                }} />
            <Container
                custom={{
                    height: '52%',
                    paddingTop: 60
                }}
                RenderItem={() => {
                    console.log('token', token)
                    return (
                        <View style={{
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>{userDetails.userName}</Text>
                            <Text>{userDetails.userEmail}</Text>
                            <Text
                                style={{
                                    fontSize: 10
                                }}
                            >{userDetails.phoneNumber}</Text>
                            {openMenu ?
                                <IconButton icon={'close'} size={{ icon: 20, box: 35 }} custom={{
                                    marginTop: '10%',

                                }} onClick={expandMenu} /> :
                                <IconButton icon={'menu'} size={{ icon: 20, box: 35 }} custom={{
                                    marginTop: '10%',
                                }} onClick={expandMenu} />}
                            {openMenu &&
                                <MenuContainer
                                    custom={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        marginTop: 5,
                                        // width:'100%',
                                        // backgroundColor:'red'

                                    }}
                                    RenderItem={() => {
                                        return (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    // height:50,

                                                }}
                                            >
                                                <IconButton custom={{
                                                    marginRight: 10,
                                                }} size={{ icon: 15, box: 30 }} icon={'information-outline'} />
                                                {
                                                    userDetails.tier == 'contractor' &&
                                                    <IconButton size={{ icon: 15, box: 30 }} custom={{
                                                        marginRight: 10
                                                    }} icon={'aperture-outline'} />
                                                }
                                                <IconButton size={{ icon: 15, box: 30 }} icon={'log-in-outline'} onClick={async () => {
                                                    await AsyncStorage.clear()
                                                    loadHandler.handleLogOut()
                                                }} />
                                            </View>
                                        )
                                    }} />
                            }
                        </View>
                    )
                }} />
        </SafeAreaView>
    )
}

export default Profile