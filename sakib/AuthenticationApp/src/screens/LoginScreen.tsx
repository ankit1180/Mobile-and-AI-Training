/*

import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux'
import { setSignIn } from '../redux/slice/authSlice.js';


const LoginScreen = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        const user = {
            isLoggedIn: true,
            email: 'jdoe@test.com',
            userName: 'johnDoe'
        };

        dispatch(setSignIn(user));
    }

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 20, fontSize: 15 }}>Login Screen</Text>
            <TouchableOpacity onPress={handleLogin} style={styles.btn}>
                <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    btn: {
        backgroundColor: 'blue',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 20
    }
}) */





import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setSignIn } from '../redux/slice/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    if (!email || !userName) {
      alert('Please enter email and username');
      return;
    }

    dispatch(
      setSignIn({
        isLoggedIn: true,
        email,
        userName,
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

    
      <TextInput
        placeholder="Enter Email"
         placeholderTextColor="#000"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      
      <TextInput
        placeholder="Enter Username"
         placeholderTextColor="#000"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  btn: {
    backgroundColor: 'blue',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  text: {
    color: 'white',
    fontSize: 18,
  },
});
