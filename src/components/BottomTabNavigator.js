import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import TopBar from "./TopBar";
import SearchDoctor from "../screens/SearchDoctor";
import CalenderScreen from "../screens/ProfileScreen";
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
const noHeader = { headerShown: false };
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const [showBack, setShowBack] = useState(false);
  const [isDoctorAssigned, setIsDoctorAssigned] = useState(false);

  useEffect(() => {
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

      await axios
        .post(`${BASE_APP_URL}/isConsulting`, bodyParameters, config)
        .then((res) => {
          console.log("isCOns data: ", JSON.stringify(res.data));
          console.log(typeof res.data);
          if (JSON.stringify(res.data) == "[]") {
            console.log("empty");
          } else {
            console.log("hey hey hey");
            setIsDoctorAssigned(true);
          }
        })
        .catch(console.log);
    };
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
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          header: ({ navigation, route, options, back }) => {
            return <TopBar showBack={showBack} />;
          },
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
        component={CalenderScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return <TopBar showBack={false} />;
          },
          tabBarShowLabel: false,
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
            return isDoctorAssigned ? <></> : <TopBar showBack={false} />;
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
          tabBarStyle: isDoctorAssigned ? { display: "none" } : {},
        }}
      >
        {() => {
          console.log("isDocAssigned: ", isDoctorAssigned);
          return isDoctorAssigned ? (
            <Chat />
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
