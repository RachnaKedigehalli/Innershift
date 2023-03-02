import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'

const Module = (props) => {
    // console.log("module is called!");
    // console.log("Props ",props);
  return (
    <View style={{flexDirection:"row", justifyContent:"space-around"}} >
        {/* <Image source={require('./../data/banner.jpeg') }/> */}
        <Image source={{ uri : props.imageUri }} style={{height:80, width:80}}/>
        <View style={{flexDirection:"column",justifyContent:"space-between", flex:1}}>
            <Text style={{fontWeight:"bold"}}>{props.heading}</Text>
            <ScrollView style={{height:100}}>
                <Text >{props.description}</Text>
            </ScrollView>
        </View>
    </View>
  )
}

export default Module