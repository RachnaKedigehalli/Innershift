import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";

const translate = require("google-translate-api-x");

const LoginPassword = ({ route, navigation }) => {
    const { login, userToken, appLanguage } = useContext(AuthContext);
    const { email } = route.params;

    const translateText = (originalText, setText) => {
        useEffect(() => {
            translate(originalText, {
                from: "en",
                to: appLanguage,
            }).then((res) => setText(res.text));
        }, []);
    };

    const originalTexts = {
        enterPasswordText: "Enter your password",
        loginText: "Login",
        invalidText: "Incorrect email or password",
    };
    const [enterPasswordText, setEnterPasswordText] = useState(
        originalTexts.enterPasswordText
    );
    const [loginText, setLoginText] = useState(originalTexts.loginText);
    const [invalidText, setInvalidText] = useState(originalTexts.invalidText);
    translateText(originalTexts.enterPasswordText, setEnterPasswordText);
    translateText(originalTexts.loginText, setLoginText);
    translateText(originalTexts.invalidText, setInvalidText);

    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                            // fontSize: 27,
                            fontSize: Platform.OS == "android" ? 24 : 27,
                            fontWeight: "600",
                            color: AppStyles.colour.textGreen,
                            width: 300,
                            textAlign: "center",
                            fontFamily: AppStyles.font.subHeadings,
                        }}
                    >
                        {enterPasswordText}
                    </Text>

                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <CustomTextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                        {invalid ? (
                            <View
                                style={{
                                    paddingLeft: 8,
                                    paddingTop: 10,
                                }}
                            >
                                <Text style={{ color: "red" }}>
                                    {invalidText}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}

                        <View
                            style={{
                                marginTop: 42,
                            }}
                        >
                            <CustomButton
                                title={loginText}
                                accessibilityLabel={loginText}
                                loading={isLoading}
                                onPress={async () => {
                                    setIsLoading(true);
                                    const prom = login(email, password);
                                    setInvalid(await prom);
                                    setIsLoading(false);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginPassword;

const styles = StyleSheet.create({});
