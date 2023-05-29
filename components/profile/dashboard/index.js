import { View, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, DashBoardPlate, HeaderBar } from '../../globals/utils'
import { gasWin } from '../../globals/images'
import { LineChart } from 'react-native-chart-kit'

const Dashboard = ({navigation}) => {
    const dummyList = [{ gasName: 'Total', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }, { gasName: 'Kgas', gasImage: gasWin }]

    return (
        <SafeAreaView style={[{
            // padding:20
        }]}>
            <View>

                <HeaderBar
                    source={gasWin}
                    text={'Dashboard'}
                    custom={{
                        left: '350%'
                    }}
                />
            </View>
            <View style={{
                padding: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
                , alignItems: 'center',
                columnGap: 20,
                marginTop: '-5%'
            }}>
                <DashBoardPlate onClick={()=>{
                    navigation.navigate('ListPlate',{title:'Orders', gasList:dummyList,accList:dummyList})
                }} title={'Orders'} dig={'10'} bcolor='#006600' />
                <DashBoardPlate onClick={()=>{
                    navigation.navigate('ListPlate',{title:'Confirmed', gasList:dummyList,accList:dummyList})
                }} title={'Confirmed'} dig={'17'} bcolor={'#800000'} />
                <DashBoardPlate onClick={()=>{
                    navigation.navigate('ListPlate',{title:'Canceled', gasList:dummyList,accList:dummyList})
                }} title={'Canceled'} dig={'1'} bcolor={'#ff4dd2'} />
                <DashBoardPlate onClick={()=>{
                    navigation.navigate('ListPlate',{title:'Waiting', gasList:dummyList,accList:dummyList})
                }} title={'Waiting'} dig={'6'} bcolor={'#000099'}/>
            </View>
            <Text style={{
                paddingLeft: '10%'
            }}>Weekly Stats</Text>
            <Container
                custom={{
                    height: '44%'
                    , marginTop: 1,
                    borderRadius: 15,
                    justifyContent: 'center'
                    , alignItems: 'center'
                }}
                RenderItem={() => {
                    const data = [{ value: 90 }, { value: 20 }, { value: 30 }]

                    return (
                        <>
                            {/* <BarChart data={data}/> */}
                            <LineChart
                                data={{
                                    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
                                    datasets: [
                                        {
                                            data: [40, 15, 20, 200, 80, 43],
                                            strokeWidth: 2,
                                            color: (opacity = 1) => `rgba(0, 0, 153, ${opacity})`,

                                        },
                                        {
                                            data: [0, 10, 30, 100, 80, 40],
                                            strokeWidth: 2,
                                            color: (opacity = 1) => `rgba(128, 0, 0, ${opacity})`,
                                        },
                                        {
                                            data: [30, 25, 10, 0, 10, 0],
                                            strokeWidth: 2,
                                            color: (opacity = 1) => `rgba(225, 24, 255, ${opacity})`,
                                        },
                                        {
                                            data: [10, 30, 20, 10, 0, 0],
                                            strokeWidth: 2,
                                            color: (opacity = 1) => `rgba(0, 102, 0, ${opacity})`,
                                        }
                                    ],
                                    legend: ['Wait', 'Conf','Canc','Ord']
                                }}
                                width={Dimensions.get("window").width - 40} // from react-native
                                height={250}
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#cce6ff",
                                    backgroundGradientFrom: "#ffe8cc",
                                    backgroundGradientTo: "#cce6ff",
                                    decimalPlaces: 0, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `#800000`,
                                    fillShadowGradientOpacity: 0,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: "2",
                                        strokeWidth: "1",
                                        stroke: "#ffa726"
                                    }
                                    
                                }}

                                bezier
                                style={{
                                    borderRadius: 15,
                                }}
                            />
                        </>
                    )
                }}
            />
        </SafeAreaView >
    )
}

export default Dashboard