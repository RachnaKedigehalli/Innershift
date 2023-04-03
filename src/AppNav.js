import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/auth/AuthContext";
import AuthStack from "./components/auth/AuthStack";
import BottomTabNavigator from "./components/BottomTabNavigator";
import Mood from "./screens/Mood";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [isMoodSet, setIsMoodSet] = useState(false);
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

  return (
    <NavigationContainer>
      {/* <GestureHandlerRootView> */}
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
