import { View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Container, DashBoardPlate, HeaderBar } from "../../globals/utils";
import { gasWin } from "../../globals/images";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Dashboard = ({ navigation }) => {
  const [token, setToken] = useState();
  const [test,setTest]= useState(false)
  const [rowOrders,setRowOrders] =useState({
    order:[],
    confirm:[],
    cancel:[],
    waiting:[],
  })

  useEffect(() => {
    (async () => {
        const userToken = await AsyncStorage.getItem("Token");
        setToken(userToken);
        const userDetails = jwtDecode(userToken);
        axios
          .get("http://192.168.1.109:8000/orders_service", {
            headers: { authorization: userToken },
            params: { requester: userDetails,forWho:'contractor' },
          })
          .then((res) => {
              const getRowOrders = res.data
  
              const getOrders =[]
              const getConfirm =[]
              const getWaiting =[]
              const getCancel=[]
              getRowOrders.forEach((item)=>{
                  if(item.orderStatus.level == 'Order'){
                      getOrders.push(item)
                  }if(item.orderStatus.level == 'Confirm'){
                      getConfirm.push(item)
                  }if(item.orderStatus.level == 'Cancel'){
                      getCancel.push(item)
                  }if(item.orderStatus.level == 'Waiting'){
                      getWaiting.push(item)
                  }
              })
              setRowOrders({
                  confirm:getConfirm,
                  cancel:getCancel,
                  order:getOrders,
                  waiting:getWaiting
              })
              console.log('this confrm one is goten', rowOrders.order)
              
          })
          .catch((err,res) => {
              alert(err.message)
              console.log('return error : ', err)
          });
      
    })()
  },[test]);

  const getData = async()=>{
   
  }

  const dummyList = [
    { gasName: "Total", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
    { gasName: "Kgas", gasImage: gasWin },
  ];

  return (
    <SafeAreaView
      style={[
        {
          // padding:20
        },
      ]}
    >
      <View>
        <HeaderBar
          source={gasWin}
          text={"Dashboard"}
          custom={{
            left: "350%",
          }}
        />
      </View>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 20,
          marginTop: "-5%",
        }}
      >
        <DashBoardPlate
          onClick={() => {
            navigation.navigate("ListPlate", {
              title: "Orders",
              gasList: dummyList,
              accList: dummyList,
            });
          }}
          title={"Orders"}
          dig={rowOrders.order.length}
          bcolor="#006600"
        />
        <DashBoardPlate
          onClick={() => {
            navigation.navigate("ListPlate", {
              title: "Confirmed",
              gasList: dummyList,
              accList: dummyList,
            });
          }}
          title={"Confirmed"}
          dig={rowOrders.confirm.length}
          bcolor={"#800000"}
        />
        <DashBoardPlate
          onClick={() => {
            navigation.navigate("ListPlate", {
              title: "Canceled",
              gasList: dummyList,
              accList: dummyList,
            });
          }}
          title={"Canceled"}
          dig={rowOrders.cancel.length}
          bcolor={"#ff4dd2"}
        />
        <DashBoardPlate
          onClick={() => {
            navigation.navigate("ListPlate", {
              title: "Waiting",
              gasList: dummyList,
              accList: dummyList,
            });
          }}
          title={"Waiting"}
          dig={rowOrders.waiting.length}
          bcolor={"#000099"}
        />
      </View>
      <Text
        style={{
          paddingLeft: "10%",
        }}
      >
        Weekly Stats
      </Text>
      <Container
        custom={{
          height: "44%",
          marginTop: 1,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        RenderItem={() => {
          const data = [{ value: 90 }, { value: 20 }, { value: 30 }];

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
                    },
                  ],
                  legend: ["Wait", "Conf", "Canc", "Ord"],
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
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  borderRadius: 15,
                }}
              />
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
