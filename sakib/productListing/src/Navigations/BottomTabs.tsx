import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductScreen from '../screens/ProductScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddToCartScreen from '../screens/AddToCartScreen';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
   <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hides the "Home", "Message" text
        headerShown: false,
      }}
    >
    <Tab.Screen 
        name="Home"
        component={ProductScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home" // FontAwesome icon name
              size={24} // icon size
              color={focused ? '#000' : '#ccc'} // active/inactive color
            />
          ),
        }}
    />
    <Tab.Screen
        name="WatchList"
        component={AddToCartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="bookmark" // another FontAwesome icon
              size={24}
              color={focused ? '#000' : '#ccc'}
            />
          ),
        }}
      />
  </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})


