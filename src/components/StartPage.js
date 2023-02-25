import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import AppStyles from "../AppStyles";

const StartPage = ({ navigation }) => {
  const welcomeText = "Welcome, let’s get started!";
  const registerOrLoginText = ["Register", "or", "Login"];

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 226,
        // gap: 57,
      }}
    >
      <Image source={require("../../assets/images/logo.png")} />
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginTop: 57,
          // gap: 9
        }}
      >
        <Text
          style={{
            fontSize: 27,
            fontWeight: "600",
            color: AppStyles.colour.textGreen,
            width: 300,
            textAlign: "center",
            fontFamily: AppStyles.font.subHeadings,
          }}
        >
          {welcomeText}
        </Text>

        <View
          style={{
            marginTop: 42,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: 135,
          }}
        >
          <CustomButton
            title={registerOrLoginText[0]}
            accessibilityLabel={registerOrLoginText[0]}
            onPress={() => {
              navigation.navigate("Register"), { screen: "Register" };
            }}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: AppStyles.colour.darkGrey,
              fontFamily: AppStyles.font.subHeadings,
            }}
          >
            {registerOrLoginText[1]}
          </Text>
          <CustomButton
            title={registerOrLoginText[2]}
            accessibilityLabel={registerOrLoginText[2]}
            onPress={() => {
              navigation.navigate("Login"), { screen: "Login" };
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StartPage;
