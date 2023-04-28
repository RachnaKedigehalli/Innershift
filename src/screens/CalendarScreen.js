import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import ModuleCard from "../components/ModuleCard";
import AppStyles from "../AppStyles";
import { AuthContext } from "../components/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";

const translate = require("google-translate-api-x");

const CalenderScreen = ({ route, navigation }) => {
  const { appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    useEffect(() => {
      translate(originalText, {
        from: "en",
        to: appLanguage,
      }).then((res) => setText(res.text));
    }, []);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    return getFormatedDate(new Date(), "YYYY/MM/DD");
  });
  var givenDate = new Date(selectedDate);

  var getDate = () => {
    var givenDate = new Date(selectedDate);
    return givenDate.getDate();
  };
  var getMonth = () => {
    var givenDate = new Date(selectedDate);
    var month = givenDate.toLocaleString("default", { month: "long" });
    // return translateText(month, () => {});
    return month;
  };

  var getYear = () => {
    var givenDate = new Date(selectedDate);
    return givenDate.getFullYear();
  };

  const [modules, setModules] = useState([]);
  // translateText(
  //   selectedDate.toLocaleString("default", { month: "long" }),
  //   setSelectedMonth
  // );

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  useEffect(() => {
    console.log("date: ", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const getModulesForPatient = async () => {
      let token = await AsyncStorage.getItem("userToken");
      let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios
        .post(
          `${BASE_APP_URL}/getModulesByPid`,
          {
            patientId: userDetails.id,
          },
          config
        )
        .then((res) => {
          console.log("module:", res.data);
          setModules(res.data);
        })
        .catch(console.log);
    };
    getModulesForPatient();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: AppStyles.colour.white,
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        presentationStyle={"overFullScreen"}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <DatePicker
            options={{
              backgroundColor: "#f1f1f1",
              textHeaderColor: AppStyles.colour.darkGreen,
              textDefaultColor: "#000000",
              selectedTextColor: "#fff",
              mainColor: AppStyles.colour.darkGreen,
              textSecondaryColor: "#0f0f0f",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            current={getFormatedDate(new Date(), "YYYY/MM/DD")}
            selected={selectedDate}
            mode="calendar"
            minuteInterval={30}
            style={{ borderRadius: 20 }}
            onDateChange={async (dateString) => {
              setSelectedDate(dateString);
              await delay(200);
              setModalVisible(false);
            }}
          ></DatePicker>
        </View>
      </Modal>
      <View style={styles.dateBar}>
        <View>
          <Text style={styles.monthText}>{getMonth()}</Text>
        </View>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.dateText}>
            <Text style={styles.monthText}>{getDate()}</Text>
          </View>
        </Pressable>
        <View>
          <Text style={styles.monthText}>{getYear()}</Text>
        </View>
      </View>
      <ScrollView
        style={styles.tasksList.container}
        contentContainerStyle={styles.tasksList.contentContainer}
      >
        {modules ? (
          modules.map((module, index) => {
            const scheduled = new Date(module.moduleAssignment.scheduled);
            const today = new Date(selectedDate);
            // console.log(!module.moduleAssignment.locked);
            // console.log("scheduled", scheduled.toDateString());
            if (scheduled.toDateString() == today.toDateString()) {
              console.log("Yo, its today", module.module.moduleId);
              if (!module.moduleAssignment.locked) {
                console.log("not locked");
                return (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ModuleProgress", {
                        module: module,
                      });
                    }}
                    key={index}
                  >
                    <ModuleCard module={module} isLocked={false} />
                  </Pressable>
                );
              } else {
                return (
                  <ModuleCard module={module} isLocked={true} key={index} />
                );
              }
            }
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    padding: 50,
    height: "100%",
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dateBar: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  monthText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#004F58",
  },
  dateText: {
    borderRadius: 50,
    // padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    marginLeft: 7,
    backgroundColor: "#8AC8C2",
  },
  tasksList: {
    container: {
      marginTop: 25,
      marginHorizontal: 20,
      height: "100%",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
      // borderRadius: 20,
      // backgroundColor: AppStyles.colour.lightGreen,
    },
  },
});
