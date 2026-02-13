import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, } from 'react';
import { ManagingLogin } from "../features/loginSlice";
import { useDispatch } from 'react-redux';

const LoginPage = () => {

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [emailInputValid, setEmailInputValid] = useState(false);
  const [passInputValid, setPassInputValid] = useState(false);

  const dispatch = useDispatch();


  //handiling submit

  const submit = () => {
    dispatch(ManagingLogin());
  }


  const handleInputChange = (value) => {

    setEmail(value);
    let msg = '';
    if (value === '') {
      setEmailInputValid(false);
      msg = 'Please Enter Email';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/.test(value)) {
      msg = 'Please follow basic email structure';
      setEmailInputValid(false);
    } else {
      setEmailInputValid(true);
    }

    setEmailMessage(msg);
  };





  const handlePasswordChange = (value) => {
    setPassword(value);
    let msg = '';


    const passwordRegex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (value === '') {
      setPassInputValid(false);
      msg = 'Please Enter Password';

    } else if (!passwordRegex.test(value)) {
      setPassInputValid(false);
      msg = 'Password must be 8-20 characters, include uppercase, lowercase, number, and special character. No spaces.';
    } else {
      setPassInputValid(true);
    }

    setPasswordMessage(msg);
  };


  const handelPress = () => {
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 5000)
  }




  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.text}>Please Login</Text>



        <Text>Enter Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={email}
          keyboardType="email-address"
        />


        {emailMessage ? (<Text style={styles.errorText}>{emailMessage}</Text>) : null}

        <Text style={styles.text2}>Enter Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry
        />


        {passwordMessage ? (<Text style={styles.errorText2}>{passwordMessage}</Text>) : null}

        <View style={styles.btn}>
          <TouchableOpacity


            onPress={() => {
              handelPress();
              submit();
            }

            }
            disabled={disabled || !(emailInputValid && passInputValid)}

          >
            <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loginBox: {
    width: '85%',
    height: 400,
    backgroundColor: '#e2b70b',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  text2: {
    marginTop: 20,
    marginBottom: 5,
  },
  btn: {
    marginTop: 20,
    width: '50%',
    backgroundColor: 'black',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  },
  errorText2: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default LoginPage;
