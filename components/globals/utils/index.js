import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  TextInput,
  Touchable,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import utilStyles from "./utilStyles";
import { fillGas, gasLift, orders } from "../images";
import { COLORS } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { gasWin } from "../images";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MapView, { Marker } from "react-native-maps";
import { EmptyBoxLoader } from "../animation";
import WS from "react-native-websocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";

class GetCateg {
  list = [];
  variables = {};
  constructor(variables) {
    this.variables = variables;
  }
  get listGetter() {
    return this.list;
  }
  async listSetter() {
    let token = "";
    try {
      token = await AsyncStorage.getItem("Token");
    } catch (err) {
      console.log(err);
    }
    axios
      .get(`${this.variables.HOST_URL}front_end_service/categories`, {
        headers: { authorization: token },
      })
      .then(async (res) => {
        this.list = res.data.data;
        console.log("inside ", this.list);
        return this.list;
      })
      .catch((err) => {
        alert("Sorry an error occured");
      });
  }
}
const LongButtonDark = ({ text, butStyle, textStyle, submit }) => {
  return (
    <TouchableOpacity
      style={[utilStyles.longButDark, butStyle]}
      onPress={submit}
    >
      <Text style={[utilStyles.butLightText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
const LongButtonLight = ({ text, textStyle, butStyle, submit }) => {
  return (
    <TouchableOpacity
      style={[utilStyles.longButLight, butStyle]}
      onPress={submit}
    >
      <Text style={[utilStyles.butDarkText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
const variables = {
  HOST_URL: "http://192.168.1.109:8342/",
};
const Banner = ({ avator, custom }) => {
  return (
    <View
      style={[
        {
          // width:'100%',
          width: 270,
          paddingTop: 50,
        },
        custom,
      ]}
    >
      <View
        style={{
          // flex:1,
          resizeMode: "cover",
          justifyContent: "center",
          height: 210,
          width: 210,
          // borderRadius:100,
          overflow: "hidden",
          // elevation:20,
          marginLeft: "13%",
        }}
      >
        <ImageBackground
          source={avator}
          resizeMode="cover"
          style={{
            flex: 1,
          }}
        />
      </View>
      <View
        style={{
          height: 50,
          backgroundColor: "white",
          marginTop: -40,
          borderTopWidth: 3,
          borderColor: COLORS.primary,
        }}
      ></View>
    </View>
  );
};
const Back = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        left: "10%",
        top: "10%",
      }}
    >
      <TouchableOpacity
        style={{
          // borderWidth:1,
          borderRadius: 100,
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          elevation: 2,
        }}
        onPress={navigation.goBack}
      >
        <Text>
          <Ionicons name="chevron-back-outline" size={28} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const ErrorBox = ({ text }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "80%",
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
const HeaderBar = ({ text, source, custom }) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "row-reverse",
        // justifyContent:'center',
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={source}
        style={{
          height: 50,
          width: 50,
          borderWidth: 1,
          borderRadius: 100,
          alignSelf: "flex-end",
          overflow: "hidden",
        }}
      ></ImageBackground>
      <TouchableOpacity
        style={[
          {
            alignSelf: "flex-end",
            left: "20%",
          },
        ]}
      >
        <Ionicons name="notifications-outline" size={20} />
      </TouchableOpacity>
      <Text
        style={[
          {
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 18,
            left: "400%",
            top: 15,
          },
          custom,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
const SearchBar = ({ searchLogic, custom, getText }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          // alignItems:'center',
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 20,
          width: "80%",
          alignSelf: "center",
        },
        custom,
      ]}
    >
      <TextInput
        placeholder="type here"
        onChangeText={(e)=>{
          getText(e)
        }}
        style={{
          // borderWidth:1,
          paddingLeft: 20,
          width: "74%",
        }}
      />
      <TouchableOpacity
        onPress={searchLogic}
        style={{
          backgroundColor: COLORS.primary,
          width: "25%",
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          borderBottomLeftRadius: 0,
        }}
      >
        <Ionicons name="search" size={20} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};
const dataList = ["me", "up", "you", "and"];
const CategBar = ({  handleCat }) => {
  const BarClass = new GetCateg(variables);
  const[itemList, setListing]=useState('here me and me')
  let list='one';
  useEffect(()=>{(async () => {
    let token = "";
    try {
      token = await AsyncStorage.getItem("Token");
    } catch (err) {
      console.log(err);
    }
    axios
      .get(`${variables.HOST_URL}front_end_service/categories`, {
        headers: { authorization: token },
      })
      .then(async (res) => {
        list = res.data.data;
        setListing(list)
        console.log("inside ", list);
      })
      .catch((err) => {
        alert("Sorry an error occured");
      });
  })()},[])
  return (
    <FlatList
      data={itemList}
      horizontal
      style={{
        borderBottomWidth: 2,
        paddingLeft: 30,
        paddingLRight: 30,
        alignSelf: "center",
        width: "80%",
        marginTop: 30,
        // height:50,
        height: 50,
        borderColor: COLORS.primary,
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              justifyContent: "center",
              width: 225,
            }}
          >
            <ActivityIndicator size={30} color={COLORS.primary} />
          </View>
        );
      }}
      renderItem={(item) => {
        item = item.item;
        return (
          <TouchableOpacity
            onPress={()=>{
              handleCat(item.gasName)
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 30,
            }}
          >
            <ImageBackground
              source={{ uri: `${item.gasImage}` }}
              style={{
                height: 40,
                width: 40,
                background: "red",
              }}
            ></ImageBackground>
            <Text
              style={{
                fontSize: 10,
                paddingBottom: 10,
              }}
            >
              {item.gasName}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const Container = ({ custom, RenderItem }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "white",
          marginTop: "5%",
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 30,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          overflow: "hidden",
          padding: 15,
        },
        custom,
      ]}
    >
      <RenderItem />
    </View>
  );
};
const ListGas = ({ listGas, custom, onClick, loader }) => {
  return (
    <Container
      custom={custom}
      RenderItem={() => {
        return (
          <View style={{}}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 10,
                marginTop: -5,
                marginLeft: 15,
              }}
            >
              Closest Around you
            </Text>
            <FlatList
              data={listGas}
              ListEmptyComponent={() => {
                return (
                  <>
                  {loader ? (
                    <ActivityIndicator
                      style={{
                        marginTop: 30,
                      }}
                      size={30}
                      color={COLORS.primary}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "25%",
                      }}
                    >
                      <EmptyBoxLoader size={"80%"} />
                      <Text
                        style={{
                          marginTop: "-10%",
                        }}
                      >
                        This place is empty
                      </Text>
                    </View>
                  )}
                </>
                )
              }}
              style={{
                flexDirection: "column",
                // paddingBottom:50
              }}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    alert("hellow wolrd");
                  }}
                />
              }
              horizontal={false}
              contentContainerStyle={{
                paddingHorizontal: 5,
                paddingVertical: 5,
                paddingBottom: 50,
              }}
              numColumns={3}
              renderItem={(inItem) => {
                let item = inItem.item;
                console.log("item", item.stationImage);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onClick(item);
                    }}
                    style={{
                      width: "30%",
                      borderRadius: 10,
                      overflow: "hidden",
                      marginLeft: "3%",
                      marginBottom: "5%",
                      elevation: 5,
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.stationImage }}
                      style={{
                        height: 100,
                        backgroundColor: "grey",
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.primary,
                        padding: 10,
                        paddingBottom: 5,
                        minHeight: 70,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 10,
                        }}
                      >
                        {item.stationName.toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 8,
                          marginTop: -3,
                        }}
                      >
                        {item.town}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Ionicons
                          name="star"
                          style={{
                            marginTop: 5,
                          }}
                          color={"white"}
                        />
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            marginTop: 5,
                            marginLeft: 5,
                          }}
                        >
                          {item.stationRating}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      }}
    />
  );
};
const ProfileCircle = ({ custom, source }) => {
  return (
    <ImageBackground
      style={[
        {
          borderWidth: 1,
          backgroundColor: "grey",
          borderRadius: 100,
          overflow: "hidden",
          alignSelf: "center",
          borderColor: COLORS.primary,
        },
        custom,
      ]}
      source={source}
    />
  );
};
const IconButton = ({ onClick, icon, size, custom }) => {
  return (
    <TouchableOpacity
      style={[
        {
          background: "red",
          padding: 5,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: COLORS.primary,
          height: size.box,
          width: size.box,
          justifyContent: "center",
          alignItems: "center",
        },
        custom,
      ]}
      onPress={onClick}
    >
      <Ionicons name={icon} size={size.icon} />
    </TouchableOpacity>
  );
};
const MenuContainer = ({ RenderItem, custom }) => {
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: Colors.primary,
          padding: 5,
          borderRadius: 15,
        },
        custom,
      ]}
    >
      <RenderItem />
    </View>
  );
};
const GasPlate = ({
  custom,
  optiontier,
  loader,
  onClick,
  dataList,
  params,
  config,
}) => {
  return (
    <Container
      custom={custom}
      RenderItem={() => {
        return (
          <View style={{}}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 10,
                marginTop: -5,
                marginLeft: 15,
              }}
            >
              Closest Around you
            </Text>
            <FlatList
              ListEmptyComponent={() => {
                return (
                  <>
                    {loader ? (
                      <ActivityIndicator
                        style={{
                          marginTop: 30,
                        }}
                        size={30}
                        color={COLORS.primary}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "25%",
                        }}
                      >
                        <EmptyBoxLoader size={"80%"} />
                        <Text
                          style={{
                            marginTop: "-10%",
                          }}
                        >
                          This place is empty
                        </Text>
                      </View>
                    )}
                  </>
                );
              }}
              data={dataList}
              style={
                {
                  // flexDirection:'row'
                }
              }
              // horizontal={false}
              contentContainerStyle={{
                paddingHorizontal: 5,
                paddingVertical: 5,
              }}
              // numColumns={3}
              renderItem={(inItem) => {
                let item = inItem.item;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      optiontier === "Done"
                        ? alert("This item is done")
                        : config &&
                          config.navigation.navigate(config.to, {
                            currPage: config.params.currPage,
                            chatPage: config.params.chatPage,
                            nextPage: config.params.chatPage,
                            nextPage: config.params.nextPage,
                            token: config.params.token,
                            cartItems: item,
                          });
                      onClick && onClick(item);
                    }}
                    style={{
                      width: "90%",
                      borderRadius: 10,
                      overflow: "hidden",
                      marginLeft: "3%",
                      marginBottom: "5%",
                      elevation: 5,
                      flexDirection: "row",
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item.image }}
                      style={{
                        width: 100,
                        height: "100%",
                        backgroundColor: "grey",
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: COLORS.primary,
                        padding: 10,
                        paddingRight: 50,
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 11,
                        }}
                      >
                        {item.service.toUpperCase()}
                      </Text>

                      <Text
                        style={{
                          color: "white",
                          fontSize: 11,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 9,
                          marginTop: 3,
                        }}
                      >
                        {item.town}
                      </Text>

                      <Text
                        style={{
                          color: "white",
                          fontSize: 9,
                          marginTop: -3,
                        }}
                      >
                        Price: {item.price}/=
                      </Text>

                      <Text
                        style={{
                          color: "white",
                          fontSize: 9,
                          marginTop: -3,
                        }}
                      >
                        Weight : {item.size} kg
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          bottom: 0,
                        }}
                      >
                        <Ionicons
                          name="star"
                          style={{
                            marginTop: 5,
                          }}
                          color={"white"}
                        />
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            marginTop: 5,
                            marginLeft: 5,
                          }}
                        >
                          {item.stationRating}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        );
      }}
    />
  );
};

const Maps = ({
  withRef,
  tracer,
  markerList,
  withMarker,
  initialRegion,
  currRegion,
  custom,
}) => {
  const testList = [10, 20, 30, 40];
  return (
    <View style={[{ height: "50%" }, custom]}>
      <MapView
        ref={withRef}
        style={{ height: "100%" }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {currRegion && (
          <>
            <Marker
              coordinate={{
                latitude: currRegion.latitude,
                longitude: currRegion.longitude,
              }}
              title="You"
            ></Marker>
            {/* <FlatList
            data={markerList}
            renderItem={(inItem)=>{
              let item = inItem.item
              return (
                <Marker
                  coordinate={{
                    // latitude: currRegion.latitude,
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.long),

                    // longitude: currRegion.longitude,
                  }}
                  title="Supplier"
                ></Marker>
              )}}
            /> */}
            {markerList &&
              markerList.map((item, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      // latitude: currRegion.latitude,
                      latitude: parseFloat(item.lat),
                      longitude: parseFloat(item.long),

                      // longitude: currRegion.longitude,
                    }}
                    title="Supplier"
                  ></Marker>
                );
              })}
          </>
        )}
      </MapView>
    </View>
  );
};
const Deals = ({ custom, onClick, dealData ,loader}) => {
  return (
    <>
      <FlatList
        // scrollEnabled={true}
        style={[
          {
            height: "30%",
          },
          custom,
        ]}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        data={dealData}
        renderItem={(inItem) => {
          const item = inItem.item;
          const sizeList =
            item.weightRange &&
            item.weightRange.map((value) => parseInt(value.size));
          const priceList =
            item.weightRange &&
            item.weightRange.map((value) => parseInt(value.price));

          // const minValue = Math.min(...sizeList)
          const minSize = item.weightRange && Math.min(...sizeList);
          const maxSize = item.weightRange && Math.max(...sizeList);
          const minPrice = item.weightRange
            ? Math.min(...priceList)
            : item.price;
          const maxPrice = item.weightRange
            ? Math.max(...priceList)
            : item.price;
          console.log(item.image);
          const gasImage = gasImage in item ? item.gasImage : item.image;
          const deliveryTime =
            deliveryTime in item ? item.deliveryTime : item.estTime;
          return (
            <TouchableOpacity
              onPress={() => {
                onClick(item);
              }}
              style={{
                padding: 5,
                width: "90%",
                borderRadius: 10,
                borderWidth: 1,
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <ImageBackground
                source={{ uri: `${gasImage}` }}
                style={{
                  height: 60,
                  width: 60,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderRadius: 100,
                }}
              />
              <View
                style={{
                  paddingLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: COLORS.primary,
                    // fontWeight:'bold'
                  }}
                >
                  {item.service}
                </Text>
                {item.weightRange && (
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {minSize == maxSize ? (
                      <Text>{minSize} kg</Text>
                    ) : (
                      <Text>
                        {minSize} - {maxSize} kg
                      </Text>
                    )}
                  </Text>
                )}

                {item.size && <Text>size : {item.size}</Text>}
                <Text
                  style={{
                    fontSize: 10,
                  }}
                >
                  {deliveryTime}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    left: "180%",
                  }}
                >
                  {minPrice == maxPrice ? (
                    <Text>{minPrice} /=</Text>
                  ) : (
                    <Text>
                      {minPrice} - {maxPrice} /=
                    </Text>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return (
            <>
                  {loader ? (
                    <ActivityIndicator
                      style={{
                        marginTop: 30,
                      }}
                      size={30}
                      color={COLORS.primary}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "25%",
                      }}
                    >
                      <EmptyBoxLoader size={"80%"} />
                      <Text
                        style={{
                          marginTop: "-10%",
                        }}
                      >
                        This place is empty
                      </Text>
                    </View>
                  )}
                </>
          );
        }}
      />
    </>
  );
};

const Options = ({
  size,
  price,
  clickable,
  closePop,
  btnClick,
  alertPop,
  add,
  remove,
}) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255, 0.8)",
        position: "absolute",
        height: "105%",
        width: "100%",
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="close"
        size={{ box: 25, icon: 13 }}
        custom={{
          marginBottom: 20,
        }}
        onClick={() => {
          {
            closePop();
          }
        }}
      />

      <MenuContainer
        custom={{}}
        RenderItem={() => {
          return (
            <View
              style={{
                backgroundColor: "white",
                // ,flex:1
                minHeight: 100,
                width: 200,
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: COLORS.primary,
                  }}
                >
                  Weight :{" "}
                </Text>
                {clickable && (
                  <IconButton
                    onClick={remove}
                    icon={"remove-outline"}
                    size={{ box: 20, icon: 13 }}
                    custom={{
                      padding: 1,
                      marginLeft: 10,
                    }}
                  />
                )}
                <Text>{clickable}</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginLeft: 7,
                  }}
                >
                  {size}
                </Text>
                {clickable && (
                  <IconButton
                    onClick={add}
                    icon={"add-outline"}
                    size={{ box: 20, icon: 13 }}
                    custom={{
                      marginLeft: 7,
                      padding: 1,
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.primary,
                }}
              >
                Price: {price} /=
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: "20%",
                }}
                onPress={() => {
                  btnClick();
                }}
              >
                <MenuContainer
                  custom={{
                    backgroundColor: COLORS.primary,
                  }}
                  RenderItem={() => {
                    return (
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Add To Cart
                      </Text>
                    );
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
const AlertBox = ({ closePop, action, navTo, options }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255, 0.8)",
        position: "absolute",
        height: "105%",
        width: "100%",
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MenuContainer
        custom={{}}
        RenderItem={() => {
          return (
            <View
              style={{
                backgroundColor: "white",
                // ,flex:1
                // , height: 100,
                width: 200,
                padding: 20,
              }}
            >
              <Text>{options.main}</Text>
              <View
                style={{
                  marginTop: "20%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    closePop();
                  }}
                  style={{
                    width: "60%",
                  }}
                >
                  <MenuContainer
                    custom={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 7,
                    }}
                    RenderItem={() => {
                      return (
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {options.left}
                        </Text>
                      );
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={navTo}
                  style={{
                    width: "60%",
                    marginLeft: 10,
                  }}
                >
                  <MenuContainer
                    custom={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 7,
                    }}
                    RenderItem={() => {
                      return (
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {options.right}
                        </Text>
                      );
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const DashBoardPlate = ({ onClick, title, dig, bcolor }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderWidth: 1,
        width: "45%",
        borderRadius: 20,
        // marginRight:'5%'
        marginTop: "8%",
        backgroundColor: bcolor,
      }}
      onPress={onClick}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          fontSize: 50,
          color: "white",
        }}
      >
        {dig}
      </Text>
    </TouchableOpacity>
  );
};

const socketConn = new WS("");

export {
  socketConn,
  IconButton,
  DashBoardPlate,
  AlertBox,
  Maps,
  Options,
  MenuContainer,
  GasPlate,
  LongButtonDark,
  Container,
  ProfileCircle,
  ListGas,
  LongButtonLight,
  HeaderBar,
  Banner,
  Back,
  SearchBar,
  ErrorBox,
  CategBar,
  Deals,
  variables,
};
