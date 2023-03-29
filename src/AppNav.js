import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/auth/AuthContext";
import AuthStack from "./components/auth/AuthStack";
import AppStack from "./AppStack";
import BottomTabNavigator from "./components/BottomTabNavigator";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

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
      {userToken == null ? <AuthStack /> : <AppStack />}
      {/* <AppStack /> */}
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
};

export default AppNav;
