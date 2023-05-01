import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/auth/AuthContext";
import AuthStack from "./components/auth/AuthStack";
import BottomTabNavigator from "./components/BottomTabNavigator";
import Mood from "./screens/Mood";
import AppStyles from "./AppStyles";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { create } from "apisauce";
import axios from "axios";
import { BASE_APP_URL } from "../config";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

// const apiClient = create({
//   baseURL: "http://localhost:9999/noti", // Use your local network IP
// });
// const register = (pushToken) => {
//   console.log("apiClient before: ", apiClient);
//   apiClient.post("/expoPushTokens", { token: pushToken });
//   console.log("apiClient after: ", apiClient);
// };

const AppNav = () => {
  // Notification--------------------------------------------------
  // const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token)
    // );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Notification--------------------------------------------------

  const { isLoading, userToken, user } = useContext(AuthContext);
  const [isMoodSet, setIsMoodSet] = useState(false);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    axios
      .post(
        `${BASE_APP_URL}/isMoodSet`,
        {
          patientId: user.id,
        },
        config
      )
      .then((res) => {
        console.log("isMoodsetAPi", res.data);
        setIsMoodSet(res.data);
      })
      .catch(console.log);
  }, []);
  if (isLoading) {
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>;
  }

  // console.log("isMoodset in AppNav ", isMoodSet);

  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}
      <StatusBar
        backgroundColor={AppStyles.colour.white}
        barStyle="light-content"
      />
      {userToken == null ? (
        <AuthStack />
      ) : isMoodSet == false ? (
        <Mood setIsMoodSet={setIsMoodSet} />
      ) : (
        <BottomTabNavigator />
      )}
      {/* <AppStack /> */}
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
};

export default AppNav;
