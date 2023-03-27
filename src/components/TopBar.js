import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

const TopBar = ({ showBack, navigation }) => {
    return (
        <View style={styles.topBar}>
            {showBack ? (
                <Image
                    style={styles.back}
                    source={require("../../assets/icons/chevron-left.png")}
                    onPress={navigation.goBack}
                />
            ) : (
                // <Icon name="arrow-left" onPress={navigation.goBack} />
                <Image
                    style={styles.menu}
                    source={require("../../assets/icons/menu_hamburger.png")}
                    onPress={() => navigation.navigate("home")}
                />
                // <Icon name="menu" onPress={() => navigation.navigate("home")} />
            )}
            <Image
                style={styles.logo}
                source={require("../../assets/images/logo.png")}
            />
            <Image
                style={styles.profile_picture}
                source={require("../../assets/images/dummy/profile3.jpg")}
            />
        </View>
    );
};

export default TopBar;

const styles = StyleSheet.create({
    topBar: {
        paddingTop: StatusBar.currentHeight + 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
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
