import React, { useState } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import TopBar from "./TopBar";
import SearchScreen from "../screens/SearchScreen";
import CalenderScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import home from "../../assets/icons/home_inactive.png";
import home_active from "../../assets/icons/home_active.png";
import cal from "../../assets/icons/cal_inactive.png";
import cal_active from "../../assets/icons/cal_active.png";
import chat from "../../assets/icons/chat_inactive.png";
import chat_active from "../../assets/icons/chat_active.png";
const noHeader = { headerShown: false };
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const [showBack, setShowBack] = useState(false);

  return (
    // <View>
    <Tab.Navigator initialRouteName="home" tabBarShowLabel={false}>
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
      {/* <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return <TopBar showBack={false} />;
          },
          tabBarShowLabel: false,
          
        }}
      /> */}
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
        component={ChatScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            return <TopBar showBack={false} />;
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
        }}
      />
    </Tab.Navigator>
    // </View>
  );
};

export default BottomTabNavigator;
