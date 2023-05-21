import { TouchableOpacity, Text, View, ImageBackground, TextInput, Touchable, ScrollView, FlatList } from "react-native";
import utilStyles from "./utilStyles";
import { fillGas, gasLift, orders } from "../images";
import { COLORS } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { gasWin } from "../images";

const LongButtonDark = ({ text, butStyle, textStyle, submit }) => {
    return (
        <TouchableOpacity style={[utilStyles.longButDark, butStyle]} onPress={submit} >
            <Text style={[utilStyles.butLightText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}
const LongButtonLight = ({ text, textStyle, butStyle, submit }) => {
    return (
        <TouchableOpacity style={[utilStyles.longButLight, butStyle]} onPress={submit}>
            <Text style={[utilStyles.butDarkText, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const Banner = ({ avator }) => {
    return (
        <View
            style={{

                // width:'100%',
                width: 270,
                paddingTop: 50,
            }}
        >
            <View
                style={{

                    // flex:1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                    height: 210,
                    width: 210,
                    // borderRadius:100,
                    overflow: "hidden",
                    // elevation:20,
                    marginLeft: '13%'
                }}
            >

                <ImageBackground
                    source={avator}
                    resizeMode="cover"
                    style={
                        {
                            flex: 1
                        }
                    }
                />
            </View>
            <View
                style={{
                    height: 50,
                    backgroundColor: 'white',
                    marginTop: -40,
                    borderTopWidth: 3,
                    borderColor: COLORS.primary
                }}
            ></View>
        </View>
    )
}
const Back = ({ navigation }) => {
    return (

        <SafeAreaView
            style={{
                position: 'absolute',
                left: '10%',
                top: '10%',
            }}
        >
            <TouchableOpacity style={{
                // borderWidth:1,
                borderRadius: 100,
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2
            }}
                onPress={navigation.goBack}
            >
                <Text>
                    <Ionicons name="chevron-back-outline" size={28} />
                </Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}
const ErrorBox = ({ text }) => {
    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                paddingLeft: 10,
                paddingRight: 10,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '80%',
                borderRadius: 5
            }}
        >
            <Text
                style={{
                    color: 'white'
                }}
            >
                {text}
            </Text>
        </View>
    )
}
const HeaderBar = ({ text }) => {
    return (
        <View style={{
            padding: 10,
            flexDirection: 'row-reverse',
            // justifyContent:'center',
            alignItems: 'center'
        }}>

            <ImageBackground
            source={gasWin}
                style={{
                    height: 50,
                    width: 50,
                    borderWidth: 1,
                    borderRadius: 100,
                    alignSelf: 'flex-end'
                    ,overflow:'hidden'
                }}>
            </ImageBackground>
            <TouchableOpacity
                style={{

                    alignSelf: 'flex-end'
                    ,left:'20%'
                }}
            >
                <Ionicons name="notifications-outline" size={20} />
            </TouchableOpacity>
            <Text style={{
                color: COLORS.primary,
                fontWeight: 'bold'
                , fontSize: 18,
                left:'400%',
                top:15
                
            }}>{text}</Text>

        </View>
    )
}
const SearchBar = ({searchLogic,custom})=>{
    return(
        <View
        style={[{

                flexDirection:'row',
                justifyContent:'space-between',
                // alignItems:'center',
                borderWidth:1,
                borderColor:COLORS.primary,
                borderRadius:20,
                width:'80%',
                alignSelf:'center'

        },custom]}
        >
            <TextInput placeholder="type here" style={{
                // borderWidth:1,
                paddingLeft:20,
                width:'74%'
            }}/>
            <TouchableOpacity 
            onPress={searchLogic}
            style={{
                backgroundColor:COLORS.primary,
                width:'25%',
                height:40,
                justifyContent:'center',
                alignItems:'center',
                borderRadius:20,
                borderBottomLeftRadius:0
            }}
            >
            <Ionicons name="search" size={20} color={'white'}/>
            </TouchableOpacity>
        </View>
    )

}

const dataList = ['me','up','you','and']
const CategBar = ({itemList,handleCat})=>{
    return(
            <FlatList 
            data={itemList}
            horizontal
            style={{
                borderBottomWidth:2
                ,paddingLeft:30
                ,paddingLRight:30
                ,alignSelf:'center',
                width:'80%',
                marginTop:30,
                // height:50,
                height:50,
                borderColor:COLORS.primary
            }}
            
            renderItem={(item)=>{
                item = item.item
                return(

                    <TouchableOpacity
                    onPress={handleCat}
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginRight:30
            }}
                    >
                        <ImageBackground 
                        source={item.gasImage}
                        style={{
                            height:40,
                            width:40,
                            background:'red'
                        }}
                        ></ImageBackground>
                        <Text style={{
                            fontSize:10,
                            paddingBottom:10
                        }}>{item.gasName}</Text>
                    </TouchableOpacity>
                    )
            }}
            />
    )

}
const ListGas = ({custom})=>{
    return(
        <View 
        style={[{
            backgroundColor: 'white',
            marginTop:'5%',
            borderWidth:1,
            borderColor:COLORS.primary,
            borderRadius:30,
            borderBottomLeftRadius:0,
            borderBottomRightRadius:0,
            overflow:'hidden',
            padding:15
        },custom]}>
            <FlatList 
            data={dataList}
            renderItem={(item)=>{
                let name = 'shelton'
                return(
                    <View
                    style={{
                        borderWidth:1,
                        width:'30%',
                        borderRadius:10,
                        overflow:'hidden'
                    }}
                    >
                        <ImageBackground
                        source={orders}
                        style={{
                            height:100
                        }}
                        />
                        <View
                        style={{
                            backgroundColor:COLORS.primary
                        }}
                        >
                    <Text
                    style={{
                        color:'white'
                        ,fontWeight:'bold'
                    }}
                    
                    >{name.toUpperCase()}</Text>
                    </View>
                    </View>

                )
            }}
            />
        </View>
    )

}
export { LongButtonDark, ListGas,LongButtonLight, HeaderBar, Banner, Back,SearchBar, ErrorBox,CategBar }