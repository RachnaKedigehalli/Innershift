import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import AppStyles from "../AppStyles";
import CustomTextInput from "./CustomTextInput";

const RegisterName = ({ route, navigation }) => {
  const [enterNameText, setEnterNameText] = useState("Enter your full name");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [continueText, setContinueText] = useState("Continue");
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
                onPress={() => {
                  navigation.navigate("SetPassword", {
                    first: firstName,
                    last: lastName,
                    email: email,
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
