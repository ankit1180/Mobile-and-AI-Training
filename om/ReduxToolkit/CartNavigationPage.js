import React from 'react';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

import ProductPage from './Component/ProductPage';
import Cart from './Component/Cart';


import { useSelector } from 'react-redux';
import LoginPage from "./Component/LoginPage";
import LoadingScreen from "./Component/LoadingScreen";





const Stack = createNativeStackNavigator();

const CartNavigationPage = () => {
   
    const isAutenticate = useSelector(state => state.Login.login)

    //declaring a state to handel initia loading screen 
    const [loading, setLoading] = useState(true);


    //setting loading false after 5 second
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },4000)
    },[])


    if(loading){
        return <LoadingScreen />;
    }


 

    if (!isAutenticate) {
        return <LoginPage />
    }


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="ProductPage"
                    component={ProductPage}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Cart')}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', marginRight: 5 }}>Cart</Text>
                            </TouchableOpacity>
                        )
                    })}
                />

                <Stack.Screen
                    name="Cart"
                    component={Cart}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default CartNavigationPage;
