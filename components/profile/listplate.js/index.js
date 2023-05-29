import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AlertBox, CategBar, Deals, HeaderBar } from '../../globals/utils'
import { gasLift, gasWin } from '../../globals/images'
import { useState } from 'react'

const ListPlate = ({navigation,route}) => {
    const {title,gasList,accList}= route.params
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]
    const [alertBox, setAlertBox] = useState(false)

    return (
        <SafeAreaView>
            <HeaderBar text={title} source={gasLift} custom={{ left: '350%' }} />

            <CategBar itemList={dummyList} handleCat={() => {
                alert('handle')
            }} />
            <View
                style={{
                    width: '100%',
                    // , borderWidth: 1,
                    padding: 20,
                    height:'75%'
                }}
            >
                <Text style={{
                    borderBottomWidth: 1
                }}>
                    Gass Deals

                </Text>
                {/* <ScrollView> */}
                <Deals
                    custom={{
                        height: '40%'
                    }}
                    onClick={() => {
                        if(title =='Orders'){
                            navigation.navigate('DConfirm',{currPage:'Dashboard', chatPage:'DChat', nextPage:'DCallChat'})
                        }else if(title =='Confirmed' || title=='Waiting'){
                            setAlertBox(true)
                        }else if(title =='Canceled'){
                            alert('You canceled this order')
                        }
                    }} dealData={gasList} />
                {/* </ScrollView> */}

                <Text style={{
                    borderBottomWidth: 1,
                    marginTop: 20
                }}>
                    Gass Accessories

                </Text>
                <Deals
                    custom={{
                        height: '35%'
                    }}
                    dealData={gasList}
                    onClick={() => {

                    }}
                />

            </View>
            {alertBox && <AlertBox navTo={()=>{
                alert('remove here')
                setAlertBox(false)
            }} options={{main:'Is this delivered?',left:'No',right:'Yes'}} closePop={()=>{
                setAlertBox(false)
            }}/>}
        </SafeAreaView>
    )
}

export default ListPlate