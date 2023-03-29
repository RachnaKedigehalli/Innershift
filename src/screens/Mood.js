import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AppStyles from "../AppStyles";
import CustomButton from "../components/CustomButton";
import MoodCard from "../components/MoodCard";

const Mood = ({ navigation }) => {
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
  const [moodQues, setmoodQues] = useState("How are you feeling today?");
  const [buttonText, setButtonText] = useState("Get Started");

  const handleSubmitMood = () => {
    // api call to set mood for day
    console.log("Submitted" + mood);
    navigation.navigate("Home");
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
                  onPress={() => setMood(item.name)}
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
