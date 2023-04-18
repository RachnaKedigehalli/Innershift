import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    Keyboard,
    Modal,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import CustomButton from "../CustomButton";
  import AppStyles from "../../AppStyles";
  import CustomTextInput from "../CustomTextInput";
  import { AuthContext } from "./AuthContext";
  import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
  import { FlatList } from "react-native-gesture-handler";
import CustomButton2 from "../CustomButton2";
  
  const Referral = ({ route, navigation }) => {
    const [enterReferralText, setEnterReferralText] = useState("Did a doctor refer you to InnerShift");
  
    const [loginText, setLoginText] = useState("Continue");
    const [referral ,setReferral] = useState("");
    const [skipText, setSkipText] = useState("Skip");
    const { email, password, firstName, lastName,dob,gender,phoneNumber } = route.params;
    const { register } = useContext(AuthContext);
    const [errorStatus, setErrorStatus] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
    const validate = (text) => {
    //   let reg = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    //   if (reg.test(text) === false) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    };
  
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
              {enterReferralText}
            </Text>
  
            <View
              style={{
                marginTop: Platform.OS == "android" ? 20 : 25,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: AppStyles.colour.grey }}>Enter the code given to you by the doctor</Text>
              <View
                style={{
                  marginTop: 19,
                }}
              >
                <CustomTextInput
                  onChangeText={setReferral}
                  value={referral}
                  placeholder="Referral code"
                />
  
              </View>
              <View
                style={{
                  marginTop: 30,
                }}
              >
                <CustomButton
                  title={loginText}
                  accessibilityLabel={loginText}
                  onPress={async () => {
                    navigation.navigate("BaselineCheckpoint", {
                      email: email,
                      password: password,
                      firstName: firstName,
                      lastName: lastName,
                      dob:dob,
                      gender:gender.id,
                      phoneNumber:phoneNumber,
                      referral:referral
                    });
                    // await register(
                    //   email,
                    //   firstName,
                    //   lastName,
                    //   password,
                    //   dob,
                    //   gender,
                    //   phoneNumber,
                    //   (referral.length!=0?1:0)
                    // );
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 30,
                }}
              >
                <CustomButton2
                  title={skipText}
                  accessibilityLabel={skipText}
                  onPress={async () => {
                    navigation.navigate("BaselineCheckpoint", {
                      email: email,
                      password: password,
                      firstName: firstName,
                      lastName: lastName,
                      dob:dob,
                      gender:gender.id,
                      phoneNumber:phoneNumber,
                      referral:referral
                    });
                    // await register(
                    //   email,
                    //   firstName,
                    //   lastName,
                    //   password,
                    //   dob,
                    //   gender,
                    //   phoneNumber,
                    //   (referral.length!=0?1:0)
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
  
  export default Referral;
  
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
  