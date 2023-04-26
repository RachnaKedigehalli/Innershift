import { View, Text, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import { AuthContext } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const translate = require("google-translate-api-x");

const StartPage = ({ navigation }) => {
  const { appLanguage } = useContext(AuthContext);

  const translateText = (originalText, setText) => {
    useEffect(() => {
      translate(originalText, {
        from: "en",
        to: appLanguage,
      }).then((res) => setText(res.text));
    }, []);
  };

  const originalTexts = [
    "Welcome, let’s get started!",
    "Register",
    "or",
    "Login",
  ];
  const [welcomeText, setWelcomeText] = useState(originalTexts[0]);
  const [registerText, setRegisterText] = useState(originalTexts[1]);
  const [orText, setOrText] = useState(originalTexts[2]);
  const [loginText, setLoginText] = useState(originalTexts[3]);

  translateText(originalTexts[0], setWelcomeText);
  translateText(originalTexts[1], setRegisterText);
  translateText(originalTexts[2], setOrText);
  translateText(originalTexts[3], setLoginText);

  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      AsyncStorage.setItem("expoPushToken", token);
    });
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        // paddingTop: 226,
        justifyContent: "center",
        backgroundColor: AppStyles.colour.white,
        height: "100%",
        // gap: 57,
      }}
    >
      <Image source={require("assets/images/logo.png")} />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginTop: 57,
          // gap: 9
        }}
      >
        <Text
          style={{
            fontSize: 27,
            fontWeight: "600",
            color: AppStyles.colour.textGreen,
            width: 300,
            textAlign: "center",
            fontFamily: AppStyles.font.subHeadings,
          }}
        >
          {welcomeText}
        </Text>

        <View
          style={{
            marginTop: 42,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: 135,
          }}
        >
          <CustomButton
            title={registerText}
            accessibilityLabel={registerText}
            onPress={() => {
              navigation.navigate("TandC", { screen: "TandC" });
            }}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: AppStyles.colour.darkGrey,
              fontFamily: AppStyles.font.subHeadings,
            }}
          >
            {orText}
          </Text>
          <CustomButton
            title={loginText}
            accessibilityLabel={loginText}
            onPress={() => {
              navigation.navigate("Login", { screen: "Login" });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StartPage;
