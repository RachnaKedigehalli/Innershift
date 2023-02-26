import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const Register = ({ route, navigation }) => {
  const [enterEmailText, setenterEmailText] = useState(
    "Verify email ID with OTP"
  );
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState();
  const [continueText, setContinueText] = useState("Verify");
  const { verifyOTP } = useContext(AuthContext);
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
              keyboardType="default"
            />
            {isVerified == false ? (
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
                onPress={async () => {
                  const verified = verifyOTP(email, otp);
                  setIsVerified(verified);
                  console.log(verified);
                  if (await verified)
                    navigation.navigate("RegisterName", { email: email });
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
