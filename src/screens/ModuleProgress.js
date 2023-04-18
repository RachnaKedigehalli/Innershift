import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import QuestionModule from "../components/QuestionModule";
import ReadingModule from "../components/ReadingModule";
import MediaModule from "../components/MediaModule";
import AppStyles from "../AppStyles";

const ModuleProgress = ({ route, navigation }) => {
  const { module } = route.params;
  const [taskIndex, setTaskIndex] = useState(0);

  const moduleReturn = (tasks) => {
    if (tasks[taskIndex].type == 0) {
      return (
        <QuestionModule
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
        />
      );
    } else if (tasks[taskIndex].type == 1) {
      return (
        <ReadingModule
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
        />
      );
    } else {
      return (
        <MediaModule
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.progressBar.bar}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              ...styles.progressBar.progress,
              width: `${(taskIndex / module.tasks.length) * 100}%`,
            },
          ]}
        />
      </View>
      {moduleReturn(module.tasks)}
    </View>
  );
};

export default ModuleProgress;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: AppStyles.colour.white,
    width: "100%",
  },
  progressBar: {
    bar: {
      borderRadius: 10,
      width: Dimensions.get("window").width - 50,
      height: 7,
      backgroundColor: AppStyles.colour.lightGreen,
      overflow: "hidden",
      marginTop: 35,
    },
    progress: {
      backgroundColor: AppStyles.colour.darkGreen,
      borderRadius: 10,
    },
  },
});
