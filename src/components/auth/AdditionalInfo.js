import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
import CustomTextInput from "../CustomTextInput";
import { AuthContext } from "./AuthContext";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const translate = require("google-translate-api-x");

const AdditionalInfo = ({ route, navigation }) => {
  const { register, appLanguage } = useContext(AuthContext);
  const { email, password, firstName, lastName } = route.params;

  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };

  const originalTexts = {
    enterAddInfo: "Some additional info",
    loginText: "Continue",
  };
  const [enterAddInfo, setEnterAddInfo] = useState(originalTexts.enterAddInfo);
  const [loginText, setLoginText] = useState(originalTexts.loginText);

  translateText(originalTexts.enterAddInfo, setEnterAddInfo);
  translateText(originalTexts.loginText, setLoginText);

  const [gender, setGender] = useState({ name: "" });
  const [showList, setShowList] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const genders = [
    { name: "Male", id: 0 },
    { name: "Female", id: 1 },
    { name: "Others", id: 2 },
  ];
  const [dob, setDob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const validate = (text) => {
    let reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: AppStyles.colour.white,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Modal
        animationType="fade"
        transparent={true}
        presentationStyle={"overFullScreen"}
        visible={modalVisible}
        onRequestClose={() => {
          //   setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <DatePicker
            // minimumDate="1920-01-01"
            options={{
              backgroundColor: "#f1f1f1",
              textHeaderColor: AppStyles.colour.darkGreen,
              textDefaultColor: "#000000",
              selectedTextColor: "#fff",
              mainColor: AppStyles.colour.darkGreen,
              textSecondaryColor: "#0f0f0f",
              borderColor: "rgba(122, 146, 165, 0.1)",
              textFontSize: 14,
              textHeaderFontSize: 17,
            }}
            current={getFormatedDate(new Date(), "YYYY-MM-DD")}
            selected={dob}
            mode="calendar"
            minuteInterval={30}
            style={{ borderRadius: 20 }}
            onDateChange={async (dateString) => {
              setDob(dateString.replace(/\//g, "-"));
              await delay(200);
              setModalVisible(false);
            }}
          ></DatePicker>
        </View>
      </Modal>
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
            {enterAddInfo}
          </Text>

          <View
            style={{
              marginTop: Platform.OS == "android" ? 20 : 25,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomTextInput
              // onChangeText={setPassword}
              value={dob}
              onPressOut={() => setModalVisible(true)}
              placeholder="Date of birth (YYYY-MM-DD)"
              secureTextEntry={false}
            />
            <View
              style={{
                marginTop: 19,
              }}
            >
              <CustomTextInput
                value={gender.name}
                placeholder="Gender"
                secureTextEntry={false}
                onFocus={() => {
                  // Keyboard.dismiss();
                  setShowList(true);
                }}
                onPressOut={() => {
                  // Keyboard.dismiss();
                  setShowList(true);
                }}
                onBlur={() => {
                  setShowList(false);
                }}
                showSoftInputOnFocus={false}
              />

              {showList ? (
                <View
                  style={{
                    marginLeft: 0,
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    // paddingTop: 10,
                    borderColor: AppStyles.colour.darkGreen,
                  }}
                >
                  {genders.map((gender, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          paddingHorizontal: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomWidth: 0.3,
                          borderColor: AppStyles.colour.darkGrey,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setGender(gender);
                            setShowList(false);
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: "500",
                              color: AppStyles.colour.textGreen,
                            }}
                          >
                            {gender.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <></>
              )}
              <View
                style={{
                  marginTop: 19,
                }}
              >
                <CustomTextInput
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                  placeholder="Phone number"
                  secureTextEntry={false}
                  error={validate(phoneNumber)}
                  keyboardType="phone-pad"
                />
                {phoneNumber != "" && !validate(phoneNumber) ? (
                  <View
                    style={{
                      paddingLeft: 8,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ color: "red" }}>
                      Entered phone number is invalid
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
              }}
            >
              <CustomButton
                disabled={
                  dob == null ||
                  gender == { name: "" } ||
                  phoneNumber == "" ||
                  !validate(phoneNumber)
                }
                title={loginText}
                accessibilityLabel={loginText}
                onPress={async () => {
                  // console.log("checking gender in add info ", gender.id);
                  // console.log("firstName in add: ", route.params.firstName);
                  // console.log("lastName in add: ", route.params.lastName);
                  navigation.navigate("Referral", {
                    ...route.params,
                    dob: dob,
                    gender: gender.id,
                    phoneNumber: phoneNumber,
                  });
                  // await register(
                  //   email,
                  //   firstName,
                  //   lastName,
                  //   password,
                  //   dob,
                  //   gender.id,
                  //   phoneNumber
                  // );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdditionalInfo;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    padding: 50,
    height: "100%",
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
  },
});
