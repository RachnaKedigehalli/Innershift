import { StyleSheet, Text, View, Image, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import AppStyles from "../AppStyles";
import CustomTextInput from "./CustomTextInput";

const SetPassword = ({navigation}) => {
  const [enterPasswordText, setenterPasswordText] = useState("Set up your password");
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")

  const [loginText, setLoginText] = useState("Login")

  return (
    <ScrollView
    contentContainerStyle={{flexGrow: 1}}
    keyboardShouldPersistTaps='handled'
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
            fontSize: Platform.OS == 'android' ? 24 : 27,
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
            marginTop: Platform.OS == 'android' ? 20 : 25,
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          
          <CustomTextInput
            onChangeText = {setPassword}
            value = {password}
            placeholder = "Password"
            secureTextEntry = {true}
          />

          <View
            style={{
                marginTop: 19
              }}
          >
            <CustomTextInput
                onChangeText = {setRepassword}
                value = {repassword}
                placeholder = "Re-type password"
                secureTextEntry = {true}
            />
          </View>
          <View
            style={{
              marginTop: 30
            }}
          >
            <CustomButton
              
              title={loginText}
              accessibilityLabel={loginText}
              onPress={() => {
                navigation.navigate("Home");
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
