import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../components/CustomButton";

import { AuthContext } from "../components/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";
import AppStyles from "../AppStyles";
import CustomButton2 from "../components/CustomButton2";

const translate = require("google-translate-api-x");

const DeleteAccount = ({ navigation }) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    title: "Delete Account",
    desp: "All personal and medical information linked to you will be deleted permanently. This action is irreversible.",
    sure: "Are you sure you want to delete all information?",
    goBack: "No, Go Back",
  };
  const [title, setTitle] = useState(originalTexts.title);
  const [desp, setDesp] = useState(originalTexts.desp);
  const [sure, setSure] = useState(originalTexts.sure);
  const [goBack, setGoBack] = useState(originalTexts.goBack);
  translateText(originalTexts.title, setTitle);
  translateText(originalTexts.desp, setDesp);
  translateText(originalTexts.sure, setSure);
  translateText(originalTexts.goBack, setGoBack);

  const deleteAccount = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <Text style={styles.title}>{sure}</Text>
      <Text style={styles.desp}>{desp}</Text>
      <View style={styles.buttons}>
        <CustomButton
          title={title}
          accessibilityLabel={title}
          onPress={async () => {
            await deleteAccount();
          }}
        />
        <CustomButton2
          title={goBack}
          accessibilityLabel={goBack}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: AppStyles.colour.white,
    paddingHorizontal: 35,
  },
  title: {
    fontFamily: AppStyles.font.subHeadings,
    fontSize: Platform.OS == "android" ? 24 : 27,
    color: AppStyles.colour.textGreen,
    marginBottom: 15,
    marginTop: 25,
    textAlign: "center",
  },
  desp: {
    fontFamily: AppStyles.font.poppinsRegular,
    fontSize: 15,
    color: "red",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    marginTop: 35,
  },
});
