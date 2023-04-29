import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";

const ManageConsent = () => {
  return (
    <View>
      <Text>ManageConsent</Text>
      <Text>
        Allow your doctor to use anonymised data for research/second opinion
      </Text>
      <Text>
        Allow use of anonymised data for app statistics, decision making
      </Text>
      {/* <CustomButton /> */}
    </View>
  );
};

export default ManageConsent;

const styles = StyleSheet.create({});
