import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../components/CustomTextInput";
import AppStyles from "../AppStyles";
import { Icon } from "@rneui/base";
import searchIcon from "../../assets/icons/MagnifyingGlass.png";
import DoctorCard from "../components/DoctorCard";

const SearchDoctor = (props) => {
    const [searchString, setSearchString] = useState("");
    const [searchPlaceholder, setSearchPlaceholder] = useState(
        "Search for a doctor"
    );
    return (
        <View
            style={{
                marginTop: 40,
                padding: 0,
                margin: 0,
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* <Text style={{ fontWeight: "bold" }}>SearchScreen here </Text> */}
            <View style={styles.input}>
                <TextInput
                    onChangeText={setSearchString}
                    value={searchString}
                    placeholder={searchPlaceholder}
                    keyboardType="text"
                />
                <Image source={searchIcon}></Image>
            </View>
            <View
                style={{
                    marginTop: 20,
                }}
            >
                {
                    <DoctorCard
                        name="Dr. Kedigehalli"
                        qualifications="MBBS, MD, PhD"
                        navigation={props.navigation}
                    />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: AppStyles.colour.textGreen,
        borderColor: AppStyles.colour.darkGreen,
        borderWidth: 2,
        width: "80%",
        paddingTop: Platform.OS == "android" ? 7 : 12,
        paddingBottom: Platform.OS == "android" ? 10 : 15,
        paddingLeft: 20,
        borderRadius: 28,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
    },
});

export default SearchDoctor;
