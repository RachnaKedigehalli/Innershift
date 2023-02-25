import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./components/StartPage";
import Register from "./components/Register";
import Login from "./components/Login";

const Stack = createNativeStackNavigator();

const NavStack = () => {
  return (
    <Stack.Navigator initialRouteName="StartPage">
      <Stack.Screen
        name="StartPage"
        component={StartPage}
        options={{ title: "Start Page" }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default NavStack;
