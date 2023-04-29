import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AppStyles from "../AppStyles";
import { AuthContext } from "./../components/auth/AuthContext";
import { Icon } from "@rneui/themed";

const translate = require("google-translate-api-x");

const ConsultationWaiting = () => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };
  const originalTexts = {
    waitingText: "Waiting for consultation to be accepted by the doctor",
  };
  const [waitingText, setWaitingText] = useState(originalTexts.waitingText);
  translateText(originalTexts.waitingText, setWaitingText);

  return (
    <View style={styles.container}>
      <Icon
        name="clock-outline"
        type="material-community"
        size={130}
        color={AppStyles.colour.darkGreen}
      />

      <Text style={styles.waitingText}>{waitingText}</Text>
    </View>
  );
};

export default ConsultationWaiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  waitingText: {
    fontFamily: AppStyles.font.subHeadings,
    fontSize: 22,
    textAlign: "center",
    color: AppStyles.colour.darkGreen,
    marginTop: 20,
  },
});
