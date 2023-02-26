import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const SetPassword = ({ route, navigation }) => {
  const [enterPasswordText, setenterPasswordText] = useState(
    "Set up your password"
  );
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [loginText, setLoginText] = useState("Register");
  const { first, last, email } = route.params;
  const { register } = useContext(AuthContext);
  const [errorStatus, setErrorStatus] = useState(false);

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
              placeholder="Password"
              secureTextEntry={true}
            />

            <View
              style={{
                marginTop: 19,
              }}
            >
              <CustomTextInput
                onChangeText={setRepassword}
                value={repassword}
                placeholder="Re-type password"
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
                onPress={() => {
                  register(email, first, last, password);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SetPassword;

const styles = StyleSheet.create({});
