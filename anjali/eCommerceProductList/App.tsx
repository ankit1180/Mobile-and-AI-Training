import React from 'react';
import Product from './src/components/Product';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductCartDetails from './src/components/ProductCartDetails';
import ProductDetails from './src/components/ProductDetails';
import CustomHeader from './src/components/CustomHeader';
const Stack = createNativeStackNavigator();

function App() {
  return (
    //Navigation use
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: props => <CustomHeader {...props} />,
        }}
      >
        <Stack.Screen
          name="Product"
          component={Product}
          initialParams={{ title: 'Ecommerce Products' }}
        />
        {/* Product Details Screen */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        {/* Product Cart Details Screen */}
        <Stack.Screen name="Cart" component={ProductCartDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
