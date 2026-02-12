import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state for error messages and success message
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  // Validate Email
  const validateEmail = text => {
    setEmail(text);
    setMessage('');

    //rejex pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //email not exist in this pattern
    if (!pattern.test(text)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Validate Password
  const validatePassword = text => {
    setPassword(text);
    setMessage('');
    if (text.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
    } else {
      setPasswordError('');
    }
  };

  //check all validations
  const inputValid =
    email !== '' &&
    password !== '' &&
    emailError === '' &&
    passwordError === '';

  //login button handler
  const handleLogin = () => {
    if (inputValid) {
      setMessage('Login successful!');
      console.log(inputValid);
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>

      <View style={styles.card}>
        {/* Email input*/}
        <Text style={styles.label}>Enter Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={validateEmail}
          placeholderTextColor="gray"
        />
        {/* Show display error when user enter invalid email */}
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        {/* Password input */}
        <Text style={styles.label}>Enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry={true}
          placeholderTextColor="gray"
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: inputValid ? '#4CAF50' : '#ef4949' },
          ]}
          disabled={!inputValid}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Success Message */}
        {message ? <Text style={styles.success}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
  },
  card: {
    backgroundColor: '#d5efe7',
    width: '80%',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginTop: 15,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginPage;
