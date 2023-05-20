import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import forgotStyle from '../forgot/style'
import { Back, Banner, InputText, LongButtonDark, LongButtonLight } from '../globals/utils'
import utilStyles from '../globals/utils/utilStyles'
import { fillGas, gasWin } from '../globals/images'
import { useState } from 'react'

const Forgot = ({ navigation }) => {
    const [loader, setLoader] = useState(false)
   
    const onForget = () => {
        setLoader(true)
        navigation.navigate('SignIn')
    }
    return (
        <SafeAreaView
            style={[forgotStyle.container, {
                backgroundColor: 'white',
            }]}

        >
            <Back navigation={navigation} />

            <View>

                <Banner avator={gasWin} />
                {loader ?
                    <ActivityIndicator style={{
                        marginBottom: 10, marginTop: 0
                    }} /> : <></>}
            </View>
            <View
                style={[{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                }]}
            >
                <Text style={{
                    marginLeft:'-20%'
                }}>Enter your email to recover</Text>
                <TextInput style={[utilStyles.inputStyle, {

                }]}
                    placeholder='email'
                />
                <LongButtonDark text={'recover'} submit={onForget} />

            </View>

        </SafeAreaView>
    )
}

export default Forgot