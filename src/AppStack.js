import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStyles from "./AppStyles";
import Home from "./screens/Home";
import { useState } from "react";
import Mood from "./screens/Mood";
import BottomTabNavigator from "./components/BottomTabNavigator";
import Chat from "./screens/Chat";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    const [isMoodSet, setIsMoodSet] = useState(false);

    const discreteHeader = {
        headerShown: true,
        title: "",
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: AppStyles.colour.white,
        },
        headerTintColor: AppStyles.colour.darkGreen,
    };
    const noHeader = { headerShown: false };

    return (
        <>
            <Stack.Navigator
                initialRouteName={isMoodSet ? "BottomTabNavigator" : "Mood"}
            >
                <Stack.Screen name="Home" component={Home} options={noHeader} />
                <Stack.Screen name="Mood" component={Mood} options={noHeader} />
                <Stack.Screen name="Chat" component={Chat} options={noHeader} />
                <Stack.Screen
                    name="BottomTabNavigator"
                    component={BottomTabNavigator}
                    options={noHeader}
                />
            </Stack.Navigator>
            {/* <BottomTabNavigator /> */}
        </>
    );
};

export default AppStack;
