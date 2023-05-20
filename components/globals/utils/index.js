import { TouchableOpacity,Text,View, ImageBackground, TextInput } from "react-native";
import utilStyles from "./utilStyles";
import { gasLift } from "../images";
import { COLORS } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const LongButtonDark = ({text,butStyle,textStyle,submit})=>{
return(
    <TouchableOpacity style={[utilStyles.longButDark,butStyle]} onPress={submit} >
        <Text style={[utilStyles.butLightText,textStyle]}>{text}</Text>
    </TouchableOpacity>
)
}

const LongButtonLight = ({text,textStyle,butStyle,submit})=>{
    return(
        <TouchableOpacity style={[utilStyles.longButLight,butStyle]} onPress={submit}>
            <Text style={[utilStyles.butDarkText,textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
    }
    
const Banner = ({avator})=>{
    return(
        <View
        style={{

            // width:'100%',
            width:270,
            paddingTop:50,
        }}
        >
            <View
            style={{

                    // flex:1,
                    resizeMode:'cover',
                    justifyContent:'center',
                    height:210,
                    width:210,
                    // borderRadius:100,
                    overflow:"hidden",
                    // elevation:20,
                    marginLeft:'13%'
            }}
            >

            <ImageBackground 
            source={avator}
            resizeMode="cover"
            style={
                {
                    flex:1
                }
            }
            />
            </View>
            <View 
            style={{
                height:50,
                backgroundColor:'white',
                marginTop:-40,
                borderTopWidth:3,
                borderColor:COLORS.primary
            }}
            ></View>
        </View>
    )
}
const Back = ({navigation})=>{
    return(

    <SafeAreaView
    style={{
        position:'absolute',
        left:'10%',
        top:'10%',
    }}
    >
    <TouchableOpacity style={{
        // borderWidth:1,
        borderRadius:100,
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
        elevation:2
    }}
    onPress={navigation.goBack}
    >
        <Text>
            <Ionicons name="chevron-back-outline" size={28}/>
        </Text>
    </TouchableOpacity>
    </SafeAreaView>

    )
}

export {LongButtonDark,LongButtonLight,Banner,Back}