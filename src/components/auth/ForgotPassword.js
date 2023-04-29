import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BASE_AUTH_URL } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translate = require("google-translate-api-x");

const ForgotPassword = ({ route, navigation }) => {
  const { appLanguage, login } = useContext(AuthContext);
  const { otp, response, email } = route.params;

  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    enterPasswordText: "Reset your password",
    loginText: "Change password",
  };
  const [enterPasswordText, setEnterPasswordText] = useState(
    originalTexts.enterPasswordText
  );
  const [loginText, setLoginText] = useState(originalTexts.loginText);

  translateText(originalTexts.enterPasswordText, setEnterPasswordText);
  translateText(originalTexts.loginText, setLoginText);

  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const changePassword = async () => {
    const config = {
      headers: { Authorization: `Bearer ${response.token}` },
    };
    console.log("userToken in forgot pass ", response.token);
    await axios
      .post(
        `${BASE_AUTH_URL}/setPassword`,
        {
          email: email,
          otp: otp,
          password: password,
        },
        config
      )
      .then(async (res) => {
        console.log("forgot password", res.data);
        login(email, password);
      })
      .catch(console.log);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: AppStyles.colour.white,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 81,
          justifyContent: "center",
          // backgroundColor: AppStyles.colour.wh
          // gap: 57,
        }}
      >
        <Image source={require("../../../assets/images/logo.png")} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 61,
            // gap: 9
          }}
        >
          <Text
            style={{
              // fontSize: 27,
              fontSize: Platform.OS == "android" ? 24 : 27,
              fontWeight: "600",
              color: AppStyles.colour.textGreen,
              width: 300,
              textAlign: "center",
              fontFamily: AppStyles.font.subHeadings,
            }}
          >
            {enterPasswordText}
          </Text>

          <View
            style={{
              marginTop: Platform.OS == "android" ? 20 : 25,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTextInput
              onChangeText={setPassword}
              value={password}
              placeholder="New password"
              secureTextEntry={true}
              autoFocus={true}
            />

            <View
              style={{
                marginTop: 19,
              }}
            >
              <CustomTextInput
                onChangeText={setRepassword}
                value={repassword}
                placeholder="Re-type new password"
                secureTextEntry={true}
                error={errorStatus}
              />
              {repassword != "" && password != repassword ? (
                <View
                  style={{
                    paddingLeft: 8,
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ color: "red" }}>Passwords do not match </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <CustomButton
                title={loginText}
                accessibilityLabel={loginText}
                disabled={
                  password == "" || repassword == "" || password != repassword
                }
                onPress={async () => {
                  // register(email, first, last, password);
                  //   navigation.navigate("AdditionalInfo", {
                  //     email: email,
                  //     password: password,
                  //     firstName: first,
                  //     lastName: last,
                  //   });
                  await changePassword();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
