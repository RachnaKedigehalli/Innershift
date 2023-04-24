import { View, Text, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const StartPage = ({ navigation }) => {
    const { appLanguage } = useContext(AuthContext);

    const translateText = (originalText, setText) => {
        useEffect(() => {
            translate(originalText, {
                from: "en",
                to: appLanguage,
            }).then((res) => setText(res.text));
        }, []);
    };

    const originalTexts = [
        "Welcome, let’s get started!",
        "Register",
        "or",
        "Login",
    ];
    const [welcomeText, setWelcomeText] = useState(originalTexts[0]);
    const [registerText, setRegisterText] = useState(originalTexts[1]);
    const [orText, setOrText] = useState(originalTexts[2]);
    const [loginText, setLoginText] = useState(originalTexts[3]);

    translateText(originalTexts[0], setWelcomeText);
    translateText(originalTexts[1], setRegisterText);
    translateText(originalTexts[2], setOrText);
    translateText(originalTexts[3], setLoginText);

    return (
        <View
            style={{
                flexDirection: "column",
                alignItems: "center",
                // paddingTop: 226,
                justifyContent: "center",
                backgroundColor: AppStyles.colour.white,
                height: "100%",
                // gap: 57,
            }}
        >
            <Image source={require("assets/images/logo.png")} />
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 57,
                    // gap: 9
                }}
            >
                <Text
                    style={{
                        fontSize: 27,
                        fontWeight: "600",
                        color: AppStyles.colour.textGreen,
                        width: 300,
                        textAlign: "center",
                        fontFamily: AppStyles.font.subHeadings,
                    }}
                >
                    {welcomeText}
                </Text>

                <View
                    style={{
                        marginTop: 42,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 135,
                    }}
                >
                    <CustomButton
                        title={registerText}
                        accessibilityLabel={registerText}
                        onPress={() => {
                            navigation.navigate("TandC", { screen: "TandC" });
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "500",
                            color: AppStyles.colour.darkGrey,
                            fontFamily: AppStyles.font.subHeadings,
                        }}
                    >
                        {orText}
                    </Text>
                    <CustomButton
                        title={loginText}
                        accessibilityLabel={loginText}
                        onPress={() => {
                            navigation.navigate("Login", { screen: "Login" });
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default StartPage;
