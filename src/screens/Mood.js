import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";
import MoodCard from "../components/MoodCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_APP_URL } from "../../config";

const Mood = (props) => {
  const moods = [
    {
      name: "Energetic",
      image: require("../../assets/images/moods/energetic.png"),
      bgColor: "#FFCE85",
    },
    {
      name: "Happy",
      image: require("../../assets/images/moods/happy.png"),
      bgColor: "#FEF285",
    },
    {
      name: "Calm",
      image: require("../../assets/images/moods/calm.png"),
      bgColor: "#8AC8C2",
    },
    {
      name: "Mood swings",
      image: require("../../assets/images/moods/mood_swings.png"),
      bgColor: "#D0E06B",
    },
    {
      name: "Sad",
      image: require("../../assets/images/moods/sad.png"),
      bgColor: "#E2B68D",
    },
    {
      name: "Irritated",
      image: require("../../assets/images/moods/irritated.png"),
      bgColor: "#C5784C",
    },
  ];

  const [mood, setMood] = useState("");
  const [moodId, setMoodId] = useState();
  const [moodQues, setmoodQues] = useState("How are you feeling today?");
  const [buttonText, setButtonText] = useState("Get Started");

  useEffect(() => {
    const isMoodSet = async () => {
      let token = await AsyncStorage.getItem("userToken");
      let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const bodyParameters = {
        patientId: await userDetails.id,
      };
      await axios
        .post(`${BASE_APP_URL}/isMoodSet`, bodyParameters, config)
        .then(async (res) => {
          console.log("isMoodSet: ", res.data);
          if (res.data) {
            props.setIsMoodSet(true);
          }
        })
        .catch(console.log);
    };
    isMoodSet();
  });

  const handleSubmitMood = () => {
    // api call to set mood for day
    const apiCall = async () => {
      let token = await AsyncStorage.getItem("userToken");
      let userDetails = JSON.parse(await AsyncStorage.getItem("userDetails"));
      console.log("token", token);
      console.log("userDetails", userDetails);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let yourDate = new Date();
      yourDate.toISOString().split("T")[0];
      console.log("date: ", yourDate);
      const bodyParameters = {
        mood: moodId,
        date: yourDate,
        patientId: await userDetails.id,
      };
      console.log("patient_id", bodyParameters.patientId);

      axios
        .post(`${BASE_APP_URL}/addMood`, bodyParameters, config)
        .then(console.log)
        .catch(console.log);
    };
    apiCall();
    console.log("Submitted " + mood);
    props.setIsMoodSet(true);
  };

  return (
    <>
      <TopBar showBack={false}></TopBar>
      <View style={styles.page}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.moodQues}>{moodQues}</Text>
          <View style={styles.moodCards}>
            {moods.map((item, i) => {
              return (
                <MoodCard
                  key={item.name}
                  name={item.name}
                  image={item.image}
                  bgColor={item.bgColor}
                  currentMood={mood}
                  onPress={() => {
                    setMood(item.name);
                    setMoodId(i);
                  }}
                />
              );
            })}
          </View>
        </View>
        <CustomButton
          onPress={() => handleSubmitMood()}
          title={buttonText}
          accessibilityLabel={buttonText}
          disabled={mood == ""}
        />
      </View>
    </>
  );
};

export default Mood;

const styles = StyleSheet.create({
  moodQues: {
    color: AppStyles.colour.textGreen,
    fontFamily: AppStyles.font.subHeadings,
    fontSize: 24,
    width: 240,
    textAlign: "center",
  },
  page: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 90,
    justifyContent: "center",
  },
  moodCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 290,
    justifyContent: "space-between",
    marginTop: 36,
    marginBottom: 90,
  },
});
