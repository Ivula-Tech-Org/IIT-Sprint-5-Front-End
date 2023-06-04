import typingIndicator from './../../../assets/typing.json'
import emptyBox from './../../../assets/emptybox.json'
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
const EmptyBoxLoader = ({size})=>{
    return(
        <View style={{padding:0}}>
            <AnimatedLottieView
            source={emptyBox}
            autoSize
            autoPlay
            loop
            speed={1.5}
            style={{height:size,marginLeft:'5%',}}
            />
        </View>
    )
}
export {TypingIndicator, EmptyBoxLoader}