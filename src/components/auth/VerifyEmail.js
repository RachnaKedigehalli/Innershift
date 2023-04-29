import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const Register = ({ route, navigation }) => {
  const { verifyOTP, appLanguage } = useContext(AuthContext);
  const { email } = route.params;

  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    enterEmailText: "Verify email ID with OTP",
    continueText: "Verify",
  };

  const [enterEmailText, setEnterEmailText] = useState(
    originalTexts.enterEmailText
  );
  const [continueText, setContinueText] = useState(originalTexts.continueText);
  translateText(originalTexts.enterEmailText, setEnterEmailText);
  translateText(originalTexts.continueText, setContinueText);

  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState();

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
              onChangeText={setOtp}
              value={otp}
              placeholder="Enter your OTP"
              keyboardType="number-pad"
              autoFocus={true}
            />
            {isVerified == false ? (
              <View
                style={{
                  paddingLeft: 8,
                  paddingTop: 10,
                }}
              >
                <Text style={{ color: "red" }}>Invalid otp </Text>
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
                disabled={!otp}
                onPress={async () => {
                  const verified = await verifyOTP(email, otp);
                  setIsVerified(verified);
                  console.log(verified);
                  if (verified)
                    navigation.navigate("RegisterName", {
                      ...route.params,
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
