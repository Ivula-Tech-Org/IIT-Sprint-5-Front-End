import { View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AlertBox, Banner, Deals, IconButton, MenuContainer, Options } from '../globals/utils'
import { fillGas } from '../globals/images'
import utilStyles from '../globals/utils/utilStyles'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Station = ({ navigation, route }) => {
    const [filtering, setFiltering] = useState(false)
    const [filterName, setFilterName] = useState('')
    const [filterBox, setFilterBox] = useState(false)
    const [options, setOptions] = useState(false)
    const [alertBox, setAlertBox] = useState(false)
    const [gassList, setGassList] = useState([])
    const [accList, setAccList] = useState([])
    const [categList, setCategList] = useState([])
    const { user, station, token } = route.params
    const [size, setSize] = useState()
    const [selected, setSelected] = useState()
    const [price, setPrice] = useState()
    const [cartItems, setCartItems] = useState()

    const filterAlert = (catName) => {
        setFilterName(catName)
        setFilterBox(false)
    }
    const closePop = () => {

        setAlertBox(false)
        setOptions(false)
    }
    const alertPop = () => {

        setOptions(false)
        setAlertBox(true)
    }
    const navTo = () => {

        setAlertBox(false)
        setOptions(false)
        navigation.navigate('Cart')
    }
    const dummDeals = ['dummy_1', 'dummy_2', 'dummy_3', 'dummy_4', 'dummy_5']


    useEffect(() => {
        (async () => {

            try {

                axios.get('http://192.168.1.109:8000/front_end_service/gasService', { params: { stationId: '642ad160612d3a2c11f7d070' }, headers: { authorization: token } })
                    .then(async (res) => {
                        setGassList(res.data.data)
                        console.log('gass list', res.data.data)

                    }).catch((err) => {
                        alert('Sorry an error occured')
                        console.log(err)

                    })

                axios.get('http://192.168.1.109:8000/front_end_service/AccService', { params: { stationId: '642ad160612d3a2c11f7d070' }, headers: { authorization: token } })
                    .then(async (res) => {
                        setAccList(res.data.data)
                        console.log('gass list', res.data.data)

                    }).catch((err) => {
                        alert('Sorry an error occured')

                    })
            } catch (err) {
                alert('something went wrong')
                console.log(err)
            }
        })()
       
    },[])

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
                <Deals onClick={(item) => {
                    setOptions(true)
                    setSelected(item)
                    console.log('clicked', item)
                }} dealData={gassList} />
                {/* </ScrollView> */}

                <Text style={{
                    borderBottomWidth: 1,
                    marginTop: 20
                }}>
                    Gass Accessories  {filtering && <>({filterName})</>}

                </Text>
                <Deals dealData={accList}
                    onClick={() => {
                        setOptions(true)

                    }}
                />
            </View>
            {options &&
                <Options
                    btnClick={async () => {
                        console.log('hello world')
                        const cartItem = {
                            service: selected.service,
                            item: selected._id,
                            name:selected.name,
                            image:selected.image,
                            station: station._id,
                            client: user._id,
                            town: station.town,
                            rating: station.stationRating,
                            price: price ? price : selected.weightRange[0].price,
                            size: size ? size : selected.weightRange[0].price,
                            estTime : selected.deliveryTime,
                            location : station.stationLocation
                            ,phoneNumber:station.phoneNumber
                        }
                        let cart = await AsyncStorage.getItem('CartItems')
                        if (cart) {
                            cart = JSON.parse(cart)
                            cart.push(cartItem)
                            cart = JSON.stringify(cart)
                        } else {
                            cart = [cartItem]
                            cart = JSON.stringify(cart)
                        }
                        await AsyncStorage.setItem('CartItems', cart)
                        alertPop()

                    }}
                    add={() => {
                        // const index = selected.weightRange.map(item=>item.size).indexOf(size)
                        let index = 0
                        selected.weightRange.forEach((item, ind) => {
                            if (size == item.size) {
                                index = ind
                            }

                        });

                        console.log(selected.weightRange[3], index, selected.weightRange.length)
                        {
                            if (index < selected.weightRange.length - 1) {
                                    setSize(selected.weightRange[index + 1].size)
                                    setPrice(selected.weightRange[index + 1].price)
                                
                            } else {
                                    setSize(selected.weightRange[selected.weightRange.length - 1].size)
                                    setPrice(selected.weightRange[selected.weightRange.length - 1].price)
                                
                            }
                        }
                    }}
                    remove={() => {
                        // const index = selected.weightRange.map(item=>item.size).indexOf(size)
                        let index = 0
                        selected.weightRange.forEach((item, ind) => {
                            if (size == item.size) {
                                index = ind
                            }

                        });

                        console.log(selected.weightRange[3], index, selected.weightRange.length)
                        {
                            if(index > 0){
                                
                                    setSize(selected.weightRange[index - 1].size)
                                    setPrice(selected.weightRange[index - 1].price)
                                 }else{
                                    setSize(selected.weightRange[0].size)
                                    setPrice(selected.weightRange[0].price)
                                }
                        }
                    }}
                    size={size ? size : selected.weightRange[0].size} closePop={closePop} alertPop={alertPop} />
            }

            {alertBox && <AlertBox
                closePop={closePop}
                options={{ main: 'Item Added. Continue shoping or go to cart', left: 'Continue', right: 'Cart' }}
                navTo={navTo}

            />}
        </SafeAreaView>
    )
}

export default Station