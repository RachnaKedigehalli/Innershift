import { View, Text, Image } from "react-native";
import doctor from "../../assets/images/dummy/profile1.jpg";
import React from "react";
import AppStyles from "../AppStyles";

const DoctorCard = (props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: 300,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: AppStyles.colour.darkGrey,
        paddingVertical: 10,
      }}
      onPress
    >
      <Image
        source={doctor}
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
          overflow: "hidden",
        }}
      ></Image>
      <View
        style={{
          width: "100%",
          marginHorizontal: 20,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: AppStyles.colour.darkGreen,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {props.name}
        </Text>
        <Text>{props.qualifications}</Text>
      </View>
    </View>
  );
};

export default DoctorCard;
