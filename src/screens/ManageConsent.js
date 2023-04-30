import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import CustomButton from "../components/CustomButton";
import { CheckBox } from "@rneui/themed";
import AppStyles from "../AppStyles";
const translate = require("google-translate-api-x");

const ManageConsent = () => {
    const { appLanguage } = useContext(AuthContext);
    const translateText = (originalText, setText) => {
        translate(originalText, {
            from: "en",
            to: appLanguage,
        }).then((res) => setText(res.text));
    };

    const originalTexts = {
        title: "Manage Consent",
        doctorConsent:
            "Allow your doctor to use anonymised data for research/second opinion",
        generalConsent:
            "Allow use of anonymised data for app statistics, decision making",
        buttonText: "Update Consent",
    };
    const [title, setTitle] = useState(originalTexts.title);
    const [doctorConsent, setDoctorConsent] = useState(
        originalTexts.doctorConsent
    );
    const [generalConsent, setGeneralConsent] = useState(
        originalTexts.generalConsent
    );
    const [buttonText, setButtonText] = useState(originalTexts.buttonText);

    translateText(originalTexts.doctorConsent, setDoctorConsent);
    translateText(originalTexts.generalConsent, setGeneralConsent);
    translateText(originalTexts.title, setTitle);
    translateText(originalTexts.buttonText, setButtonText);

    const [isDoctorConsent, setIsDoctorConsent] = useState(false);
    const [isGeneralConsent, setIsGeneralConsent] = useState(false);

    return (
        <View>
            <Text>{title}</Text>
            <CheckBox
                title={doctorConsent}
                checked={isDoctorConsent}
                iconType="material-community"
                containerStyle={{
                    backgroundColor: AppStyles.colour.white,
                    width: "100%",
                }}
                onPress={() => setIsDoctorConsent(!isDoctorConsent)}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                checkedColor={AppStyles.colour.darkGreen}
                uncheckedColor={AppStyles.colour.darkGreen}
                textStyle={{
                    color: AppStyles.colour.textGreen,
                    fontFamily: AppStyles.font.Poppins_500Medium,
                }}
            />
            <CheckBox
                title={generalConsent}
                checked={isGeneralConsent}
                iconType="material-community"
                containerStyle={{
                    backgroundColor: AppStyles.colour.white,
                    width: "100%",
                }}
                onPress={() => setIsGeneralConsent(!isGeneralConsent)}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                checkedColor={AppStyles.colour.darkGreen}
                uncheckedColor={AppStyles.colour.darkGreen}
                textStyle={{
                    color: AppStyles.colour.textGreen,
                    fontFamily: AppStyles.font.Poppins_500Medium,
                }}
            />
            <CustomButton
                title={buttonText}
                accessibilityLabel={buttonText}
                onPress={async () => {
                    // navigation.navigate("Register", {
                    //     doctorConsent: isDoctorConsent,
                    //     generalConsent: isGeneralConsent,
                    // });
                }}
            />
        </View>
    );
};

export default ManageConsent;

const styles = StyleSheet.create({});
