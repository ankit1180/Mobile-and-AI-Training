import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const LoginScreen = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
      console.log('login user');
    }

    const isValidEmail = (mail) => {
      setEmail(mail);

      const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;

      if (!emailRegx.test(mail)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
      //console.log('Email ====>>>> ',email)
    }

    const isValidPassword = (pass) => {
      setPassword(pass);

      if(pass.length < 8){
        setPasswordError('Password must be atleast 8 character')
      }

      else {
        setPasswordError('');
      }
    }

    console.log('email above valid var ====>>>> ',email);
    console.log('password above valid var ====>>>> ',password);
    console.log('emailError above valid var ====>>>> ',emailError);
    console.log('passwordError above valid var ====>>>> ',passwordError);
    
    const isFormValid = email !== '' && password !== '' && emailError === '' && passwordError === '';

    

    console.log('isValidForm ====>>>> ', isFormValid);
    

    useEffect(() => {
     console.log('Email ====>>>> ',email);
      console.log('password ====>>>> ',password);
    },[email, password])

  return (
    <View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          // onChangeText={(email) => {
          //   setEmail(email);
          //   console.log('email ====>>>> ', email);
            
          // }}
          onChangeText={isValidEmail}
        />
        
      </View>
      {emailError && email !== ''? ( <Text>{emailError}</Text>) : null}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry ={true}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          maxLength={8}
        //  onChangeText={(pass) => {
        //   setPassword(pass);
        //   console.log('password ====>>>> ',pass);
          
        //  }}
        onChangeText={isValidPassword}
        />
      </View>
       {passwordError && password !== '' ? ( <Text>{passwordError}</Text>) : null}
        <TouchableOpacity
        style={[styles.button,
          { backgroundColor: isFormValid ? 'green' : 'grey' }
        ]}
        onPress={handleLogin}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputView: {
   width: 200 ,
    backgroundColor: '#3AB4BA',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
   // alignItems: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
button: {
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 10,
  //backgroundColor: isFormValid ? 'green' : 'grey'
},
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
