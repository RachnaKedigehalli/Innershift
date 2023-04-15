import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./StartPage";
import Register from "./Register";
import Login from "./Login";
import AppStyles from "../../AppStyles";
import LoginPassword from "./LoginPassword";
import TandC from "./TandC";
import SetPassword from "./SetPassword";
import RegisterName from "./RegisterName";
import VerifyEmail from "./VerifyEmail";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
    <Stack.Navigator initialRouteName="StartPage">
      <Stack.Screen name="StartPage" component={StartPage} options={noHeader} />
      <Stack.Screen name="Register" component={Register} options={noHeader} />
      <Stack.Screen name="TandC" component={TandC} options={noHeader} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={noHeader}
      />
      <Stack.Screen
        name="RegisterName"
        component={RegisterName}
        options={noHeader}
      />
      <Stack.Screen name="Login" component={Login} options={noHeader} />
      <Stack.Screen
        name="LoginPassword"
        component={LoginPassword}
        options={noHeader}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={noHeader}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
