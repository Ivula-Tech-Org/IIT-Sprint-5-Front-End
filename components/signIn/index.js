import {View,Text, TouchableOpacity} from 'react-native'
import signStyle from './style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Banner, LongButtonDark, LongButtonLight } from '../globals/utils'
import { gasLift } from '../globals/images'
const SignIn = ()=>{

    const toLogin = ()=>{
        alert('alright')
    }
    const toSignUp = ()=>{
        alert('alright')
    }
    return(
        <SafeAreaView
        style={[signStyle.container,{
            backgroundColor:'white'
        }]}
        
        >
            <View>
                <Banner avator={gasLift}/>
            </View>
            <View
            style={[{
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                padding:0
            }]}
            >
                <LongButtonDark text={'Log In'} submit={toSignUp}/>
                <LongButtonLight text={'Sign Up'} butStyle={{marginTop:10}} submit={toLogin}/>
                <TouchableOpacity 
                style={{

                    width:'100%',
                    paddingRight:'17%'
                }}
                >
                <Text style={{
                    textAlign:'right',
                    fontSize:12
                }}>Continue without sign in?</Text>

                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default SignIn