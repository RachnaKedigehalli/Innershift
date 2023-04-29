import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/auth/AuthContext";
// import modules from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";
import { BASE_APP_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNetInfo } from "@react-native-community/netinfo";

const translate = require("google-translate-api-x");

const Home = ({ navigation }) => {
  const { logout, user, appLanguage } = useContext(AuthContext);
  const netInfo = useNetInfo();
  const [modules, setModules] = useState([]);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  useEffect(() => {
    const getModulesForPatient = async () => {
      if (netInfo.isConnected && netInfo.isInternetReachable) {
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

            const module_cache = [];
            res.data.map((m) => {
              const scheduled = new Date(m.moduleAssignment.scheduled);
              let today = new Date();
              if (scheduled.toDateString() == today.toDateString()) {
                module_cache.push(m);
              }
            });
            AsyncStorage.setItem(
              "cached_modules",
              JSON.stringify({ modules: module_cache })
            );
          })
          .catch(console.log);
      } else {
        try {
          cached_modules = JSON.parse(
            await AsyncStorage.getItem("cached_modules")
          );
          setModules(cached_modules.modules);
        } catch (e) {
          console.log("error loading cached modules");
        }
      }
    };
    getModulesForPatient();
  }, []);

  const originalTexts = {
    bannerHeaderText: "Wind down",
    bannerTagText:
      "Sometimes, the most productive thing you can do is to relax!",
    tasksListHead: "Tasks for the day",
    tasksListTag: "Make progess bit by bit",
  };
  const [bannerHeaderText, setBannerHeaderText] = useState(
    originalTexts.bannerHeaderText
  );
  const [bannerTagText, setBannerTagText] = useState(
    originalTexts.bannerTagText
  );
  const [tasksListHead, setTasksListHead] = useState(
    originalTexts.tasksListHead
  );
  const [tasksListTag, setTasksListTag] = useState(originalTexts.tasksListTag);

  translateText(originalTexts.bannerHeaderText, setBannerHeaderText);
  translateText(originalTexts.bannerTagText, setBannerTagText);
  translateText(originalTexts.tasksListHead, setTasksListHead);
  translateText(originalTexts.tasksListTag, setTasksListTag);

  return (
    <ScrollView
      style={{
        backgroundColor: AppStyles.colour.white,
      }}
    >
      <View style={styles.page}>
        <ImageBackground
          source={require("../../assets/images/banner.png")}
          style={styles.banner.bannerImage}
          imageStyle={styles.banner.bannerImage}
        >
          <View style={styles.banner.bannerText}>
            <Text style={styles.banner.bannerTextHeader}>
              {bannerHeaderText}
            </Text>
            <Text style={styles.banner.bannerTextTag}>{bannerTagText}</Text>
          </View>
        </ImageBackground>

        <View style={styles.tasksHeader.container}>
          <Text style={styles.tasksHeader.header}>{tasksListHead}</Text>
          <Text style={styles.tasksHeader.tag}>{tasksListTag}</Text>

          <View style={styles.tasksHeader.progressBar}>
            <View
              style={[StyleSheet.absoluteFill, styles.tasksHeader.progress]}
            />
          </View>
        </View>

        <View style={styles.tasksList}>
          {modules ? (
            modules.map((module, index) => {
              const scheduled = new Date(module.moduleAssignment.scheduled);
              let today = new Date();
              // console.log(!module.moduleAssignment.locked);
              // console.log("scheduled", scheduled.toDateString());
              if (scheduled.toDateString() == today.toDateString()) {
                console.log("Yo, its today", module.module.moduleId);
                if (!module.moduleAssignment.locked) {
                  console.log("not locked");
                  today = new Date();
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("ModuleProgress", {
                          module: module,
                          startTime: today.toISOString(),
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
        </View>
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 20,
          }}
        ></View>
      </View>
      {/* <BottomTabNavigator></BottomTabNavigator> */}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
  banner: {
    bannerImage: {
      width: Dimensions.get("window").width - 50,
      height: 245,
      resizeMode: "cover",
      borderRadius: 12,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    bannerText: {
      flexDirection: "column",
      alignItems: "center",
      // textAlign: "center",
      justifyContent: "center",
      width: 220,
    },
    bannerTextHeader: {
      fontSize: 30,
      fontFamily: AppStyles.font.poppinsBold,
      color: AppStyles.colour.textGreen,
      textAlign: "center",
      // marginBottom: -15,
    },
    bannerTextTag: {
      fontFamily: AppStyles.font.poppinsRegular,
      fontSize: 12,
      color: AppStyles.colour.darkGreen,
      textAlign: "center",
    },
  },

  tasksHeader: {
    container: {
      marginTop: 25,
    },
    header: {
      fontFamily: AppStyles.font.subHeadings,
      color: AppStyles.colour.textGreen,
      fontSize: 20,
    },
    tag: {
      fontFamily: AppStyles.font.poppinsRegular,
      fontSize: 10,
      color: AppStyles.colour.darkGrey,
      // marginTop: -5,
    },
    progressBar: {
      borderRadius: 10,
      width: Dimensions.get("window").width - 50,
      height: 7,
      backgroundColor: AppStyles.colour.lightGreen,
      overflow: "hidden",
      marginTop: 7,
    },
    progress: {
      backgroundColor: AppStyles.colour.darkGreen,
      borderRadius: 10,
      width: "50%",
    },
  },
  tasksList: {
    marginTop: 50,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
