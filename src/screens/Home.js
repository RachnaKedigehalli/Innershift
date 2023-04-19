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
import React, { useContext, useState } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { color, Image } from "@rneui/base";
import modules from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import TopBar from "../components/TopBar";
// import BottomTabNavigator from "../components/BottomTabNavigator";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";

const Home = ({ navigation }) => {
  const [bannerHeaderText, setBannerHeaderText] = useState("Wind down");
  const [bannerTagText, setBannerTagText] = useState(
    "Sometimes, the most productive thing you can do is to relax!"
  );
  const [tasksListHead, setTasksListHead] = useState("Tasks for the day");
  const [tasksListTag, setTasksListTag] = useState("Make progess bit by bit");

  const { logout, user } = useContext(AuthContext);

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
          {modules.map((module, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("ModuleProgress", { module: module });
                }}
                key={index}
              >
                <ModuleCard module={module} />
              </Pressable>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 20,
          }}
        >
          <CustomButton
            title="logout"
            onPress={async () => await logout()}
          ></CustomButton>
        </View>
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
