import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./components/StartPage";
import Register from "./components/Register";
import Login from "./components/Login";
import AppStyles from "./AppStyles";

const Stack = createNativeStackNavigator();

const NavStack = () => {
  const discreteHeader = {
    headerShown: true,
    title: "",
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: AppStyles.colour.white,
    },
    headerTintColor: AppStyles.colour.darkGreen,
  };
  return (
    <Stack.Navigator initialRouteName="StartPage">
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={discreteHeader}
      />
      <Stack.Screen name="Login" component={Login} options={discreteHeader} />
    </Stack.Navigator>
  );
};

export default NavStack;
