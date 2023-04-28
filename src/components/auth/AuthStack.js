import * as React from "react";
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
import AdditionalInfo from "./AdditionalInfo";
import Referral from "./Referral";
import BaseLineCheckpoint from "./BaseLineCheckpoint";
import SelectLanguage from "./../../screens/SelectLanguage";
import ForgotPasswordOtp from "./ForgotPasswordOtp";
import ForgotPassword from "./ForgotPassword";

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
    <Stack.Navigator initialRouteName="SelectLanguage">
      <Stack.Screen name="StartPage" component={StartPage} options={noHeader} />
      <Stack.Screen name="TandC" component={TandC} options={noHeader} />
      <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguage}
        options={noHeader}
      />
      <Stack.Screen name="Register" component={Register} options={noHeader} />

      <Stack.Screen
        name="AdditionalInfo"
        component={AdditionalInfo}
        options={noHeader}
      />
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
      <Stack.Screen
        name="ForgotPasswordOtp"
        component={ForgotPasswordOtp}
        options={noHeader}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={noHeader}
      />
      <Stack.Screen name="Referral" component={Referral} options={noHeader} />
      <Stack.Screen
        name="BaselineCheckpoint"
        component={BaseLineCheckpoint}
        options={noHeader}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
