import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setCsrfToken } from './../../actions/csrfActions';
import { setUser  } from './../../actions/userActions'; // Import setUser  action

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.csrf.csrfToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://192.168.1.6:8000/api/users/csrf-token/');
      const token = response.data.csrfToken;
      dispatch(setCsrfToken(token));
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await axios.post('http://192.168.1.5:8000/api/users/login/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.status === 200) {
        alert('Login successful');

        // Dispatch the user data to the Redux store
        const userData = response.data.user; // Extract user data from response
        const profileData = response.data.profile; // Extract profile data if needed
        const userInfo = { ...userData, profile: profileData }; // Combine user and profile data
        
        dispatch(setUser (userInfo)); // Dispatch setUser  action

        navigation.navigate('Home'); // Navigate to Home on successful login
      } else {
        alert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        console.error(error);
        alert('An error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          />
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mot de Passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <Button title="Login" onPress={handleLogin} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
    
          {/* Line with "Or log in with" */}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or log in with</Text>
            <View style={styles.line} />
          </View>
          {/* Social login buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity onPress={() => alert('Login with Google')}>
              <Image source={require('../../assets/google_logo_icon.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Login with Facebook')}>
              <Image source={require('../../assets/facebook_logo_icon.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
          {/* Create an Account link */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    export default Login;