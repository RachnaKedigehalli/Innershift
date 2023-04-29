import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AppStyles from "../AppStyles";
import { AuthContext } from "./auth/AuthContext";
import temp_thumbnail from "../../assets/images/dummy/profile1.jpg";
import { Icon } from "@rneui/base";
const translate = require("google-translate-api-x");

const ModuleCard = (props) => {
  const { appLanguage } = useContext(AuthContext);
  const [module, setModule] = useState();
  const [moduleAssignment, setModuleAssignment] = useState();
  const translateText = (originalText, setText) => {
    useEffect(() => {
      translate(originalText, {
        from: "en",
        to: appLanguage,
      }).then((res) => setText(res.text));
    }, []);
  };
  useEffect(() => {
    setModule(JSON.parse(props.module.module.content));
    setModuleAssignment(props.module.moduleAssignment);
    console.log(
      "module in module card: ",
      JSON.parse(props.module.module.content)
    );
    console.log(
      "moduleAssignment in module card: ",
      props.module.moduleAssignment
    );
  }, []);

  // translateText(props.module.title, setModuleTitle);
  // translateText(props.module.description, setModuleDesp);
  return (
    <View style={(!props.isLocked ? styles : locked_styles).mainContainer}>
      {/* <Image source={require('./../data/banner.jpeg') }/> */}
      <View style={(!props.isLocked ? styles : locked_styles).ImgContainer}>
        <Image
          source={module.thumbnail}
          style={(!props.isLocked ? styles : locked_styles).moduleImg}
        />
        <View style={(!props.isLocked ? styles : locked_styles).overlay} />
      </View>
      <View style={(!props.isLocked ? styles : locked_styles).title}>
        <Text style={(!props.isLocked ? styles : locked_styles).titleText}>
          {module ? module.title : ""}
        </Text>
        <View style={(!props.isLocked ? styles : locked_styles).description}>
          <Text
            style={(!props.isLocked ? styles : locked_styles).descriptionText}
          >
            {module ? module.description : ""}
          </Text>
        </View>
      </View>
      <Icon
        name="lock"
        type="material-community"
        color={AppStyles.colour.darkGrey}
        style={(!props.isLocked ? styles : locked_styles).lock}
      />
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
  lock: {
    display: "none",
  },
});

const locked_styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 35,
    // backgroundColor: AppStyles.colour.black,
  },
  moduleImg: {
    height: 70,
    width: 70,
    borderRadius: 70,
    flex: 1,
    // backgroundColor: "rgba(100,100,100,0.8)",
  },
  overlay: {
    height: 70,
    width: 70,
    borderRadius: 70,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  ImgContainer: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: "rgba(100,100,100,0.8)",
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
    color: AppStyles.colour.darkGrey,
  },
  description: { marginTop: 0 },
  descriptionText: { fontSize: 12, color: AppStyles.colour.darkGrey },
  lock: {
    marginLeft: 15,
  },
});
