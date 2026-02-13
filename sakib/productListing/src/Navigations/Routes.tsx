import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import ProductScreen from '../screens/ProductScreen';


 const Stack = createNativeStackNavigator()
const Routes = () => {
   
  return (
   <NavigationContainer>

    <Stack.Navigator screenOptions={{headerShown: false}}>

    <Stack.Screen name="Main" component={BottomTabs} />
    <Stack.Screen name="Products" component={ProductScreen} />

    </Stack.Navigator>


   </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})