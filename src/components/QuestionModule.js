import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import AppStyles from "../AppStyles";
import { AuthContext } from "./auth/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_APP_URL } from "../../config";

const translate = require("google-translate-api-x");

const QuestionModule = ({
  moduleAssignmentId,
  task,
  index,
  totalTasks,
  setIndex,
  navigation,
  startTime,
  response,
  setResponse,
}) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    useEffect(() => {
      translate(originalText, {
        from: "en",
        to: appLanguage,
      }).then((res) => setText(res.text));
    }, []);
  };
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDesp, setTaskDesp] = useState(task.description);
  translateText(task.title, setTaskTitle);
  translateText(task.description, setTaskDesp);

  const submitModule = async (response, startTime) => {
    let token = await AsyncStorage.getItem("userToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const current = new Date();
    const duration = current.getTime() - startTime.getTime();
    const bodyParameters = {
      moduleAssignedId: moduleAssignmentId,
      response: JSON.stringify({ response: response }),
      start_timestamp: startTime,
      duration: duration.toString(),
      status: true,
    };
    await axios
      .post(`${BASE_APP_URL}/sendModuleResponse`, bodyParameters, config)
      .then((res) => {
        navigation.goBack();
      });
  };
  const [answer, setAnswer] = useState("");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{taskTitle}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{taskDesp}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.typeMessage}
          onChangeText={setAnswer}
          value={answer}
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
          disabled={answer == ""}
          onPress={() => {
            if (index < totalTasks) {
              setIndex(index + 1);
              setResponse([
                ...response,
                { task: task.description, response: answer },
              ]);
            } else {
              submitModule(response, startTime);
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
