import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { React } from "react";
import CustomButton from "./CustomButton";
import AppStyles from "../AppStyles";

const Register = ({ navigation }) => {
  const register = "Enter your email ID";
  const content = ["Register", "or", "Login"];
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 81,
        height: "100%",
        backgroundColor: AppStyles.colour.white,
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
            fontSize: 27,
            fontWeight: "600",
            color: AppStyles.colour.textGreen,
            width: 300,
            textAlign: "center",
            fontFamily: AppStyles.font.subHeadings,
          }}
        >
          {register}
        </Text>

        <CustomButton
          title={content[0]}
          accessibilityLabel={content[0]}
          onPress={() => {
            navigation.navigate("Login"), { screen: "Login" };
          }}
        />
      </View>
    </View>
  );
};

export default Register;
