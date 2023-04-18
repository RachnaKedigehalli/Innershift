import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import AppStyles from "../AppStyles";

const QuestionModule = ({ task, index, totalTasks, setIndex, navigation }) => {
  const [response, setResponse] = useState("");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{task.title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.typeMessage}
          onChangeText={setResponse}
          value={response}
          placeholder={"Write your response here..."}
          placeholderTextColor={AppStyles.colour.grey}
          multiline
          editable
          numberOfLines={1}
          cursorColor={AppStyles.colour.darkGreen}
        />
      </View>
      <View style={styles.continueButton}>
        <CustomButton
          title={index + 1 == totalTasks ? "Finish" : "Proceed"}
          accessibilityLabel={"Proceed"}
          disabled={response == ""}
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

export default QuestionModule;

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
  inputContainer: {
    marginTop: 25,
    height: "65%",
  },
  typeMessage: {
    borderWidth: 1.1,
    borderRadius: 15,
    borderColor: "#757575",
    padding: 15,
    paddingTop: 15,
    height: "80%",
    color: AppStyles.colour.textGreen,
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 0,
  },
});
