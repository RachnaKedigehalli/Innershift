import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

const CustomTextInput = (props) => {
  // pass the following: onChangeText, value, placeholder, keyboardType
  return (
    <TextInput
      style={styles.input}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      onBlur={() => Keyboard.dismiss()}
      selectionColor={AppStyles.colour.textGreen}
      placeholderTextColor={AppStyles.colour.darkGrey}
      cursorColor={AppStyles.colour.textGreen}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    color: AppStyles.colour.textGreen,
    borderColor: AppStyles.colour.darkGreen,
    borderWidth: 2,
    width: 300,
    paddingTop: Platform.OS == "android" ? 10 : 15,
    paddingBottom: Platform.OS == "android" ? 10 : 15,
    paddingLeft: 20,
    borderRadius: 20,
  },
});
