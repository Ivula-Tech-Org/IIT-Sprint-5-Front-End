import { TouchableOpacity, Text, View, ImageBackground, TextInput, Touchable, ScrollView, FlatList, RefreshControl } from "react-native";
import utilStyles from "./utilStyles";
import { fillGas, gasLift, orders } from "../images";
import { COLORS } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { gasWin } from "../images";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MapView, { Marker } from "react-native-maps";

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
                    , overflow: 'hidden'
                }}>
            </ImageBackground>
            <TouchableOpacity
                style={{

                    alignSelf: 'flex-end'
                    , left: '20%'
                }}
            >
                <Ionicons name="notifications-outline" size={20} />
            </TouchableOpacity>
            <Text style={{
                color: COLORS.primary,
                fontWeight: 'bold'
                , fontSize: 18,
                left: '400%',
                top: 15

            }}>{text}</Text>

        </View>
    )
}
const SearchBar = ({ searchLogic, custom }) => {
    return (
        <View
            style={[{

                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems:'center',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 20,
                width: '80%',
                alignSelf: 'center'

            }, custom]}
        >
            <TextInput placeholder="type here" style={{
                // borderWidth:1,
                paddingLeft: 20,
                width: '74%'
            }} />
            <TouchableOpacity
                onPress={searchLogic}
                style={{
                    backgroundColor: COLORS.primary,
                    width: '25%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    borderBottomLeftRadius: 0
                }}
            >
                <Ionicons name="search" size={20} color={'white'} />
            </TouchableOpacity>
        </View>
    )

}

const dataList = ['me', 'up', 'you', 'and']
const CategBar = ({ itemList, handleCat }) => {
    return (
        <FlatList
            data={itemList}
            horizontal
            style={{
                borderBottomWidth: 2
                , paddingLeft: 30
                , paddingLRight: 30
                , alignSelf: 'center',
                width: '80%',
                marginTop: 30,
                // height:50,
                height: 50,
                borderColor: COLORS.primary
            }}

            renderItem={(item) => {
                item = item.item
                return (

                    <TouchableOpacity
                        onPress={handleCat}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 30
                        }}
                    >
                        <ImageBackground
                            source={item.gasImage}
                            style={{
                                height: 40,
                                width: 40,
                                background: 'red'
                            }}
                        ></ImageBackground>
                        <Text style={{
                            fontSize: 10,
                            paddingBottom: 10
                        }}>{item.gasName}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )

}
const Container = ({ custom, RenderItem }) => {
    return (
        <View
            style={[{
                backgroundColor: 'white',
                marginTop: '5%',
                borderWidth: 1,
                borderColor: COLORS.primary,
                borderRadius: 30,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                overflow: 'hidden',
                padding: 15,

            }, custom]}>
            <RenderItem />
        </View>
    )
}
const ListGas = ({ custom, config }) => {
    const navigation = config.navigation
    const navTo = config.to

    return (
        <Container
            custom={custom}
            RenderItem={() => {
                return (

                    <View style={{

                    }}>
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontSize: 10,
                                marginTop: -5,
                                marginLeft: 15
                            }}
                        >Closest Around you</Text>
                        <FlatList
                            data={dataList}
                            style={{
                                flexDirection: 'column',
                                // paddingBottom:50
                            }}
                            refreshControl={
                                <RefreshControl refreshing={false} onRefresh={()=>{
                                    alert('hellow wolrd')
                                }}/>
                            }
                            horizontal={false}
                            contentContainerStyle={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                paddingBottom:50
                            }}
                            numColumns={3}
                            renderItem={(item) => {
                                let name = 'shelton omondi kiageasdfadfafd'
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(navTo, { item })
                                        }}
                                        style={{
                                            width: '30%',
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            marginLeft: '3%',
                                            marginBottom: '5%',
                                            elevation: 5

                                        }}
                                    >
                                        <ImageBackground
                                            source={orders}
                                            style={{
                                                height: 100,
                                                backgroundColor: 'grey'
                                            }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: COLORS.primary
                                                , padding: 10
                                                , paddingBottom: 5
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white'
                                                    , fontWeight: 'bold'
                                                    , fontSize: 10
                                                }}

                                            >{name.toUpperCase()}</Text>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 8,
                                                    marginTop: -3
                                                }}
                                            >nairobi, kenya</Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <Ionicons name="star" style={{
                                                    marginTop: 5
                                                }} color={'white'} />
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 10,
                                                    marginTop: 5,
                                                    marginLeft: 5
                                                }}>5</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                )
                            }}
                        />
                    </View>
                )
            }} />

    )

}
const ProfileCircle = ({ custom, source }) => {
    return (
        <ImageBackground
            style={[{
                borderWidth: 1,
                backgroundColor: 'grey',
                borderRadius: 100,
                overflow: 'hidden',
                alignSelf: 'center',
                borderColor: COLORS.primary
            }, custom]}
            source={source}
        />

    )
}
const IconButton = ({ onClick, icon, size, custom }) => {
    return (
        <TouchableOpacity style={[{
            background: 'red',
            padding: 5,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: COLORS.primary,
            height: size.box,
            width: size.box,
            justifyContent: 'center'
            , alignItems: 'center'

        }, custom]}
            onPress={onClick}
        >
            <Ionicons name={icon} size={size.icon} />
        </TouchableOpacity>
    )
}
const MenuContainer = ({ RenderItem, custom }) => {
    return (
        <View
            style={[{
                borderWidth: 1,
                borderColor: Colors.primary,
                padding: 5,
                borderRadius: 15,
            }, custom]}
        >
            <RenderItem />
        </View>
    )
}
const GasPlate = ({ custom, onClick, dataList, config }) => {
  
    return (
        <Container
            custom={custom}
            RenderItem={() => {
                return (

                    <View style={{

                    }}>
                        <Text
                            style={{
                                color: COLORS.primary,
                                fontSize: 10,
                                marginTop: -5,
                                marginLeft: 15
                            }}
                        >Closest Around you</Text>
                        <FlatList
                            data={dataList}
                            style={{
                                // flexDirection:'row'
                            }}
                            // horizontal={false}
                            contentContainerStyle={{
                                paddingHorizontal: 5,
                                paddingVertical: 5
                            }}
                            // numColumns={3}
                            renderItem={(item) => {
                                let name = 'shelton omondi kiage'
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                           config && config.navigation.navigate('Chat', { item })
                                           onClick && onClick()
                                        }}
                                        style={{
                                            width: '90%',
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            marginLeft: '3%',
                                            marginBottom: '5%',
                                            elevation: 5,
                                            flexDirection: 'row'

                                        }}
                                    >
                                        <ImageBackground
                                            source={orders}
                                            style={{
                                                width: 100
                                                , height: '100%'
                                            }}
                                        />
                                        <View
                                            style={{
                                                backgroundColor: COLORS.primary
                                                , padding: 10,
                                                paddingRight: 50,
                                                width: '100%'
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: 'white'
                                                    , fontWeight: 'bold'
                                                    , fontSize: 11
                                                }}

                                            >{name.toUpperCase()}</Text>

                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 11,
                                                }}
                                            >Gass Refill</Text>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 9,
                                                    marginTop: 3
                                                }}
                                            >nairobi, kenya</Text>

                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 9,
                                                    marginTop: -3

                                                }}
                                            >Price: 200/=</Text>


                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontSize: 9,
                                                    marginTop: -3
                                                }}
                                            >Weight : 12 kg</Text>

                                            <View
                                                style={{
                                                    flexDirection: 'row'
                                                    , bottom: 0
                                                }}
                                            >
                                                <Ionicons name="star" style={{
                                                    marginTop: 5
                                                }} color={'white'} />
                                                <Text style={{
                                                    color: 'white',
                                                    fontSize: 10,
                                                    marginTop: 5,
                                                    marginLeft: 5
                                                }}>5</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                )
                            }}
                        />
                    </View>
                )
            }} />

    )
}

const Maps = ({ withRef,tracer, withMarker, initialRegion, currRegion, custom }) => {
    return (

        <View style={[{ height: '50%' }, custom]}>
            <MapView
                ref={withRef}
                style={{ height: '100%' }}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {currRegion &&
                    <>
                        <Marker
                            coordinate={{
                                latitude: currRegion.latitude,
                                longitude: currRegion.longitude,
                            }}
                            title="You"
                        >

                        </Marker>
                        {tracer && 
                        <Marker
                            coordinate={{
                                // latitude: currRegion.latitude,
                                latitude: -1.2590906,
                                longitude: 36.7858022,


                                // longitude: currRegion.longitude,
                            }}
                            title="Supplier"
                        >

                        </Marker>}
                    </>
                }
            </MapView>
        </View>
    )
}
const Deals = ({custom,onClick,dealData})=>{
    return(
        <>
        <FlatList
        // scrollEnabled={true}
        style={[{
            height:'30%',
        },custom]}
        contentContainerStyle={{
            paddingBottom:50
        }}
        data={dealData}
        renderItem={()=>{
            return(
                <TouchableOpacity
                onPress={onClick}
                style={{
                    padding:5,
                    width:'90%',
                    borderRadius:10,
                    borderWidth:1,
                    marginTop:15,
                    flexDirection:'row'

                }}
                >
                    <ImageBackground
                    source={gasLift}
                    style={{
                        height:60,
                        width:60,
                        overflow:'hidden',
                        borderWidth:1,
                        borderRadius:100
                    }}
                    />
                    <View 
                    
                    style={{
                        paddingLeft:20
                    }}>
                        <Text style={{
                            fontSize:15,
                            color:COLORS.primary,
                            // fontWeight:'bold'
                        }}>Gass Refill</Text>
                        <Text style={{
                            fontSize:10
                        }}>40 - 60 kg</Text>
                        <Text style={{
                            fontSize:10
                        }}>22 mins</Text>
                        <Text style={{
                            fontSize:12,
                            left:'180%'
                        }}>1000/=</Text>
                    </View>
                </TouchableOpacity>
            )
        }}
        ListEmptyComponent={()=>{
            return(
                <View>
                    <Text>No Deals here</Text>
                </View>
            )
        }}
        />

        </>
    )
}
export { IconButton, Maps, MenuContainer, GasPlate, LongButtonDark, Container, ProfileCircle, ListGas, LongButtonLight, HeaderBar, Banner, Back, SearchBar, ErrorBox, CategBar ,Deals}