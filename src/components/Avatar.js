import { StyleSheet, Image } from "react-native";
import React from "react";

const Avatar = ({ imageSrc }) => {
    return <Image source={imageSrc} style={styles.avatar}></Image>;
};

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        width: 43,
        height: 43,
        borderRadius: 43 / 2,
    },
});
