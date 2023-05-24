import { View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Banner, Deals, IconButton, MenuContainer } from '../globals/utils'
import { fillGas } from '../globals/images'
import utilStyles from '../globals/utils/utilStyles'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { COLORS } from '../globals/theme'

const Station = ({navigation}) => {
    const [filtering, setFiltering] = useState(false)
    const [filterName, setFilterName] = useState('')
    const [filterBox, setFilterBox] = useState(false)
    const [options, setOptions] = useState(true)
    const [alertBox, setAlertBox] = useState(true)
    const filterAlert = (catName) => {
        setFilterName(catName)
        setFilterBox(false)
    }

    const dummDeals = ['dummy_1', 'dummy_2', 'dummy_3', 'dummy_4', 'dummy_5']
    return (
        <SafeAreaView
            style={[utilStyles.safeARea]}
        >
            <Banner avator={fillGas} />
            <View style={{

                backgroundColor: 'white',
                position: 'absolute',
                right: '10%',
                top: '45%',
                zIndex: 1,
                // borderWidth:1,
                flexDirection: 'row'
                , justifyContent: 'center'
                , alignItems: 'center'
            }}>
                {filtering &&
                    <IconButton
                        icon={'close'}
                        size={{ box: 20, icon: 15 }}
                        onClick={() => {
                            setFilterBox(false)
                            setFilterName(false)
                            setFiltering(false)
                        }}
                        custom={{
                            padding: 0
                            , marginRight: 5
                        }}
                    />}
                <MenuContainer
                    custom={{
                        alignSelf: 'flex-end',

                        borderRadius: 10,
                        paddingLeft: 15,
                        paddingRight: 15,

                    }}
                    RenderItem={() => {
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        filterBox ? setFilterBox(false) : setFilterBox(true)
                                        // alert('click')
                                    }}
                                    style={{

                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Ionicons name='list' size={15} />
                                    <Text style={{
                                        marginLeft: 5
                                    }}>Filter</Text>
                                </TouchableOpacity>
                                {filterBox && <View>
                                    <TouchableOpacity onPress={() => {
                                        filterAlert('Afri Gas')
                                        setFiltering(true)
                                    }} style={[utilStyles.listButtons]}>
                                        <Text>Afri Gas</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        filterAlert('K Gas')
                                        setFiltering(true)

                                    }} style={[utilStyles.listButtons]}>
                                        <Text>K Gas</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        filterAlert('Mini Gas')
                                        setFiltering(true)
                                    }} style={[utilStyles.listButtons]}>
                                        <Text>Mini Gas</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        filterAlert('Total Gas')
                                        setFiltering(true)

                                    }} style={[utilStyles.listButtons]}>
                                        <Text>Total Gas</Text>
                                    </TouchableOpacity>
                                </View>}

                            </>
                        )

                    }}
                />
            </View>
            <View
                style={{
                    width: '100%',
                    // , borderWidth: 1,
                    padding: 20
                }}
            >
                <Text style={{
                    borderBottomWidth: 1
                }}>
                    Gass Deals  {filtering && <>({filterName})</>}

                </Text>
                {/* <ScrollView> */}
                <Deals onClick={() => {
                    setOptions(true)
                }} dealData={dummDeals} />
                {/* </ScrollView> */}

                <Text style={{
                    borderBottomWidth: 1,
                    marginTop: 20
                }}>
                    Gass Accessories  {filtering && <>({filterName})</>}

                </Text>
                <Deals dealData={dummDeals}
                onClick={()=>{
                    setAlertBox(true)

                }}
                />
            </View>
            {options &&
                <View style={{
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    position: 'absolute',
                    height: '105%',
                    width: '100%',
                    zIndex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MenuContainer
                        custom={{
                        }}

                        RenderItem={() => {
                            return (
                                <View style={{
                                    backgroundColor: 'white'
                                    // ,flex:1
                                    , height: 100,
                                    width: 200,
                                    padding: 20
                                }}>
                                    <View 
                                    style={{
                                        flexDirection:'row'
                                    }}
                                    >
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: COLORS.primary
                                        }}>Weight : </Text>
                                        <IconButton icon={'remove-outline'} size={{ box: 20, size: 23 }} custom={{
                                            padding: 1,
                                            marginLeft:10
                                        }} />
                                        <Text style={{
                                            fontWeight: 'bold',
                                            marginLeft:7
                                        }}>20
                                        </Text>
                                        <IconButton icon={'add-outline'} size={{ box: 20, size: 23 }} custom={{
                                            marginLeft:7,
                                            padding: 1
                                        }} />
                                    </View>

                                    <TouchableOpacity 
                                    onPress={()=>{
                                        setOptions(false)
                                        setAlertBox(true)
                                    }}
                                    style={{
                                        marginTop:'20%'
                                    }}
                                    >
                                        <MenuContainer
                                        custom={{
                                            backgroundColor:COLORS.primary
                                        }}
                                        RenderItem={()=>{
                                            return(
                                                <Text style={{
                                                    textAlign:'center'
                                                    ,color:'white'
                                                    ,fontWeight:'bold'
                                                }}>Add To Cart</Text>
                                            )
                                        }}
                                        />
                                        </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>

            }

{alertBox &&
                <View style={{
                    backgroundColor: 'rgba(255,255,255, 0.8)',
                    position: 'absolute',
                    height: '105%',
                    width: '100%',
                    zIndex: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MenuContainer
                        custom={{
                        }}

                        RenderItem={() => {
                            return (
                                <View style={{
                                    backgroundColor: 'white'
                                    // ,flex:1
                                    , height: 100,
                                    width: 200,
                                    padding: 20
                                }}>
                                    <Text>Continue Shopping?</Text>
                                    <View  
                                    
                                    style={{
                                        marginTop:'20%',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                    >
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        setAlertBox(false)
                                        setOptions(false)
                                    }}
                                    style={{
                                        width:'60%'
                                    }}
                                    >
                                        <MenuContainer
                                        custom={{
                                            backgroundColor:COLORS.primary
                                        }}
                                        RenderItem={()=>{
                                            return(
                                                <Text style={{
                                                    textAlign:'center'
                                                    ,color:'white'
                                                    ,fontWeight:'bold'
                                                }}>Continue</Text>
                                            )
                                        }}
                                        />
                                        </TouchableOpacity>

                                    <TouchableOpacity 
                                    onPress={()=>{
                                        setAlertBox(false)
                                        setOptions(false)
                                        navigation.navigate('Cart')
                                    }}
                                    style={{
                                        width:'60%',
                                        marginLeft:10
                                    }}
                                    >
                                        <MenuContainer
                                        custom={{
                                            backgroundColor:COLORS.primary
                                        }}
                                        RenderItem={()=>{
                                            return(
                                                <Text style={{
                                                    textAlign:'center'
                                                    ,color:'white'
                                                    ,fontWeight:'bold'
                                                }}>Cart</Text>
                                            )
                                        }}
                                        />
                                        </TouchableOpacity>
                                        </View>
                                </View>
                            )
                        }}
                    />
                </View>}
        </SafeAreaView>
    )
}

export default Station