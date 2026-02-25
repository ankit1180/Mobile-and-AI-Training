import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import CompareDetailsScreen from './src/screens/CompareDetailsScreen';
//import ModelDetailsPage from './src/components/ModelDetailsPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* homescreen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Details screen */}
        <Stack.Screen name="Details" component={DetailScreen} />
        {/* compare details screen */}
        <Stack.Screen
          name="CompareDetailsScreen"
          component={CompareDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
