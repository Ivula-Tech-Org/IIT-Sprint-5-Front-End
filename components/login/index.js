import {View,Text, TouchableOpacity, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logInStyle from '../login/style'
import { Back, Banner, InputText, LongButtonDark, LongButtonLight } from '../globals/utils'
import utilStyles from '../globals/utils/utilStyles'
import { fillGas } from '../globals/images'

const Login = ()=>{
    const toSignUp=()=>{
        alert()
    }
    return(
        <SafeAreaView
        style={[logInStyle.container,{
            backgroundColor:'white'
        }]}
        
        >
            
            <View>
            <Back/>

                <Banner avator={fillGas}/>
            </View>
            <View
            style={[{
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                padding:0
            }]}
            >
                <TextInput style={[utilStyles.inputStyle,{

                }]}
                placeholder='User name'
                /><TextInput style={[utilStyles.inputStyle,{

                }]}
                placeholder='Password'
                />
                <LongButtonDark text={'Log In'} submit={toSignUp}/>
                <TouchableOpacity 
                style={{

                    width:'100%',
                    paddingRight:'17%'
                }}
                >
                <Text style={{
                    textAlign:'right',
                    fontSize:12
                }}>forgot password?</Text>

                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default Login