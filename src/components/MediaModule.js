import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
// import { ResizeMode } from "expo-av";
// import VideoPlayer from "expo-video-player";
import { WebView } from "react-native-webview";

const MediaModule = ({ task, index, totalTasks, setIndex, navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{task.title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{task.description}</Text>
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
                html: `<body><iframe width="100%" height="100%" src="${task.content}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></body>`,
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
              navigation.goBack();
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
