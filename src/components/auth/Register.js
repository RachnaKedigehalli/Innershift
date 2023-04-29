import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const Register = ({ navigation, route }) => {
  const { getOTP, appLanguage } = useContext(AuthContext);

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    enterEmailText: "Enter your email ID to get OTP",
    continueText: "Get OTP",
  };
  const [enterEmailText, setEnterEmailText] = useState(
    originalTexts.enterEmailText
  );
  const [continueText, setContinueText] = useState(originalTexts.continueText);

  translateText(originalTexts.enterEmailText, setEnterEmailText);
  translateText(originalTexts.continueText, setContinueText);

  const [emailID, setEmailID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
              fontSize: Platform.OS == "android" ? 24 : 27,
              fontWeight: "600",
              color: AppStyles.colour.textGreen,
              width: 300,
              // textAlign: "center",
              fontFamily: AppStyles.font.subHeadings,
            }}
          >
            {enterEmailText}
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTextInput
              onChangeText={setEmailID}
              value={emailID}
              placeholder="Email ID"
              keyboardType="email-address"
            />
            {emailID != "" && !validate(emailID) ? (
              <View
                style={{
                  paddingLeft: 8,
                  paddingTop: 10,
                }}
              >
                <Text style={{ color: "red" }}>Invalid e-mail address </Text>
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
                title={continueText}
                accessibilityLabel={continueText}
                loading={isLoading}
                disabled={!validate(emailID)}
                onPress={async () => {
                  setIsLoading(true);
                  await getOTP(emailID.toLowerCase());
                  setIsLoading(false);
                  navigation.navigate("VerifyEmail", {
                    ...route.params,
                    email: emailID.toLowerCase(),
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

export default Register;

const styles = StyleSheet.create({});
