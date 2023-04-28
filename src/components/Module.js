import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Image } from "@rneui/base";

const Module = (props) => {
  // console.log("module is called!");
  // console.log("Props ",props);
  const scheduled = new Date(props.module.moduleAssignment.scheduled);
  const today = props.date;
  // console.log(!module.moduleAssignment.locked);
  // console.log("scheduled", scheduled.toDateString());
  if (scheduled.toDateString() == today.toDateString()) {
    console.log("Yo, its today", props.module.module.moduleId);
    if (!props.module.moduleAssignment.locked) {
      console.log("not locked");
      return (
        <Pressable
          onPress={() => {
            props.navigation.navigate("ModuleProgress", {
              module: props.module,
              startTime: new Date(),
            });
          }}
          key={props.index}
        >
          <ModuleCard module={props.module} isLocked={false} />
        </Pressable>
      );
    } else {
      return (
        <ModuleCard module={props.module} isLocked={true} key={props.index} />
      );
    }
  }

  // return (
  //   <View style={{flexDirection:"row", justifyContent:"space-around"}} >
  //       {/* <Image source={require('./../data/banner.jpeg') }/> */}
  //       <Image source={{ uri : props.imageUri }} style={{height:80, width:80}}/>
  //       <View style={{flexDirection:"column",justifyContent:"space-between", flex:1}}>
  //           <Text style={{fontWeight:"bold"}}>{props.heading}</Text>
  //           <ScrollView style={{height:100}}>
  //               <Text >{props.description}</Text>
  //           </ScrollView>
  //       </View>
  //   </View>
  // )
};

export default Module;
