import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { CheckBox } from "@rneui/themed";
import AppStyles from "../AppStyles";
import { AuthContext } from "../components/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";

const translate = require("google-translate-api-x");

const ManageConsent = () => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    title: "Manage Consent",
    doctorConsent:
      "Allow your doctor to use anonymised data for research/second opinion",
    generalConsent:
      "Allow use of anonymised data for app statistics, decision making",
    buttonText: "Update Consent",
    updatedText: "Consent updated",
  };
  const [title, setTitle] = useState(originalTexts.title);
  const [doctorConsent, setDoctorConsent] = useState(
    originalTexts.doctorConsent
  );
  const [generalConsent, setGeneralConsent] = useState(
    originalTexts.generalConsent
  );
  const [buttonText, setButtonText] = useState(originalTexts.buttonText);
  const [updatedText, setUpdatedText] = useState(originalTexts.updatedText);

  translateText(originalTexts.doctorConsent, setDoctorConsent);
  translateText(originalTexts.generalConsent, setGeneralConsent);
  translateText(originalTexts.title, setTitle);
  translateText(originalTexts.buttonText, setButtonText);
  translateText(originalTexts.updatedText, setUpdatedText);

  const [isDoctorConsent, setIsDoctorConsent] = useState(false);
  const [isGeneralConsent, setIsGeneralConsent] = useState(false);

  const [updated, setUpdated] = useState(false);

  const getConsent = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        `${BASE_APP_URL}/getConsentByPid`,
        {
          patientId: userDetails.id,
        },
        config
      )
      .then((res) => {
        // console.log("consent log ", res.data);
        setIsDoctorConsent(res.data.doctorConsent);
        setIsGeneralConsent(res.data.generalConsent);
      });
  };

  const updateConsent = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        `${BASE_APP_URL}/updateConsentByPid`,
        {
          patientId: userDetails.id,
          doctorConsent: isDoctorConsent,
          generalConsent: isGeneralConsent,
        },
        config
      )
      .then((res) => {
        console.log("update consent log ", res.data);
      });
  };
  useEffect(() => {
    getConsent();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.checkboxes}>
        <CheckBox
          title={doctorConsent}
          checked={isDoctorConsent}
          iconType="material-community"
          containerStyle={{
            backgroundColor: AppStyles.colour.white,
            width: "100%",
          }}
          onPress={() => setIsDoctorConsent(!isDoctorConsent)}
          checkedIcon={"checkbox-marked"}
          uncheckedIcon={"checkbox-blank-outline"}
          checkedColor={AppStyles.colour.darkGreen}
          uncheckedColor={AppStyles.colour.darkGreen}
          textStyle={{
            color: AppStyles.colour.textGreen,
            fontFamily: AppStyles.font.Poppins_500Medium,
          }}
        />
        <CheckBox
          title={generalConsent}
          checked={isGeneralConsent}
          iconType="material-community"
          containerStyle={{
            backgroundColor: AppStyles.colour.white,
            width: "100%",
          }}
          onPress={() => setIsGeneralConsent(!isGeneralConsent)}
          checkedIcon={"checkbox-marked"}
          uncheckedIcon={"checkbox-blank-outline"}
          checkedColor={AppStyles.colour.darkGreen}
          uncheckedColor={AppStyles.colour.darkGreen}
          textStyle={{
            color: AppStyles.colour.textGreen,
            fontFamily: AppStyles.font.Poppins_500Medium,
          }}
        />
      </View>
      <CustomButton
        title={buttonText}
        accessibilityLabel={buttonText}
        onPress={async () => {
          await updateConsent();
          setUpdated(true);
          //   navigation.navigate("Register", {
          //       doctorConsent: isDoctorConsent,
          //       generalConsent: isGeneralConsent,
          //   });
        }}
      />
      {updated ? (
        <Text
          style={{
            fontFamily: AppStyles.font.poppinsRegular,
            fontSize: 14,
            color: AppStyles.colour.darkGrey,
            marginTop: 10,
          }}
        >
          {updatedText}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ManageConsent;

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
    marginBottom: 25,
    marginTop: 25,
  },
  checkboxes: {
    marginBottom: 45,
  },
});
