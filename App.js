import { useEffect } from 'react'
import {SafeAreaView, StatusBar, Text,View,} from 'react-native'
import SignedNav from './navigator/signedNav'
import UnSignedNav from './navigator/unSignedNav'

const App = ()=>{

  return(
    <SafeAreaView style={{
      flex:1
    }}>
      {/* <SignedNav/> */}
      <UnSignedNav/>
      {/* <Text>hello world</Text> */}
    </SafeAreaView >
  )
}

export default App