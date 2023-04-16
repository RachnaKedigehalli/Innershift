import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Image } from "@rneui/base";
import AppStyles from "../AppStyles";

const ModuleCard = (props) => {
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={require('./../data/banner.jpeg') }/> */}
      <Image source={{ uri: props.imageUri }} style={styles.moduleImg} />
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.heading}</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{props.description}</Text>
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
    borderRadius: "100%",
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
