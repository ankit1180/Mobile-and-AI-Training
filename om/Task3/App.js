import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ProductDetails from './ProductDetails'
import Cart from './Cart'

export default function App() {

 

  const Stack = createStackNavigator();

return(
 <NavigationContainer>
  
 <Stack.Navigator>
    <Stack.Screen 
    name = "Home"
    component = {HomeScreen}
    options = {{title: 'Home'}}/>
    

    <Stack.Screen 
    name = "ProductDetails"
    component = {ProductDetails}
    options = {{title: 'ProductDetails'}}/>

    <Stack.Screen 
    name = "Cart"
    component = {Cart}
    options = {{title: 'Your Shopping Cart' }}/>

 </Stack.Navigator>
 
 </NavigationContainer>
)
}