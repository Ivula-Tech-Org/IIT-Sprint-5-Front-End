import { useEffect, useState } from 'react'
import {SafeAreaView, StatusBar, Text,View} from 'react-native'
import SignedNav from './navigator/signedNav'
import UnSignedNav from './navigator/unSignedNav'
import EntrancePage from './navigator/entrance'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage'

const App = ()=>{
const [isSigned,setIsSigned] = useState(false)
const [notSigned,setNotSigned] = useState(false)
const [loader,setLoader] = useState(true)
const [token,setToken] = useState()

useEffect(()=>{
  (async ()=>{

    try{
      const tokenme = await AsyncStorage.getItem('Token')
      if(tokenme){
        setTimeout(() => {
          setNotSigned(false)
          setIsSigned(true)
          setLoader(false)
          setToken(tokenme)
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
const loginhandle = (data)=>{
 

  setNotSigned(false)
  setLoader(data)
  setTimeout(() => {
    
  setIsSigned(true)
  setLoader(false)
  }, 2000);
}
  return(
    <SafeAreaView style={{
      flex:1
    }}>
      {isSigned && <SignedNav />}
      {notSigned && <UnSignedNav loginHandle={loginhandle}/>}
      {loader && <EntrancePage/>}
      {/* <Text>hello world</Text> */}
    </SafeAreaView >
  )
}

export default App