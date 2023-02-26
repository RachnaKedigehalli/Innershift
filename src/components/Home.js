import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "./CustomButton";
import { AuthContext } from "./auth/AuthContext";

const Home = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <View
      style={{
        marginTop: 350,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Welcome {user.firstName} {user.lastName}!
      </Text>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Role assigned is {user.role}
      </Text>
      <CustomButton
        title="logout"
        onPress={async () => await logout()}
      ></CustomButton>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
