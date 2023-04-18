import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../CustomButton";
import AppStyles from "../../AppStyles";
const TandC = ({ navigation }) => {
  const [TandCHeading, setTandCHeading] = useState(
    "Please read the terms of use carefully"
  );
  const [TandCText, setTandCText] =
    useState(`The delimited scope and purpose of the Push-D program 
    The Information contained in, or accessed through, this website is for your general information and Self-development use only and
    is not intended to be used as medical advice and should not be used to diagnose, treat, cure or prevent any medical condition.
    The diagnosis and treatment of clinical depression and anxiety requires a medical practitioner or qualified mental health
    practitioner. People seeking a diagnosis or treatment of depression, anxiety or other mental health disorders should consult a
    medical practitioner or mental health professional. The website is not designed to treat common mental health disorders. It is
    merely designed to help people to help themselves to cope better with depressive symptoms. In a general sense, people are likely
    to find the information on self-care to be useful; however this is NOT a substitute for seeking professional consultation and advice.
    There is no claim made that the material contained on this website is likely to be of help for everyone who uses this website.
    If you have a mental health condition or if you are likely to have a diagnosis of mental health condition, you should seek
    professional consultation from a trained mental health professional or a medical consultant.
    If at the time of registering for this self-care program or at any point of time after registering for this self-care program, you notice
    that you are getting thoughts about harming yourself or harming another person, you should not use or continue to use this
    Program but instead should seek urgent medical advice. If Push-D becomes aware that you are experiencing suicidal thoughts or
    thoughts of harming yourself or any other person in any way, it would strongly recommend you to immediately seek medical help
    through a direct/face-to face contact with any trained professional of your choice. If you so desire, the Push-D team will try its best
    to provide you some information regarding the availability of centers/trained mental health professional in your region, if such
    information is available to the Push-D team.
    We strongly recommend that you always seek the advice of a medical practitioner or qualified mental health practitioner for any
    questions regarding personal health or medical conditions. We strongly recommend that you never disregard, avoid or delay just
    obtaining medical advice from your medical practitioner or qualified mental health practitioner just because of something you have
    read on this webite.
    If you think you may have a medical emergency, call a local help-line/reach out to an emergency service.
    NIMHANS does not recommend or endorse any specific tests, providers (including, but not limited to, hospitals and physicians),
    products, procedures, or other information that may be mentioned on the website. Any opinions expressed on the website are the
    opinions of the individual authors, not of NIMHANS.`);

  const [isSelected, setIsSelected] = useState(false);
  const [acceptText, setAcceptText] = useState("I agree to the terms");
  const [continueText, setContinueText] = useState("Continue");

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: AppStyles.colour.white,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 81,
          justifyContent: "center",
          // gap: 57,
          paddingHorizontal: 35,
          paddingBottom: 55,
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
              // textAlign: "center",
              fontFamily: AppStyles.font.subHeadings,
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            {TandCHeading}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: AppStyles.font.poppinsRegular,
                color: AppStyles.colour.textGreen,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {TandCText}
            </Text>
            <View
              style={{
                width: "100%",
                alignSelf: "flex-start",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <CheckBox
                title={acceptText}
                checked={isSelected}
                iconType="material-community"
                containerStyle={{
                  backgroundColor: AppStyles.colour.white,
                  width: "100%",
                }}
                onPress={() => setIsSelected(!isSelected)}
                checkedIcon={"checkbox-marked"}
                uncheckedIcon={"checkbox-blank-outline"}
                checkedColor={AppStyles.colour.darkGreen}
                uncheckedColor={AppStyles.colour.darkGreen}
                textStyle={{
                  color: AppStyles.colour.textGreen,
                  fontFamily: AppStyles.font.Poppins_500Medium,
                }}
              />
            </View>
            <CustomButton
              title={continueText}
              accessibilityLabel={continueText}
              disabled={!isSelected}
              onPress={async () => {
                navigation.navigate("Register");
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TandC;

const styles = StyleSheet.create({});
