import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppStyles from "../AppStyles";
import Avatar from "../components/Avatar";
import Message from "../components/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";
import { useNavigation } from "@react-navigation/native";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { TextEncoder } from "text-encoding";
import { set } from "react-native-reanimated";
import { useFirstRender } from "../util/useFirstRender";

const Chat = ({ navigation }) => {
  const [messagePlaceHolder, setMessagePlaceHolder] = useState("Type here...");
  const [currentMessage, setCurrentMessage] = useState("");
  const [cons, setCons] = useState(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [messageList, setMessageList] = useState([]);
  const [stompClient, setStompClient] = useState();
  const firstRender = useFirstRender();
  const sendMessage = async () => {
    let token = await AsyncStorage.getItem("userToken");
    console.log(token);
    var header = {
      "jwt-token": token,
    };
    if (currentMessage?.trim() !== "") {
      const message = {
        consultationId: cons.consultationId,
        content: currentMessage,
        senderId: userDetails.id,
        recipientId: cons.doctor[0],
      };

      await stompClient?.send(
        "/api/v1/app/app/chat",
        header,
        JSON.stringify(message)
      );
      setCurrentMessage("");
    }
  };

  const onMessageReceived = (msg) => {
    console.log("in Received");
    console.log(msg.body);
    console.log("before messageList: ", messageList);
    // var new_messages = messages;
    // console.log("before rnew message: ", new_messages);
    // new_messages.push(JSON.parse(msg.body));
    setMessageList((messages) => {
      return [...messages, JSON.parse(msg.body)];
    });
  };

  const onConnected = async (sc) => {
    let token = await AsyncStorage.getItem("userToken");
    console.log("consultation in onConnected: ", cons);
    console.log("messageList in onConnected: ", messageList);
    console.log("connected");
    var header = {
      "jwt-token": token,
    };

    await sc?.subscribe(
      "/api/v1/app/user/" + cons?.consultationId + "/queue/messages",
      onMessageReceived,
      header
    );
    setIsConnected(true);
  };
  const onError = (e) => {
    console.log("error: ", e);
    // connect();
  };

  const connect = async () => {
    if (!isConnected) {
      let token = await AsyncStorage.getItem("userToken");
      console.log("connect", token);
      console.log("messages in connect: ", messageList);
      var header = {
        "jwt-token": token,
      };
      const sc = Stomp.over(() => {
        const sockJS = new SockJS(`${BASE_APP_URL}/ws`, null);
        return sockJS;
      });

      setStompClient(sc);

      sc.connect(header, () => onConnected(sc), onError);
    }
  };

  const callApi = async () => {
    let consultation = await AsyncStorage.getItem("consultation");
    let user = await AsyncStorage.getItem("userDetails");
    setUserDetails(JSON.parse(user));
    let token = await AsyncStorage.getItem("userToken");

    consultation = await JSON.parse(consultation);
    console.log("consultation", await consultation);

    setCons(consultation);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      patientId: await consultation.patientId,
    };
    await axios
      .post(`${BASE_APP_URL}/getAllMessagesByPId`, bodyParameters, config)
      .then(async (res) => {
        console.log(res.data);
        setMessageList((messages) => {
          return res.data;
        });
        console.log("in callapi messageList:", messageList);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const makeCalls = async () => {
      await callApi();
    };
    makeCalls();
  }, []);
  useEffect(() => {
    const makeCall = async () => {
      if (!firstRender) {
        await connect();
      }
    };
    makeCall();
  }, [cons]);

  // const sendMessage = async () => {
  //   let token = await AsyncStorage.getItem("userToken");
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   const bodyParameters = {
  //     consultationId: cons.consultationId,
  //     content: currentMessage,
  //     senderId: cons.patientId,
  //   };
  //   console.log("sending ", bodyParameters);
  //   await axios
  //     .post(`${BASE_APP_URL}/addMessage`, bodyParameters, config)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((e) => console.log(e));

  //   const mConfig = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   const mBodyParameters = {
  //     patientId: cons.patientId,
  //   };
  //   console.log("params sent ", mBodyParameters);
  //   await axios
  //     .post(`${BASE_APP_URL}/getAllMessagesByPId`, mBodyParameters, mConfig)
  //     .then((res) => {
  //       console.log(res.data);
  //       setMessages(res.data);
  //     })
  //     .catch((e) => console.log(e));
  // };

  return (
    <>
      {/* <View style={styles.container}> */}
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <Pressable onPress={navigation.goBack}>
            <Image
              style={styles.back}
              source={require("../../assets/icons/chevron-left.png")}
            />
          </Pressable>
          <View style={styles.doctorDetails}>
            <Avatar
              imageSrc={require("../../assets/images/dummy/profile1.jpg")}
            ></Avatar>
            <Text style={styles.doctorName}>
              {" "}
              {cons != undefined && cons != null
                ? `Dr. ${cons.doctor[4]} ${cons.doctor[5]}`
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.chatSendContainer}>
        <View style={styles.chat}>
          {messageList != [] ? (
            messageList.map((m, mid) => {
              return (
                <Message
                  content={m.content}
                  sender={m.senderId == userDetails.id ? true : false}
                  timeStamp={m.timeStamp}
                  readReceipt={m.readRecipt}
                  key={mid}
                />
              );
            })
          ) : (
            <></>
          )}
          {/* <Message
            content={"cdscanjkdjnk"}
            sender={true}
            timeStamp={"11/12/2020"}
            readReceipt={true}
          />
          <Message
            content={"cdscanjkdjnk"}
            sender={false}
            timeStamp={"11/12/2020"}
            readReceipt={true}
          /> */}
        </View>
        <View style={styles.sendMessageContainer}>
          <View style={styles.sendMessageInnerContainer}>
            <TextInput
              style={styles.typeMessage}
              onChangeText={setCurrentMessage}
              value={currentMessage}
              placeholder={messagePlaceHolder}
              multiline
              editable
              numberOfLines={1}
              cursorColor={AppStyles.colour.darkGreen}
              // onKeyPress={async ({ nativeEvent }) => {
              //   if (nativeEvent.key == "Enter") {
              //     await sendMessage();
              //     setCurrentMessage("");
              //   }
              // }}
              //   onSubmitEditing={async () => {
              //     // await sendMessage();
              //     // setCurrentMessage("");
              //   }}
            />
            <Pressable
              onPress={() => {
                sendMessage();
              }}
            >
              <Image
                style={styles.sendIcon}
                source={require("../../assets/icons/sendMessage.png")}
              ></Image>
            </Pressable>
          </View>
        </View>
      </View>
      {/* </View> */}
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  topBarContainer: {
    height: 108,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flexDirection: "row",
    alignItems: "flex-end",

    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomEndRadius: 15,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    width: 30,
    height: 30,
  },
  doctorDetails: {
    marginLeft: 23,
    flexDirection: "row",
    alignItems: "center",
  },
  doctorName: {
    marginLeft: 15,
    fontFamily: AppStyles.font.subHeadings,
    fontSize: 20,
    color: AppStyles.colour.darkGreen,
  },
  chatSendContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: AppStyles.colour.chatBg,
    alignItems: "center",
  },
  chat: {
    width: Dimensions.get("window").width - 50,
    // backgroundColor: "black",
  },
  sendMessageContainer: {
    // height: 88,
    backgroundColor: AppStyles.colour.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    width: "100%",
  },
  sendMessageInnerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: AppStyles.colour.grey,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  typeMessage: {
    flex: 1,
    fontSize: 13,
    fontFamily: AppStyles.font.poppinsRegular,
    color: AppStyles.colour.darkGreen,
  },
  sendIcon: {
    width: 28,
    height: 28,
    marginLeft: 20,
  },
});
