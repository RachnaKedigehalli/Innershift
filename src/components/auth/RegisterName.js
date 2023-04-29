import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const RegisterName = ({ route, navigation }) => {
  const { appLanguage } = useContext(AuthContext);
  const { email } = route.params;

  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    enterNameText: "Enter your full name",
    continueText: "Continue",
  };
  const [enterNameText, setEnterNameText] = useState(
    originalTexts.enterNameText
  );
  const [continueText, setContinueText] = useState(originalTexts.continueText);
  translateText(originalTexts.enterNameText, setEnterNameText);
  translateText(originalTexts.continueText, setContinueText);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
            {enterNameText}
          </Text>

          <View
            style={{
              marginTop: Platform.OS == "android" ? 20 : 25,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTextInput
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First name"
              autoFocus={true}
            />

            <View
              style={{
                marginTop: 19,
              }}
            >
              <CustomTextInput
                onChangeText={setLastName}
                value={lastName}
                placeholder="Last name"
              />
            </View>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <CustomButton
                title={continueText}
                accessibilityLabel={continueText}
                disabled={firstName == ""}
                onPress={() => {
                  // console.log("firstName in register name: ", firstName);
                  // console.log("lastName in register name: ", lastName);
                  navigation.navigate("SetPassword", {
                    ...route.params,
                    firstName: firstName,
                    lastName: lastName,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterName;

const styles = StyleSheet.create({});
