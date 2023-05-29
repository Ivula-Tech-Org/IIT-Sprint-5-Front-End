import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logInStyle from '../login/style'
import { Back, Banner, ErrorBox, InputText, LongButtonDark, LongButtonLight } from '../globals/utils'
import utilStyles from '../globals/utils/utilStyles'
import { fillGas, orders } from '../globals/images'
import { useState } from 'react'
import { COLORS } from '../globals/theme'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = ({ navigation,route }) => {
    const [loader, setLoader] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const [conPassword, setConPassword] = useState()
    const {reload,upadateRel} = route.params

    const onLogin = async() => {
        setLoader(true)
        var errToken = false
        if(password === conPassword){

            try
            {
    
                console.log(email,userName,password,phoneNumber)
                axios.post('http://192.168.1.7:8000/auth_service', null,{ params: { type: 'client', userEmail: email,userName:userName,phoneNumber:phoneNumber, password: password} })
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
    
                        console.log('these ',err.response.data)
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
        }else{
            setLoader(false)
            setErrorMessage('passwords did not match')

        }


    }
    const onDistributer = () => {
        alert('this goes to an external web')
    }
    return (
        <SafeAreaView
            style={[logInStyle.container, {
                backgroundColor: 'white',
            }]}

        >
            
            <Back navigation={navigation} />

            <View>

                <Banner avator={orders} />
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
                {errorMessage && <ErrorBox text={errorMessage} />}
                <TextInput
                    onChangeText={(text) => {
                        setUserName(text)
                    }}
                    style={[utilStyles.inputStyle, {

                    }]}
                    placeholder='User Name'
                />
                <TextInput
                
                keyboardType ='email-address'
                autoCapitalize = 'none'
                autoCompleteType = 'email'
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    style={[utilStyles.inputStyle, {

                    }]}
                    placeholder='Email'
                />
                <TextInput
                keyboardType='numeric'
                    onChangeText={(text) => {
                        setPhoneNumber(text)
                    }}
                    style={[utilStyles.inputStyle, {

                    }]}
                    placeholder='Phone Number'
                />
                <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    style={[utilStyles.inputStyle, {

                    }]}
                    placeholder='Password'
                />
                <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setConPassword(text)
                    }}
                    style={[utilStyles.inputStyle, {

                    }]}
                    placeholder='Confirm Password'
                />
                <LongButtonDark text={'Sign Up'} submit={onLogin} />
                <TouchableOpacity
                    style={{

                        width: '100%',
                        paddingRight: '17%'
                    }}
                    onPress={onDistributer}
                >
                    <Text style={{
                        textAlign: 'right',
                        fontSize: 12
                    }}>Are you a distributer?</Text>

                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default SignUp