import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logInStyle from '../login/style'
import { Back, Banner, InputText, LongButtonDark, LongButtonLight } from '../globals/utils'
import utilStyles from '../globals/utils/utilStyles'
import { fillGas } from '../globals/images'
import { useState } from 'react'

const SignUp = ({ navigation }) => {
    const [loader,setLoader] = useState(false)
    const onLogin = () => {
        setLoader(true)

    }
    const onForget = ()=>{
        navigation.navigate('Forgot')
    }
    return (
        <SafeAreaView
            style={[logInStyle.container, {
                backgroundColor: 'white',
            }]}

        >
            <Back navigation={navigation} />

            <View>

                <Banner avator={fillGas} />
                {loader ?
                <ActivityIndicator style={{
                    marginBottom: 10, marginTop: 0
                }} />:<></>}
            </View>
            <View
                style={[{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                }]}
            >
                <TextInput style={[utilStyles.inputStyle, {

                }]}
                    placeholder='User name'
                /><TextInput style={[utilStyles.inputStyle, {

                }]}
                    placeholder='Password'
                />
                <LongButtonDark text={'Log In'} submit={onLogin} />
                <TouchableOpacity
                    style={{

                        width: '100%',
                        paddingRight: '17%'
                    }}
                    onPress={onForget}
                >
                    <Text style={{
                        textAlign: 'right',
                        fontSize: 12
                    }}>forgot password?</Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default SignUp