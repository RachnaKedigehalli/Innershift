import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppStyles from "../AppStyles";
import { AuthContext } from "./auth/AuthContext";

const translate = require("google-translate-api-x");

const ModuleCard = (props) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    useEffect(() => {
      translate(originalText, {
        from: "en",
        to: appLanguage,
      }).then((res) => setText(res.text));
    }, []);
  };

  const [moduleTitle, setModuleTitle] = useState(props.module.title);
  const [moduleDesp, setModuleDesp] = useState(props.module.description);
  translateText(props.module.title, setModuleTitle);
  translateText(props.module.description, setModuleDesp);
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={require('./../data/banner.jpeg') }/> */}
      <Image
        source={{ uri: props.module.thumbnail }}
        style={styles.moduleImg}
      />
      <View style={styles.title}>
        <Text style={styles.titleText}>{moduleTitle}</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{moduleDesp}</Text>
        </View>
      </View>
    </View>
  );
};

export default ModuleCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 35,
  },
  moduleImg: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  title: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
    height: 65,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppStyles.colour.darkGreen,
    marginBottom: 4,
  },
  description: { marginTop: 0 },
  descriptionText: { fontSize: 12, color: AppStyles.colour.darkGrey },
});
