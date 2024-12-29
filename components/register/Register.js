import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './RegisterStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const csrfToken = useSelector((state) => state.csrf.csrfToken);

  const handleRegister = async() => {
    
    if (!userName || !firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('email', email);
        formData.append('password',password);
        
        // Send the form data using Axios
        const response = await axios.post('http://192.168.1.6:8000/api/users/signup/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
            'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
          },
        });
  
        if (response.status === 200|| response.status === 201) {
          alert('Account Created Successfuly');
          navigation.navigate('Home'); // Navigate to Home on successful login
        } else {
          alert(`Account Creation failed: ${response.data.message}`);
        }
      } catch (error) {
        if (error.response) {
          alert(`Account Creation failed: ${error.response.data.message}`);
        } else {
          console.error(error);
          alert('An error occurred');
        }
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.nameContainer}>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      </View>
      <View style={styles.nameContainer}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      </View>
      <View style={styles.nameContainer}>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      </View>
      <View style={styles.emailContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      </View>
      <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword} // Hide password input
      />
       <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="gray" />
      </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true} // Hide password input
      />
      

      </View>
      <Button title="Register" onPress={handleRegister} />
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.login}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Register;