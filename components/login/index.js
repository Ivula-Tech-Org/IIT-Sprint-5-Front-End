import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, AppState } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logInStyle from '../login/style'
import { Back, Banner, ErrorBox, InputText, LongButtonDark, LongButtonLight } from '../globals/utils'
import utilStyles from '../globals/utils/utilStyles'
import { fillGas } from '../globals/images'
import { useEffect, useState } from 'react'
import { COLORS } from '../globals/theme'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RNRestart  from 'react-native-restart'
const Login = ({ navigation,route }) => {
    const [loader, setLoader] = useState(false)
    const [checker, setChecker] = useState()
    const {reload,upadateRel} = route.params
    const [userEmail, setUserEmail] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState()
    const [errorMessage,setErrorMessage] = useState()
    const onLogin = () => {
        setLoader(true)
        var errToken = false
        try
        {

            axios.get('http://192.168.43.102:8000/auth_service/login', { params: { type: 'client', userEmail: userEmail, password: password} })
            .then(async (res) => {
                if(res.status = '200'){
                    // console.log(res.data.token)
                    token = res.data.token
                    try{
                        // const decodedToken = jwtDecode(token)
                        await AsyncStorage.setItem('Token',token)
                        
                            setLoader(false)
                            setErrorMessage(null)
                            upadateRel(true)

                      
                    }catch(err){
                        setErrorMessage('something went wrong')
                        setLoader(false)
                        console.log(err)
                    }
                }else{
                    setErrorMessage('something went wrong')
                }
            }).catch((err)=>{
                if(err.response){

                    console.log('these ',err.response.data.token)
                    setErrorMessage(err.response.data.token)
                    setLoader(false)
                }else{
                    setErrorMessage('Something went wrong')
                    setLoader(false)
                }
            })
        }catch(err){
            setLoader(false)
            setErrorMessage('Sory, something went wrong')
        }
    }
    const onForget = () => {
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
                    <ActivityIndicator color={COLORS.primary} style={{
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
                {errorMessage && <ErrorBox text={errorMessage}/>}

                <TextInput 
                keyboardType ='email-address'
                autoCapitalize = 'none'
                autoCompleteType = 'email'
                onChangeText={(e)=>{
                    console.log(e)
                    setUserEmail(e)


                }} style={[utilStyles.inputStyle, {

                }]}
                    placeholder='User name'
                />
                <TextInput secureTextEntry={true} onChangeText={(e)=>{
                    console.log(e)
                    setPassword(e)


                }} style={[utilStyles.inputStyle, {

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

export default Login