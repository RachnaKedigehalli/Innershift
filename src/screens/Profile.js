import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import CustomButton from "../components/CustomButton";
import { Avatar } from "@rneui/base";
import dp from "../../assets/images/dummy/profile1.jpg";
import AppStyles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translate = require("google-translate-api-x");

const Profile = () => {
  const { logout, user, appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = { logoutText: "Logout" };
  const [logoutText, setLogoutText] = useState(originalTexts.logoutText);
  translateText(originalTexts.logoutText, setLogoutText);

  return (
    <View style={styles.mainContainer}>
      <Image source={dp} style={styles.dp} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
      </View>
      <CustomButton
        title={logoutText}
        accessibilityLabel={logoutText}
        onPress={async () => await logout()}
      ></CustomButton>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppStyles.colour.white,
    alignItems: "center",
  },
  dp: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  nameContainer: {
    marginVertical: 30,
  },
  name: {
    fontSize: 25,
    fontWeight: "700",
    color: AppStyles.colour.textGreen,
  },
});
