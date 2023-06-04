import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypingIndicator } from "../globals/animation";
import chatStyles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { COLORS } from "../globals/theme";

const Chat = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [indicator, setIndicator] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [socket, setSocket] = useState();
  const [loader, setLoader] = useState(false);
  const [room, setRoom] = useState("");
  const [refresh, setRefresh] = useState(false);
  const {clientID, contID, tier} = route.params
  const [messageList, setMessageList] = useState([])
  // const [room, setRoom] = useState('room1')

  useEffect(() => {
    const newSocket = io("http://192.168.1.109:8000");
    setSocket(newSocket);
    setRoom(`${clientID}_${contID}`);

    newSocket.emit("join_room", room);

    newSocket.emit("ret_message", {
      room: room,
      clientID: clientID,
      contID: contID,
    });

    newSocket.on("ret_message", (data) => {
      setLoader(false);
      console.log(data);
      setMessages(data);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("recieve_message", (newMessage) => {
      setMessages((mess)=>[newMessage,...mess])
      // setMessages(premes);
      });

      socket.on("typing", (data) => {
        if (data) {
          setIndicator(true);
          setTimeout(() => {
            setIndicator(false);
          }, 3000);
        }
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (socket && message.trim() != "") {
      const messageSent = {
        message:message,
        Tier:tier, 
        clientID:clientID,
        contID:contID,
        room:room,
        _id:'1234'
      }
      socket.emit("send_message", messageSent);
      
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", "typing");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={chatStyles.avatorBox}>
          <View style={chatStyles.avator}></View>
          <Text style={chatStyles.avatorName}>name</Text>
        </View>
        <View>
          <View style={{ height: "80%", padding: "5%" }}>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "grey",
                fontStyle: "italic",
              }}
            >
              Your chats are end to end encrypted
            </Text>
            <FlatList
              style={{
                minHeight: "119%",
              }}
              contentContainerStyle={{
                paddingTop: "2%",
              }}
              data={messages}
              ListEmptyComponent={() => {
                return <Text></Text>;
              }}
              extraData={refresh}
              keyExtractor={(item, index) => index.toString()}
              inverted
              renderItem={(inItem) => {
                const item = inItem.item;

                return (
                  <>
                    {item.Tier == "client" ? (
                      <Text style={chatStyles.sentText}>{item.message}</Text>
                    ) : (
                      <Text style={chatStyles.recText}>{item.message}</Text>
                    )}
                  </>
                );
              }}
            />
            {loader && (
              <ActivityIndicator
                style={{ marginTop: "5%" }}
                color={COLORS.primary}
              />
            )}
          </View>
        </View>
        <View style={chatStyles.typeBox}>
          <View style={{ marginLeft: "10%" }}>
            {indicator && <TypingIndicator />}
          </View>
          <View style={chatStyles.innerBox}>
            <TextInput
              onChangeText={(e) => {
                handleTyping();
                setMessage(e);
              }}
              style={chatStyles.input}
              placeholder="enter message"
              value={message}
            />
            <TouchableOpacity
              onPress={() => {
                handleSendMessage();
              }}
              style={chatStyles.sendButton}
            >
              <Ionicons name="send-outline" color="brown" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
