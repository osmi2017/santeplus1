import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // For animations
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { setCsrfToken } from './../../actions/csrfActions'; 
import { useNavigation } from '@react-navigation/native';

const paymentOptions = [
  { id: '1', name: 'MTN Money', icon: 'money' },
  { id: '2', name: 'Orange Money', icon: 'orange' },
  { id: '3', name: 'Wave', icon: 'paper-plane' },
  { id: '4', name: 'Visa', icon: 'credit-card' },
];

const PaymentOption = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { serializedParams } = route.params;
  const doctorAppointmentDetails = JSON.parse(serializedParams);
  const dispatch = useDispatch();
  // Get CSRF token from the Redux store
  const csrfToken = useSelector((state) => state.csrf.csrfToken); // Adjust the path according to your store structure
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("http://192.168.1.6:8000/api/users/csrf-token/");
      const token = response.data.csrfToken; // Adjust according to your API response structure
     
      dispatch(setCsrfToken(token)); // Update the CSRF token in Redux store
      return token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      setPopupMessage('Failed to fetch CSRF token. Please try again.');
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
      throw error; // Rethrow the error to be handled in the calling function
    }
  };

  const handleSelectOption = async (option) => {
    setSelectedOption(option);
    setPopupMessage(`Payment effectuated successfully with ${option.name}`);
    setPopupVisible(true);

    // Prepare data to send in the POST request
    const data = {
      id_user: doctorAppointmentDetails.userId,
      id_doctor: doctorAppointmentDetails.doctor.id,
      date: doctorAppointmentDetails.date,
      time: doctorAppointmentDetails.time,
      type: parseInt(doctorAppointmentDetails.type.id),
    };
    
    
  
    let token;
    try {
      token = await fetchCsrfToken();
      
    } catch (error) {
        console.log('ivi')
      return; // Exit if fetching the CSRF token fails
    }

    try {
      // Send POST request using Axios
      const response = await axios.post("http://192.168.1.5:8000/api/users/appointments/", data, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': token, // Include CSRF token in headers
        },
      });

      // Optional: Handle the response if needed
      console.log('Response from server:', response.data);
      if (response.status === 201) {
        navigation.navigate('Appointments');
      }
      
    } catch (error) {
      console.error('Error posting data:', error);
      setPopupMessage('Payment failed. Please try again.');
    }

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Payment Option</Text>
      {paymentOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.button, selectedOption?.id === option.id && styles.selectedButton]}
          onPress={() => handleSelectOption(option)}
        >
          <Icon name={option.icon} size={20} color={selectedOption?.id === option.id ? '#fff' : '#007BFF'} />
          <Text style={[styles.buttonText, selectedOption?.id === option.id && styles.selectedButtonText]}>
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Popup Message */}
      {popupVisible && (
        <Animatable.View animation="fadeIn" duration={500} style={styles.popup}>
          <Text style={styles.popupText}>{popupMessage}</Text>
          <Animatable.View animation="bounce" iterationCount="infinite" style={styles.iconContainer}>
            <Icon name="check-circle" size={30} color="green" />
          </Animatable.View>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    textAlign: 'center',
    color: '#007BFF',
    marginLeft: 10,
  },
  selectedButtonText: {
    color: '#fff',
  },
  popup: {
    position: 'absolute',
    top: 50,
    left: '40%',
    right: '10%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000, // Ensure it appears above other elements
  },
  popupText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default PaymentOption;