import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import AppStyles from "../AppStyles";
import { AuthContext } from "../components/auth/AuthContext";

const translate = require("google-translate-api-x");

const Menu = ({ navigation }) => {
  const { logout, appLanguage } = useContext(AuthContext);
  const translateText = (originalText, setText) => {
    translate(originalText, {
      from: "en",
      to: appLanguage,
    }).then((res) => setText(res.text));
  };
  const menuItems = [
    {
      title: "App Language",
      action: () => navigation.navigate("SelectLanguage"),
    },
    {
      title: "Manage Consent",
      action: () => navigation.navigate("ManageConsent"),
    },
    {
      title: "Delete Account",
      action: () => navigation.navigate("SelectLanguage"),
    },
    {
      title: "Logout",
      action: async () => await logout(),
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <View style={styles.menu}>
        {menuItems.map((item) => {
          const [title, setTitle] = useState(item.title);
          translateText(item.title, setTitle);
          return (
            <Pressable
              key={item.title}
              style={styles.menuItem}
              onPress={item.action}
            >
              <Text style={styles.menuItem.text}>{title}</Text>
              <Image
                style={styles.menuItem.arrow}
                source={require("../../assets/icons/chevron-right.png")}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppStyles.colour.white,
  },
  menu: {
    width: 220,
  },
  menuItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    text: {
      fontFamily: AppStyles.font.subHeadings,
      fontSize: 17,
      color: AppStyles.colour.darkGreen,
    },
    arrow: { width: 24, height: 24 },
  },
});
