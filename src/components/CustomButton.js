import { StyleSheet } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import { Button } from "@rneui/base";

const CustomButton = (props) => {
  // pass the following: onPress, buttonText, accessibilityLabel
  return (
    <Button
      onPress={props.onPress}
      title={props.title}
      accessibilityLabel={props.accessibilityLabel}
      buttonStyle={styles.customButton}
      titleStyle={{ fontFamily: "Poppins_500Medium" }}
      disabled={props.disabled}
      loading={props.loading}
    ></Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: AppStyles.colour.darkGreen,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 28,
    color: AppStyles.colour.textGreen,
    fontFamily: AppStyles.font.subHeadings,
    fontSize: AppStyles.size.subHeadings,
    fontWeight: AppStyles.weight.subHeadings,
  },
});
