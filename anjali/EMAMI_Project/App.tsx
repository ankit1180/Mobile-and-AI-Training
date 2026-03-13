import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Screens/HomeScreen';
import ProductScreen from './src/Screens/ProductScreen';
import BeatScreen from './src/Screens/BeatScreen';
import VisitScreen from './src/Screens/VisitScreen';
import DetailsScreen from './src/Screens/DetailsScreen';
import ProductCardScreen from './src/Screens/ProductCardScreen';
import CartScreen from './src/Screens/CartScreen';
import OrderHistoryScreen from './src/Screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* homescreen */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="BeatDay" component={BeatScreen} />
        <Stack.Screen name="VisitDay" component={VisitScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="TakeOrder" component={ProductCardScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen
          name="OrderHistoryScreen"
          component={OrderHistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
