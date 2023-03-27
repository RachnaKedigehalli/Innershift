import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStyles from "./AppStyles";
import Home from "./screens/Home";
import BottomTabNavigator from "./components/BottomTabNavigator";
import { useState } from "react";
import Mood from "./screens/Mood";

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
        <Stack.Navigator initialRouteName={isMoodSet ? "Home" : "Mood"}>
            <Stack.Screen name="Home" component={Home} options={noHeader} />
            <Stack.Screen name="Mood" component={Mood} options={noHeader} />
        </Stack.Navigator>
        // <BottomTabNavigator/>
    );
};

export default AppStack;
