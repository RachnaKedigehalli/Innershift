import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "./CustomButton";
import { AuthContext } from "../AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>Home</Text>
      <CustomButton
        title="logout"
        onPress={async () => await logout()}
      ></CustomButton>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
