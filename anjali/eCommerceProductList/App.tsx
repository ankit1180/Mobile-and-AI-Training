import React from 'react';
import Product from './components/Product';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductCartDetails from './components/ProductCartDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home Screen */}
        <Stack.Screen
          name="Product"
          component={Product}
          options={{ headerShown: false }}
        />
        {/* Product Cart Details Screen */}
        <Stack.Screen
          name="ProductCartDetails"
          component={ProductCartDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
