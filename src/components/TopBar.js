import { View ,Text } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import {StatusBar, StyleSheet} from 'react-native';

const TopBar = ({ showBack,navigation }) => {
  return (
    <View  style={styles.topBar}>
        {showBack? <Icon name="arrow-left" onPress={navigation.goBack}/>: <Icon name="menu" onPress={() => navigation.navigate("home")}/>}
        <Text> Icon</Text>
        <Text> Profile</Text>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  topBar : {
    paddingTop: StatusBar.currentHeight,
    flexDirection:"row",
    justifyContent:"space-between",
    
  }
});
