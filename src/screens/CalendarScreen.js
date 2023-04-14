import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

const CalenderScreen = (props) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    return getFormatedDate(new Date(), "YYYY-MM-DD");
  });
  useEffect(() => {
    console.log("date: ", selectedDate);
  }, [selectedDate]);
  return (
    <View>
      <DatePicker
        options={{
          backgroundColor: "#090C08",
          textHeaderColor: "#FFA25B",
          textDefaultColor: "#F6E7C1",
          selectedTextColor: "#fff",
          mainColor: "#F4722B",
          textSecondaryColor: "#D6C7A1",
          borderColor: "rgba(122, 146, 165, 0.1)",
        }}
        current={getFormatedDate(new Date(), "YYYY-MM-DD")}
        selected={selectedDate}
        mode="calendar"
        minuteInterval={30}
        style={{ borderRadius: 10 }}
      ></DatePicker>
    </View>
  );
};

export default CalenderScreen;
