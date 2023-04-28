import { StyleSheet, Text, View, Dimensions } from "react-native";
import { CheckBox } from "@rneui/themed";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import AppStyles from "../AppStyles";
import { AuthContext } from "./auth/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_APP_URL } from "../../config";

const translate = require("google-translate-api-x");

const ReadingModule = ({
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
  const [taskContent, setTaskContent] = useState(task.content);
  translateText(task.title, setTaskTitle);
  translateText(task.description, setTaskDesp);
  translateText(task.content, setTaskContent);

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
  const [isSelected, setIsSelected] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{taskTitle}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{taskDesp}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{taskContent}</Text>
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
              submitModule(response, startTime);
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
