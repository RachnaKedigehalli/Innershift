import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import CustomButton from "./CustomButton";
import AppStyles from "../AppStyles";
import CustomTextInput from "./CustomTextInput";
import { AuthContext } from "../AuthContext";

const LoginPassword = ({ route, navigation }) => {
  const [enterPasswordText, setenterPasswordText] = useState(
    "Enter your password"
  );
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [loginText, setLoginText] = useState("Login");
  const { login, userToken } = useContext(AuthContext);
  const { email } = route.params;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
        <Image source={require("../../assets/images/logo.png")} />
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
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
            {invalid ? (
              <View
                style={{
                  paddingLeft: 8,
                  paddingTop: 10,
                }}
              >
                <Text style={{ color: "red" }}>
                  Incorrect email or password.{" "}
                </Text>
              </View>
            ) : (
              <></>
            )}

            <View
              style={{
                marginTop: 42,
              }}
            >
              <CustomButton
                title={loginText}
                accessibilityLabel={loginText}
                onPress={async () => {
                  const prom = login(email, password);
                  setInvalid(await prom);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginPassword;

const styles = StyleSheet.create({});
