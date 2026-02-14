import React from 'react';
import Product from './src/components/Product';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductCartDetails from './src/components/ProductCartDetails';
import ProductDetails from './src/components/ProductDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    //Navigation use
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home Screen */}
        <Stack.Screen
          name="Product"
          component={Product}
          options={{ headerShown: false }}
        />
        {/* Product Details Screen */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: 'Product Details' }}
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
