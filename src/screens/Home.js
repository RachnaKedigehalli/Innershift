import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../components/auth/AuthContext";
import { Image } from "@rneui/base";
import modules from "../data/modules";
import Module from "../components/Module";

const Home = () => {
  const { logout, user } = useContext(AuthContext);
  // console.log("Modules :",modules[0].heading)
  return (
    // <View
    //   style={{
    //     marginTop: 350,
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text
    //     style={{
    //       fontSize: 20,
    //     }}
    //   >
    //     Welcome {user.firstName} {user.lastName}!
    //   </Text>
    //   <Text
    //     style={{
    //       fontSize: 20,
    //     }}
    //   >
    //     Role assigned is {user.role}
    //   </Text>
    //   <CustomButton
    //     title="logout"
    //     onPress={async () => await logout()}
    //   ></CustomButton>
    // </View>
    <View style={{justifyContent:"space-around",flexDirection:"column"}}>
      <Image source={require("./../data/banner.jpeg")} style={{height:150,width:"100%"}}/>
      <Text style={{ fontWeight:"bold" }}>Tasks for the day</Text>
      <FlatList 
        data={modules}
        renderItem={(item) => {
          console.log("ITEM: ",item);
          const h=item.item.heading;
          const img=item.item.imageUri;
          const desc=item.item.description;
          return <Module heading={h} description={desc} imageUri={img} />}
        }
        keyExtractor={(item) => item.heading}
      >
      </FlatList>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
