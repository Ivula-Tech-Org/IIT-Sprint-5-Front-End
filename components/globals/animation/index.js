import typingIndicator from './../../../assets/typing.json'
import {View} from 'react-native'
import AnimatedLottieView from "lottie-react-native";

const TypingIndicator = ()=>{
    return(
        <View style={{padding:0}}>
            <AnimatedLottieView
            source={typingIndicator}
            autoSize
            autoPlay
            loop
            speed={1.5}
            style={{height:35,margin:0,bottom:-6}}
            />
        </View>
    )
}
export {TypingIndicator}