import { useEffect } from 'react'
import {SafeAreaView, StatusBar, Text,View,} from 'react-native'
import SignedNav from './navigator/signedNav'

const App = ()=>{

  return(
    <SafeAreaView style={{
      flex:1
    }}>
      <SignedNav/>
      {/* <Text>hello world</Text> */}
    </SafeAreaView >
  )
}

export default App