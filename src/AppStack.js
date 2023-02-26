import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStyles from "./AppStyles";

import Home from "./components/Home";

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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={noHeader} />
    </Stack.Navigator>
  );
};

export default AppStack;
