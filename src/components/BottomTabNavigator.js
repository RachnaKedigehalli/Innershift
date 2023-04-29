import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import TopBar from "./TopBar";
import SearchDoctor from "../screens/SearchDoctor";
import CalenderScreen from "../screens/CalendarScreen";
import Chat from "../screens/Chat";
import home from "../../assets/icons/home_inactive.png";
import home_active from "../../assets/icons/home_active.png";
import cal from "../../assets/icons/cal_inactive.png";
import cal_active from "../../assets/icons/cal_active.png";
import chat from "../../assets/icons/chat_inactive.png";
import chat_active from "../../assets/icons/chat_active.png";
import AppStyles from "../AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";
import CalendarStack from "../stacks/CalendarStack";
import HomeModuleStack from "../stacks/HomeModuleStack";
import ConsultationWaiting from "../screens/ConsultationWaiting";
const noHeader = { headerShown: false };
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const [showBack, setShowBack] = useState(false);
  const [isDoctorAssigned, setIsDoctorAssigned] = useState(0);

  const apiCall = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    console.log("token", token);
    console.log("userDetails", userDetails);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      patientId: await userDetails.id,
    };
    // console.log("patient_id", bodyParameters.patientId);
    var consultation_var = undefined;
    await axios
      .post(`${BASE_APP_URL}/isConsulting`, bodyParameters, config)
      .then(async (res) => {
        console.log("isCOns data: ", JSON.stringify(res.data));
        console.log(typeof res.data);
        if (JSON.stringify(res.data) == "[]") {
          console.log("empty");
        } else if (res.data[0].status == true) {
          console.log("data : ", typeof res.data[0].doctorId);
          var docbody = {
            doctorId: await res.data[0].doctorId,
          };

          await axios
            .post(`${BASE_APP_URL}/getDoctorById`, docbody, config)
            .then(async (res2) => {
              console.log("doc data: ", JSON.stringify(res2.data));
              consultation_var = { ...res.data[0], doctor: res2.data };
              await AsyncStorage.setItem(
                "consultation",
                JSON.stringify(consultation_var)
              );
            })
            .catch((e) => console.log("consulting doctor not found ", e));
          console.log(consultation_var);
          setIsDoctorAssigned(2);
        } else {
          setIsDoctorAssigned(1);
        }
      })
      .catch((e) => console.log("Not consulting a doctor ", e));
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    // <View>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.bottomTab,
      }}
      initialRouteName="home"
      tabBarShowLabel={false}
      backBehavior={"history"}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="home"
        component={HomeModuleStack}
        options={{
          // header: ({ navigation, route, options, back }) => {
          //   return <TopBar showBack={showBack} navigation={navigation} />;
          // },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <>
                {focused ? (
                  <Image source={home_active} size={size} />
                ) : (
                  <Image source={home} size={size} />
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="calender"
        component={CalendarStack}
        options={{
          // header: ({ navigation, route, options, back }) => {
          //   return <TopBar showBack={false} navigation={navigation} />;
          // },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <>
                {focused ? (
                  <Image source={cal_active} size={size} />
                ) : (
                  <Image source={cal} size={size} />
                )}
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="chats"
        options={{
          header: ({ navigation, route, options, back }) => {
            // return <TopBar showBack={false} />;
            return isDoctorAssigned == 2 ? (
              <></>
            ) : (
              <TopBar showBack={false} navigation={navigation} />
            );
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <>
                {focused ? (
                  <Image source={chat_active} size={size} />
                ) : (
                  <Image source={chat} size={size} />
                )}
              </>
            );
          },
          tabBarStyle:
            isDoctorAssigned == 2 ? { display: "none" } : styles.bottomTab,
        }}
      >
        {(props) => {
          apiCall();
          console.log("isDocAssigned: ", isDoctorAssigned);
          return isDoctorAssigned == 2 ? (
            <Chat {...props} />
          ) : isDoctorAssigned == 1 ? (
            <ConsultationWaiting />
          ) : (
            <SearchDoctor setIsDoctorAssigned={setIsDoctorAssigned} />
          );
        }}
      </Tab.Screen>
    </Tab.Navigator>
    // </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  bottomTab: {
    borderRadius: 15,
    borderTopColor: AppStyles.colour.darkGreen,
    borderTopWidth: 2.5,
    height: 75,
    // opacity: 0,
  },
});
