import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import dp from "../../assets/images/dummy/profile1.jpg";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";

const DoctorDetails = (props) => {
  const consultDoctor = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      patientId: userDetails.id,
      doctorId: props.doctor[0],
    };
    axios
      .post(`${BASE_APP_URL}/addConsultation`, bodyParameters, config)
      .then((res) => {
        console.log(res.data);
        AsyncStorage.setItem(
          "consultation",
          JSON.stringify({
            ...res.data,
            doctor: props.doctor,
          })
        );
        props.navigation.navigate("chats", {
          doctor: props.doctor,
        });
      })
      .catch(console.log);
  };

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
            {`Dr. ${props.doctor[4]} ${props.doctor[5]}`}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              fontWeight: "bold",
              color: "#5EA49B",
            }}
          >
            {`${props.doctor[3]}`}
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: "regular",
            }}
          >
            {`${props.doctor[2]}`}
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
          onPress={async () => {
            consultDoctor();
          }}
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
