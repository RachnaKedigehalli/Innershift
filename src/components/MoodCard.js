import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import AppStyles from "../AppStyles";

const MoodCard = (props) => {
    return (
        <TouchableOpacity
            style={
                props.currentMood == props.name
                    ? styles(props).active
                    : styles(props).unactive
            }
            onPress={props.onPress}
        >
            <View style={styles(props).card}>
                <View style={styles(props).container}>
                    <Image style={styles(props).image} source={props.image} />
                </View>
                <Text style={styles(props).text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MoodCard;

const styles = (props) =>
    StyleSheet.create({
        active: {
            backgroundColor: AppStyles.colour.lightGreen,
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
            // padding: 5,
            paddingTop: 7,
            paddingBottom: 3,
            paddingRight: 5,
            paddingLeft: 5,
        },
        unactive: {
            marginTop: 20,
            marginBottom: 20,
            paddingTop: 7,
            paddingBottom: 3,
            paddingRight: 5,
            paddingLeft: 5,
        },
        card: {
            width: 85,
            flexDirection: "column",
            alignItems: "center",
            // overflow: "visible",
        },
        container: {
            width: 60,
            height: 60,
            backgroundColor: props.bgColor,
            borderRadius: 60 / 2,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        image: {
            width: 35,
            height: 35,
            resizeMode: "contain",
        },
        text: {
            marginTop: 8,
            fontSize: 11,
            textAlign: "center",
            fontFamily: AppStyles.font.poppinsBold,
        },
    });
