import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useRef, useState, useContext, useEffect } from "react";
import CustomButton from "../components/CustomButton";
// import { ResizeMode } from "expo-av";
// import VideoPlayer from "expo-video-player";
import { WebView } from "react-native-webview";
import { AuthContext } from "./auth/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_APP_URL } from "../../config";

const translate = require("google-translate-api-x");

const MediaModule = ({
  moduleAssignmentId,
  task,
  index,
  totalTasks,
  setIndex,
  navigation,
  startTime,
  response,
  setResponse,
}) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDesp, setTaskDesp] = useState(task.description);
  translateText(task.title, setTaskTitle);
  translateText(task.description, setTaskDesp);

  const submitModule = async (response, startTime) => {
    let token = await AsyncStorage.getItem("userToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const current = new Date();
    const duration = current.getTime() - startTime.getTime();
    const bodyParameters = {
      moduleAssignedId: moduleAssignmentId,
      response: JSON.stringify({ response: response }),
      start_timestamp: startTime,
      duration: duration.toString(),
      status: true,
    };
    console.log("bodyParameters in media module", bodyParameters);
    await axios
      .post(`${BASE_APP_URL}/sendModuleResponse`, bodyParameters, config)
      .then((res) => {
        navigation.goBack();
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{taskTitle}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{taskDesp}</Text>
      </View>
      <View style={styles.mediaContainer}>
        {/* <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: task.content,
            },
            ref: refVideo,
          }}
          fullscreen={{
            enterFullscreen: () => {
              setInFullsreen(!inFullscreen);
              refVideo.current.setStatusAsync({
                shouldPlay: true,
              });
            },
            exitFullscreen: () => {
              setInFullsreen(!inFullscreen);
              refVideo.current.setStatusAsync({
                shouldPlay: false,
              });
            },
            inFullscreen,
          }}
          style={{ height: 160 }}
        /> */}
        <View style={{ height: 200 }}>
          {task.content ? (
            <WebView
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                // uri: task.content,
                html: `<iframe width="100%" height="100%" src="${task.content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.continueButton}>
        <CustomButton
          title={index + 1 == totalTasks ? "Finish" : "Proceed"}
          accessibilityLabel={"Proceed"}
          // disabled={response == ""}
          onPress={() => {
            if (index < totalTasks - 1) {
              setIndex(index + 1);
            } else {
              submitModule(response, startTime);
            }
          }}
        />
      </View>
    </View>
  );
};

export default MediaModule;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get("window").width - 50,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold",
    color: AppStyles.colour.textGreen,
    alignSelf: "flex-start",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: AppStyles.colour.darkGrey,
  },

  mediaContainer: {
    marginTop: 10,
  },

  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
