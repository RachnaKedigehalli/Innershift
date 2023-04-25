import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const Login = ({ navigation }) => {
    const { appLanguage } = useContext(AuthContext);

    const translateText = (originalText, setText) => {
        useEffect(() => {
            translate(originalText, {
                from: "en",
                to: appLanguage,
            }).then((res) => setText(res.text));
        }, []);
    };

    const originalTexts = {
        enterEmailText: "Enter your email ID",
        continueText: "Continue",
    };
    const [enterEmailText, setEnterEmailText] = useState(
        originalTexts.enterEmailText
    );
    const [emailID, setEmailID] = useState("");
    const [continueText, setContinueText] = useState(
        originalTexts.continueText
    );

    translateText(originalTexts.enterEmailText, setEnterEmailText);
    translateText(originalTexts.continueText, setContinueText);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: 81,
                    justifyContent: "center",
                    // backgroundColor: AppStyles.colour.wh
                    // gap: 57,
                }}
            >
                <Image source={require("../../../assets/images/logo.png")} />
                <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: 61,
                        // gap: 9
                    }}
                >
                    <Text
                        style={{
                            fontSize: Platform.OS == "android" ? 24 : 27,
                            fontWeight: "600",
                            color: AppStyles.colour.textGreen,
                            width: 300,
                            textAlign: "center",
                            fontFamily: AppStyles.font.subHeadings,
                        }}
                    >
                        {enterEmailText}
                    </Text>

                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <CustomTextInput
                            onChangeText={setEmailID}
                            value={emailID}
                            placeholder="Email ID"
                            keyboardType="email-address"
                        />

                        <View
                            style={{
                                marginTop: 42,
                            }}
                        >
                            <CustomButton
                                title={continueText}
                                accessibilityLabel={continueText}
                                onPress={() => {
                                    navigation.navigate("LoginPassword", {
                                        email: emailID.toLowerCase(),
                                    });
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({});
