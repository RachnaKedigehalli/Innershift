import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Pressable,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppStyles from "../AppStyles";
const TopBar = ({ showBack, navigation, onBack, showProfile, showLogo }) => {
  console.log(navigation);
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.topBar, paddingTop: insets.top }}>
      {showBack ? (
        <Pressable onPress={onBack ? onBack : navigation.goBack}>
          <Image
            style={styles.back}
            source={require("../../assets/icons/chevron-left.png")}
          />
        </Pressable>
      ) : (
        // <Icon name="arrow-left" onPress={navigation.goBack} />
        <Pressable onPress={() => navigation.navigate("Menu")}>
          <Image
            style={styles.menu}
            source={require("../../assets/icons/menu_hamburger.png")}
          />
        </Pressable>
        // <Icon name="menu" onPress={() => navigation.navigate("home")} />
      )}
      {showLogo ? (
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      ) : (
        <></>
      )}
      {showProfile ? (
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            style={styles.profile_picture}
            source={require("../../assets/images/dummy/profile3.jpg")}
          />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  topBar: {
    // paddingTop: StatusBar.currentHeight + 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: AppStyles.colour.white,
    paddingBottom: 10,
  },
  back: {
    width: 30,
    height: 30,
  },
  menu: {
    width: 30,
    height: 21,
    margin: 2,
    resizeMode: "contain",
  },
  logo: {
    height: 32,
    resizeMode: "contain",
  },
  profile_picture: {
    width: 34,
    height: 34,
    borderRadius: 16,
  },
});
