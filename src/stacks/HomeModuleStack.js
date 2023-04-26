import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStyles from "../AppStyles";
import { useState } from "react";
import Home from "../screens/Home";
import MediaModule from "../components/MediaModule";
import ModuleProgress from "../screens/ModuleProgress";
import TopBar from "../components/TopBar";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();
const HomeModuleStack = () => {
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
  const headerWithoutBack = {
    header: ({ navigation, route, options, back }) => {
      return <TopBar showBack={false} navigation={navigation} />;
    },
  };
  const headerWithBack = {
    header: ({ navigation, route, options, back }) => {
      return <TopBar showBack={true} navigation={navigation} />;
    },
  };

  return (
    <Stack.Navigator initialRouteName={"Home"} backBehavior={"history"}>
      <Stack.Screen name="Home" component={Home} options={headerWithoutBack} />
      <Stack.Screen
        name="ModuleProgress"
        component={ModuleProgress}
        options={noHeader}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={discreteHeader}
      />
    </Stack.Navigator>
  );
};

export default HomeModuleStack;

// const styles = StyleSheet.create({});
