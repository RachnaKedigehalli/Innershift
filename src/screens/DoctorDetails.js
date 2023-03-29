import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import dp from "../../assets/images/dummy/profile1.jpg";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";

const DoctorDetails = (props) => {
  // renders
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={dp}
            style={{
              borderRadius: 100,
              width: 80,
              height: 80,
            }}
          />
          <Text
            style={{
              marginTop: 15,
              fontSize: 25,
              fontWeight: "bold",
              color: AppStyles.colour.darkGreen,
            }}
          >
            Dr. Rachna Kedigehalli
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "#5EA49B",
            }}
          >
            MBBS, MD, PhD
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: "regular",
            }}
          >
            HoD, Dept. Psychiatry, Narayana Hospital
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: AppStyles.colour.darkGreen,
              }}
            >
              Bio:{" "}
            </Text>
            Erving won three championships, four Most Valuable Player awards,
            and three scoring titles with the ABA's Virginia Squires.
          </Text>
        </View>
        <CustomButton
          title={"Consult"}
          accessibilityLabel={"Consult"}
          //   loading={isLoading}
          onPress={async () => {}}
        />
      </View>
    </View>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
