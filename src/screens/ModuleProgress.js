import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import QuestionModule from "../components/QuestionModule";
import ReadingModule from "../components/ReadingModule";
import MediaModule from "../components/MediaModule";
import AppStyles from "../AppStyles";
import TopBar from "../components/TopBar";

const ModuleProgress = ({ route, navigation }) => {
  const { module, startTime } = route.params;
  const [moduleData, setModuleData] = useState();
  const [moduleAssignment, setModuleAssignment] = useState();
  const [response, setResponse] = useState([]);

  console.log("module", module);
  console.log("module.tasks", module.tasks);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    setModuleData(JSON.parse(module.module.content));
    setModuleAssignment(module.moduleAssignment);
    console.log("module in module card: ", JSON.parse(module.module.content));
    console.log("moduleAssignment in module card: ", moduleAssignment);
  }, []);

  const moduleReturn = (tasks) => {
    if (tasks[taskIndex].type == 0) {
      return (
        <QuestionModule
          moduleAssignmentId={module.moduleAssignment.moduleAssignedId}
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
          startTime={new Date(startTime)}
          response={response}
          setResponse={setResponse}
        />
      );
    } else if (tasks[taskIndex].type == 2) {
      return (
        <ReadingModule
          moduleAssignmentId={module.moduleAssignment.moduleAssignedId}
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
          startTime={new Date(startTime)}
          response={response}
          setResponse={setResponse}
        />
      );
    } else {
      return (
        <MediaModule
          moduleAssignmentId={module.moduleAssignment.moduleAssignedId}
          task={tasks[taskIndex]}
          index={taskIndex}
          totalTasks={tasks.length}
          setIndex={setTaskIndex}
          navigation={navigation}
          startTime={new Date(startTime)}
          response={response}
          setResponse={setResponse}
        />
      );
    }
  };

  return (
    <>
      <TopBar
        navigation={navigation}
        onBack={() => {
          return taskIndex == 0
            ? navigation.goBack()
            : setTaskIndex(taskIndex - 1);
        }}
        showBack={true}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {moduleData ? (
          <>
            <View style={styles.progressBar.bar}>
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    ...styles.progressBar.progress,
                    width: `${(taskIndex / moduleData.tasks.length) * 100}%`,
                  },
                ]}
              />
            </View>
            {moduleReturn(moduleData.tasks)}
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </>
  );
};

export default ModuleProgress;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    // alignItems: "center",
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
