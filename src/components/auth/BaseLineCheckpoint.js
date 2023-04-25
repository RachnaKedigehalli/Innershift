import {
    View,
    Text,
    Dimensions,
    ScrollView,
    StyleSheet,
    Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AppStyles from "../../AppStyles";
import { AuthContext } from "./AuthContext";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../CustomButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const translate = require("google-translate-api-x");

const BaseLineCheckpoint = ({ route, navigation }) => {
    const { register, appLanguage } = useContext(AuthContext);
    const {
        email,
        password,
        firstName,
        lastName,
        dob,
        gender,
        phoneNumber,
        referral,
    } = route.params;
    const insets = useSafeAreaInsets();

    const translateText = (originalText, setText) => {
        useEffect(() => {
            translate(originalText, {
                from: "en",
                to: appLanguage,
            }).then((res) => setText(res.text));
        }, []);
    };

    const originalTexts = {
        baseLineCheckpointText: "Baseline Checkpoint",
        baselineCheckpointQuestion:
            " Help us identify the sections that may be personally relevant for you: All of us may experience ups and downs in our moods but normally these are brief periods lasting for a few hours to a few days at the most.\nPlease answer the following questions keeping in mind any difficulties which you have noticed for more than a week.",
        checkboxQuestions: [
            "My activity-level is lower than usual. / I find that I am spending quite a bit of my time doing nothing.",
            "I have noticed that I am quite critical of myself / I keep passing critical comments at myself in my head.",
            "I am getting frequent negative thoughts about my situation/my life in general.",
            "I am not reaching out to others for support.",
            "I keep worrying and getting stressed.",
            "I feel that I have hardly any control over my life-situation.",
            "I feel tense/anxious and restless several times.",
            "My sleep is significantly disturbed.",
            "I occasionally get thoughts about living no more.",
            "I think I may drop this self-care program mid-way/may not start.",
        ],
    };

    const [baseLineCheckpointText, setBaseLineCheckpointText] = useState(
        originalTexts.baseLineCheckpointText
    );
    const [baselineCheckpointQuestion, setBaselineCheckpointQuestion] =
        useState(originalTexts.baselineCheckpointQuestion);
    const [checkboxQuestions, setCheckboxQuestions] = useState(
        originalTexts.checkboxQuestions
    );

    translateText(
        originalTexts.baseLineCheckpointText,
        setBaseLineCheckpointText
    );
    translateText(
        originalTexts.baselineCheckpointQuestion,
        setBaselineCheckpointQuestion
    );
    useEffect(() => {
        let translatedQues = [];
        originalTexts.checkboxQuestions.forEach((element) => {
            translate(element, {
                from: "en",
                to: appLanguage,
            }).then((res) => translatedQues.push(res.text));
        });
        setCheckboxQuestions(translatedQues);
    }, []);

    const [baselineScore, setBaselineScore] = useState(0);
    const [pointsPerCheckbox, setPointsPerCheckbox] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    // const [checkboxesSelected,setCheckboxesSelected] = useState([false,false,false,false,false,false,false,false,false,false,]);
    const [checkbox1Selected, setCheckbox1Selected] = useState(false);
    const [checkbox2Selected, setCheckbox2Selected] = useState(false);
    const [checkbox3Selected, setCheckbox3Selected] = useState(false);
    const [checkbox4Selected, setCheckbox4Selected] = useState(false);
    const [checkbox5Selected, setCheckbox5Selected] = useState(false);
    const [checkbox6Selected, setCheckbox6Selected] = useState(false);
    const [checkbox7Selected, setCheckbox7Selected] = useState(false);
    const [checkbox8Selected, setCheckbox8Selected] = useState(false);
    const [checkbox9Selected, setCheckbox9Selected] = useState(false);
    const [checkbox0Selected, setCheckbox0Selected] = useState(false);

    const updateBaselineScore = async () => {
        let total = 0;
        pointsPerCheckbox.forEach((val, idx) => {
            let checks = [
                checkbox0Selected,
                checkbox1Selected,
                checkbox2Selected,
                checkbox3Selected,
                checkbox4Selected,
                checkbox5Selected,
                checkbox6Selected,
                checkbox7Selected,
                checkbox8Selected,
                checkbox9Selected,
            ];
            if (checks[idx]) {
                total += val;
            }
        });
        await setBaselineScore(total);
        console.log("baseline score ", total);
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: AppStyles.colour.white,
                paddingTop: insets.top,
                width: "100%",
                justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.topBar}>
                <Image
                    style={styles.logo}
                    source={require("../../../assets/images/logo.png")}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 80,
                }}
            >
                <View
                    style={{
                        borderRadius: 12,
                        marginTop: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                        marginHorizontal: 20,
                        backgroundColor: AppStyles.colour.lightGreen,
                    }}
                >
                    <Text
                        style={{
                            fontSize: Platform.OS == "android" ? 24 : 27,
                            fontWeight: "600",
                            color: AppStyles.colour.textGreen,
                            // textAlign: "center",
                            fontFamily: AppStyles.font.subHeadings,
                            marginBottom: 25,

                            textAlign: "center",
                        }}
                    >
                        {baseLineCheckpointText}
                    </Text>
                    <Text
                        style={{
                            fontFamily: AppStyles.font.poppinsRegular,
                            color: AppStyles.colour.textGreen,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                            textAlign: "justify",
                        }}
                    >
                        {baselineCheckpointQuestion}
                    </Text>
                </View>
                {/* view for the checkboxes */}
                <View
                    style={{
                        width: "100%",
                        alignSelf: "flex-start",
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                >
                    {/* {checkboxQuestions.map((val,idx) => {
                return (<CheckBox 
                    key={idx}
                    title={val}
                    checked={checkboxesSelected[idx]}
                    iconType="material-community"
                    // containerStyle={{
                    //   backgroundColor: AppStyles.colour.white,
                    //   width: "100%",
                    // }}
                    onPress={async() => {
                        let newCheckboxesSelected = checkboxesSelected;
                        console.log("old checkboxes = ",checkboxesSelected);
                        newCheckboxesSelected[idx]=!checkboxesSelected[idx];
                        await setCheckboxesSelected(newCheckboxesSelected);
                        console.log("new checkboxes = ", checkboxesSelected);
                    }}
                    checkedIcon={"checkbox-marked"}
                    uncheckedIcon={"checkbox-blank-outline"}
                    checkedColor={AppStyles.colour.darkGreen}
                    uncheckedColor={AppStyles.colour.darkGreen}
                    textStyle={{
                      color: AppStyles.colour.grey,
                      fontFamily: AppStyles.font.Poppins_500Medium,
                    }}
                >

                </CheckBox>);
            })} */}
                    <View
                        style={{
                            padding: 15,
                        }}
                    >
                        <View>
                            <CheckBox
                                title={checkboxQuestions[0]}
                                checked={checkbox0Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[0]=!checkboxesSelected[0];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox0Selected(!checkbox0Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[1]}
                                checked={checkbox1Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[1]=!checkboxesSelected[1];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox1Selected(!checkbox1Selected);

                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>

                        <View>
                            <CheckBox
                                title={checkboxQuestions[2]}
                                checked={checkbox2Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[2]=!checkboxesSelected[2];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox2Selected(!checkbox2Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[3]}
                                checked={checkbox3Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[3]=!checkboxesSelected[3];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox3Selected(!checkbox3Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[4]}
                                checked={checkbox4Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[4]=!checkboxesSelected[4];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox4Selected(!checkbox4Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[5]}
                                checked={checkbox5Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[5]=!checkboxesSelected[5];
                                    setCheckbox5Selected(!checkbox5Selected);
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[6]}
                                checked={checkbox6Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[6]=!checkboxesSelected[6];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                    setCheckbox6Selected(!checkbox6Selected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[7]}
                                checked={checkbox7Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[7]=!checkboxesSelected[7];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox7Selected(!checkbox7Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[8]}
                                checked={checkbox8Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[8]=!checkboxesSelected[8];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    setCheckbox8Selected(!checkbox8Selected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                        <View>
                            <CheckBox
                                title={checkboxQuestions[9]}
                                checked={checkbox9Selected}
                                iconType="material-community"
                                onPress={async () => {
                                    setCheckbox9Selected(!checkbox9Selected);
                                    // let newCheckboxesSelected = checkboxesSelected;
                                    // console.log("old checkboxes = ",checkboxesSelected);
                                    // newCheckboxesSelected[9]=!checkboxesSelected[9];
                                    // await setCheckboxesSelected(newCheckboxesSelected);
                                    // console.log("new checkboxes = ", checkboxesSelected);
                                }}
                                checkedIcon={"checkbox-marked"}
                                uncheckedIcon={"checkbox-blank-outline"}
                                checkedColor={AppStyles.colour.darkGreen}
                                uncheckedColor={AppStyles.colour.darkGreen}
                                textStyle={{
                                    color: AppStyles.colour.textGreen,
                                    fontFamily:
                                        AppStyles.font.Poppins_500Medium,
                                }}
                            ></CheckBox>
                        </View>
                    </View>
                </View>
                <CustomButton
                    title="Register"
                    accessibilityLabel={"Register"}
                    onPress={async () => {
                        // navigation.navigate("Register");
                        await updateBaselineScore();
                        // register()
                        await register(
                            email,
                            firstName,
                            lastName,
                            password,
                            dob,
                            gender,
                            phoneNumber,
                            referral,
                            baselineScore
                        );
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default BaseLineCheckpoint;

const styles = StyleSheet.create({
    topBar: {
        // paddingTop: StatusBar.currentHeight + 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: AppStyles.colour.white,
    },

    logo: {
        height: 40,
        resizeMode: "contain",
    },
});
