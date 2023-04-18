import { StyleSheet, Text, View, Dimensions } from "react-native";
import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import AppStyles from "../AppStyles";

const ReadingModule = ({ task, index, totalTasks, setIndex, navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{task.title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{task.content}</Text>
      </View>
      <View style={styles.markReadContainer}>
        <CheckBox
          title={"Mark the module as read"}
          iconType="material-community"
          checkedColor={AppStyles.colour.darkGreen}
          uncheckedColor={AppStyles.colour}
          checkedIcon={"checkbox-marked"}
          containerStyle={{
            margin: 0,
            padding: 0,
          }}
          uncheckedIcon={"checkbox-blank-outline"}
          checked={isSelected}
          onPress={() => setIsSelected(!isSelected)}
          textStyle={{
            color: AppStyles.colour.textGreen,
            fontFamily: AppStyles.font.Poppins_500Medium,
          }}
        />
      </View>
      <View style={styles.continueButton}>
        <CustomButton
          title={index + 1 == totalTasks ? "Finish" : "Proceed"}
          accessibilityLabel={"Proceed"}
          disabled={!isSelected}
          onPress={() => {
            if (index < totalTasks) {
              setIndex(index + 1);
            } else {
              navigation.goBack();
            }
          }}
        />
      </View>
    </View>
  );
};

export default ReadingModule;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get("window").width - 50,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold",
    color: AppStyles.colour.textGreen,
    alignSelf: "flex-start",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: AppStyles.colour.darkGrey,
  },
  contentContainer: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
  },
  markReadContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 30,
    marginLeft: -12,
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
});
