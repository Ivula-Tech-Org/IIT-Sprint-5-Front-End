import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, IconButton, MenuContainer, ProfileCircle } from '../globals/utils'
import { gasLift, gasWin } from '../globals/images'
import { useState } from 'react'

const Profile = () => {
    const [openMenu, setOpenMenu] = useState(true)
    const expandMenu = () => {

        openMenu ? setOpenMenu(false) : setOpenMenu(true)
    }
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
                    return (
                        <View style={{
                            alignSelf: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Shelton omondi</Text>
                            <Text>shelton@email.com</Text>
                            <Text
                                style={{
                                    fontSize: 10
                                }}
                            >909098</Text>
                            {openMenu ?
                            <IconButton icon={'close'} onClick={expandMenu}/>:
                            <IconButton icon={'menu'} onClick={expandMenu}/>}
                            {openMenu && 
                            <MenuContainer 
                            custom={{
                                marginTop:5
                            }}
                            RenderItem={()=>{
                                return(
                                    <View
                                    >
                                        <IconButton icon={'menu'}/>
                                        <IconButton icon={'menu'}/>
                                        <IconButton icon={'menu'}/>
                                    </View>
                                )
                            }}/>
                            }
                            </View>
                    )
                }} />
        </SafeAreaView>
    )
}

export default Profile