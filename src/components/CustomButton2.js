
import { StyleSheet } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";
import { Button } from "@rneui/base";

const CustomButton2 = (props) => {
  // pass the following: onPress, buttonText, accessibilityLabel
  return (
    <Button
      onPress={props.onPress}
      title={props.title}
      accessibilityLabel={props.accessibilityLabel}
      buttonStyle={styles.customButton}
      titleStyle={{ fontFamily: "Poppins_500Medium",color:AppStyles.colour.textGreen }}
      disabled={props.disabled}
      loading={props.loading}
    ></Button>
  );
};

export default CustomButton2;

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: AppStyles.colour.lightGreen,
    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 28,
    color: AppStyles.colour.grey,
    fontFamily: AppStyles.font.subHeadings,
    fontSize: AppStyles.size.subHeadings,
    fontWeight: AppStyles.weight.subHeadings,
  },
});
