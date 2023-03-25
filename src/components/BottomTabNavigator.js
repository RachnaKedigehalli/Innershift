import React, { useState } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import TopBar from './TopBar';
import SearchScreen from '../screens/SearchScreen';
import CalenderScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const noHeader = { headerShown: false };
const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const [showBack,setShowBack] = useState(false);

  return (
    // <View>
      <Tab.Navigator initialRouteName='home' >
        <Tab.Screen name="home" component={Home} options={{
          header:({ navigation, route, options, back }) => {
            return (<TopBar showBack={showBack} navigation={navigation}/>);
          }
        }}/>
        <Tab.Screen  name="search" component={SearchScreen} options={{
          header:({ navigation, route, options, back }) => {
            return (<TopBar navigation={navigation} showBack={false} /> );
          }
        }}/>
        <Tab.Screen  name="calender" component={CalenderScreen} options={{
          header:({ navigation, route, options, back }) => {
            return (<TopBar navigation={navigation} showBack={false} /> );
          }
        }}/>
        <Tab.Screen  name="chats" component={ChatScreen} options={{
          header:({ navigation, route, options, back }) => {
            return (<TopBar navigation={navigation} showBack={false} /> );
          }
        }}/>
      </Tab.Navigator>
    // </View>
  )
}

export default BottomTabNavigator