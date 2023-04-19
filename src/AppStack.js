import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStyles from "./AppStyles";
import Home from "./screens/Home";
import { useState } from "react";

import BottomTabNavigator from "./components/BottomTabNavigator";
import Chat from "./screens/Chat";
import DoctorDetails from "./screens/DoctorDetails";
import HomeModuleStack from "./stacks/HomeModuleStack";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const discreteHeader = {
    headerShown: true,
    title: "",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: AppStyles.colour.white,
    },
    headerTintColor: AppStyles.colour.darkGreen,
  };
  const noHeader = { headerShown: false };

  return (
    <>
      <Stack.Navigator
        // initialRouteName={isMoodSet ? "BottomTabNavigator" : "Mood"}
        initialRouteName={"BottomTabNavigator"}
      >
        <Stack.Screen
          name="Home"
          component={HomeModuleStack}
          options={noHeader}
        />
        {/* <Stack.Screen name="Mood" component={Mood} options={noHeader} /> */}
        <Stack.Screen name="Chat" component={Chat} options={noHeader} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={noHeader}
        />
      </Stack.Navigator>
      {/* <BottomTabNavigator /> */}
    </>
  );
};

export default AppStack;
