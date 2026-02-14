import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/css/style';
import FormInput from './FormInput';
import { loginInputs } from './Config';
import { validate } from '../utils/Validation';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Validate while typing
  const handleChange = (id, value) => {
    // form data
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    setMessage('');
    // Validate only that field dynamically
    const error = validate[id]?.(value);
    setErrors(prev => ({
      ...prev,
      [id]: error,
    }));
  };

  // Validate on button click
  const handleLogin = () => {
    const emailError = validate.email(formData.email);
    const passwordError = validate.password(formData.password);
    const newErrors = {
      email: emailError,
      password: passwordError,
    };
    setErrors(newErrors);
    // If no errors
    if (!emailError && !passwordError) {
      setMessage('Login successful!');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <View style={styles.card}>
        {loginInputs.map(input => (
          <FormInput
            key={input.id}
            label={input.label}
            value={formData[input.id]}
            onChangeText={text => handleChange(input.id, text)}
            placeholder={input.placeholder}
            secureTextEntry={input.secureTextEntry}
            keyboardType={input.keyboardType}
            error={errors[input.id]}
          />
        ))}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                formData.email &&
                formData.password &&
                !errors.email &&
                !errors.password
                  ? '#4CAF50'
                  : '#ef4949',
            },
          ]}
          disabled={Object.values(errors).some(error => error)}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.success}>{message}</Text> : null}
      </View>
    </View>
  );
}

export default LoginPage;
