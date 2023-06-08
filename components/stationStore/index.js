import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../globals/theme";
import { RadioButton } from "react-native-elements";
import utilStyles from "../globals/utils/utilStyles";
import { Back, Banner, ErrorBox, IconButton, LongButtonDark } from "../globals/utils";
import { orders } from "../globals/images";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from 'expo-image-picker'

const StationStore = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [token, setToken] = useState();
  const [stationName, setStationName] = useState();
  const [name, setName] = useState();
  const [service, setService] = useState();
  const [weightRange, setWeightRange] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState();
  const [image, setImage] = useState();
  const [object, setObject] = useState();
  const [loader, setLoader] = useState(false);
  const [gasCateg, setGasCateg] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [photo, setPhoto]=useState()
  const [imageView, setImageView]= useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("Token");
      const details = jwtDecode(token);
      setToken(token);
      setUserDetails(details);
      console(userDetails)

      axios
        .get("/", {
          headers: { authorization: token },
          params: { contID: userDetails._id },
        })
        .then((res) => {
          const station = res.data.id;
          setStationName(station);
        })
        .catch((err) => {
          setErrorMessage(
            "something went wrong, kindly check you network or login afresh"
          );
        });

      axios
        .get("http://192.168.43.102:8000/front_end_service/categories", { headers: { authorization: token } })
        .then((res) => {
          setGasCateg(res.data.data.map((item) => item.gasName));
        })
        .catch((err) => {
          setErrorMessage(
            "something went wrong, kindly check you network or login afresh"
          );
        });
      setLoader(false);
    })();
  }, []);

  

  const setStation = () => {
    setLoader(true);
    if ((!name, !service, !weightRange, !deliveryTime, !image)) {
      setErrorMessage(
        "You did not provide all the params, kindly fill in all of them"
      );
      setLoader(false);
    } else {
      const station = {
        name: name,
        gassStationName: stationName,
        service: service,
        weightRange: weightRange,
        deliveryTime: deliveryTime,
        image: image,
        object: object,
      };
      axios
        .post("/", { headers: { authorization: token }, params: station })
        .then((res) => {
          setLoader(false);
          setErrorMessage("Service added successfuly");
        })
        .catch((res) => {
          setLoader(false);
          setErrorMessage(
            "failed to add your service, kindly try again, or login afresh"
          );
        });
    }
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Back navigation={navigation} />

      <View>
        <Banner avator={orders} />
        {loader ? (
          <ActivityIndicator
            color={COLORS.primary}
            style={{
              marginBottom: 10,
              marginTop: 0,
            }}
          />
        ) : (
          <></>
        )}
      </View>

      <View
        style={[
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          },
        ]}
      >
        {errorMessage && <ErrorBox text={errorMessage} />}

        <FlatList
          data={gasCateg}
          horizontal
          renderItem={(inItem) => {
            const item = inItem.item;
            return <></>;
          }}
        />
        <View>{/* <RadioButton/> */}</View>
        <SelectDropdown
        searchPlaceHolder="Gass type"
        placeholder={'Gass type'}
        data={gasCateg}
        buttonStyle={{
            backgroundColor:'transparent'
            ,borderWidth:1,
            borderColor:COLORS.primary,
            borderRadius:10
            ,height:35
            ,marginBottom:10
        }}
        buttonTextStyle={{
            fontSize:15
        }}
        onSelect={(item)=>{
            setName(item)
            console.log(item)
        }}
        
        />
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          onChangeText={(text) => {
            setService(text);
          }}
          style={[utilStyles.inputStyle, {}]}
          placeholder="service offered : e.g gass refill"
        />
        <FlatList
          style={{
            width: "60%",
            padding: 5,
          }}
          data={weightRange}
          renderItem={(inItem) => {
            const item = inItem.item;
            // console.log(inItem);
            return (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 5,
                    flexDirection: "row",
                    marginBottom: 5,
                  }}
                >
                  <Text>
                    size : {item.size} , price : {item.price}
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 20,
                      borderWidth: 1,
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      console.log(weightRange.length);
                      if (weightRange.length > 0) {
                        console.log('first here : ', weightRange)
                        const range = weightRange.filter((paritem)=>paritem !==item)
                        console.log(range)
                        setWeightRange(range);
                        console.log("gone here");
                      }else{
                        console.log('gone hre else')
                      }
                    }}
                  >
                    <Ionicons name="close" size={15} />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setSize(text);
            }}
            style={[utilStyles.inputStyle, { width: "30%" }]}
            placeholder="size"
          />

          <TextInput
            onChangeText={(text) => {
              setPrice(text);
            }}
            style={[utilStyles.inputStyle, { width: "30%", marginLeft: "2%" }]}
            placeholder="price"
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              marginLeft: "2%",
            }}
            onPress={() => {
              if ((!size, !price)) {
              } else {
                const itemRange = {
                  size: size,
                  price: price,
                };
                setWeightRange((item) => [...item, itemRange]);
              }
            }}
          >
            <Ionicons name="add" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={(text) => {
            setDeliveryTime(text);
          }}
          style={[utilStyles.inputStyle, {}]}
          placeholder="Estimated Delivery time"
        />

        <TouchableOpacity
        onPress={()=>{
            setImageView(true)
        }}
          style={[utilStyles.inputStyle, {
            justifyContent:'center'
            ,alignItems:'center'
          }]}
        
        >
            <Text>{photo ? photo :'click to upload image'}</Text>
        </TouchableOpacity>
        <LongButtonDark text={"Create Service"} submit={()=>{
            alert()
        }} />
      </View>
      {imageView &&
      <View style={{
        height:'100%'
        ,width:'100%'
        ,position:'absolute'
        ,backgroundColor:'rgba(255, 245, 157, 0.7)'
        ,zIndex:2,
        alignItems:'center'
        
      }}>
        <IconButton icon='close' size={{icon:20, box:35}} custom={{
            left:'36%'
            ,backgroundColor:'white',
            marginTop:'20%'
        }}
        onClick={()=>{
            setImageView(false)
        }}
        
        />
        <FlatList style={{
            // borderWidth:1,
            height:'85%',
            width:'90%',
            marginTop:20
        }}
        data={[1,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5]}
        ListEmptyComponent={()=>{
            return(
                <Text>no Images to show</Text>
            )
        }}
        // horizontal
        numColumns={3}
        renderItem={(item)=>{
            return(

                <TouchableOpacity style={{
                    backgroundColor:'red'
                    ,height:100
                    ,width:100
                    ,borderRadius:15,
                    marginRight:10,
                    marginBottom:10,
                    overflow:'hidden'
                }}
                onPress={()=>{
                    setPhoto(item.item)
                    setImageView(false)
                }}
                >
                <ImageBackground
    
                source={orders}
                style={{
                    height:'100%',
                    width:'100%'
                }}
                />
                </TouchableOpacity>
    
            )            
        }}
        />
      </View>}
    </SafeAreaView>
  );
};

export default StationStore;
