import { useEffect, useState } from 'react'
import {KeyboardAvoidingView, SafeAreaView, StatusBar, Text,View} from 'react-native'
import SignedNav from './navigator/signedNav'
import UnSignedNav from './navigator/unSignedNav'
import EntrancePage from './navigator/entrance'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'

const App = ()=>{
const [isSigned,setIsSigned] = useState(false)
const [notSigned,setNotSigned] = useState(false)
const [loader,setLoader] = useState(false)
const [token,setToken] = useState()

useEffect(()=>{
  (async ()=>{

    try{
      const tokenme = await AsyncStorage.getItem('Token')
      if(tokenme){
        setToken(tokenme)
        setTimeout(() => {
          setNotSigned(false)
          setIsSigned(true)
          setLoader(false)
        }, 3000);
      }else{
        setTimeout(() => {
          
        setIsSigned(false)
        setNotSigned(true)
        setLoader(false)
        }, 3000);

      }
  
    }catch(err){
      alert('Error setting Up, kindly restart app')
    }
    
  })()

},[token])

class LoadHandler {
  handleLogOut(){

  setIsSigned(false)
  setLoader(true)
  setTimeout(() => {
    
  setNotSigned(true)
  setLoader(false)
  }, 2000);
  }
}

// console.log('hi',LoadHandler)

// useEffect(()=>{

// class loadHandler {
//   handleLogOut(){
//     alert('log out')
//   }
// }
// const handle = new loadHandler
//   console.log(handle.handleLogOut)
//   handle.handleLogOut()
//   console.log('hi')
// })

const loginhandle = (data)=>{
 

  setToken('to_change')
  setNotSigned(false)
  setLoader(data)
  setTimeout(() => {
    
  setIsSigned(true)
  setLoader(false)
  }, 2000);
}

  return(
    <NavigationContainer>
    <SafeAreaView style={{
      flex:1
    }}>
    {/* <KeyboardAvoidingView   behavior="padding" enabled> */}

      {isSigned && <SignedNav myInitialParams={{token:token,LoadHandler:LoadHandler}} />}
      {notSigned && <UnSignedNav loginHandle={loginhandle}/>}
      {loader && <EntrancePage/>}
      {/* <Text>hello world</Text> */}
    {/* </KeyboardAvoidingView> */}
    </SafeAreaView >
    </NavigationContainer>
  )
}

export default App