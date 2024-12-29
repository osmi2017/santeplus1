import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'

const appointmentTypes = [
  { id: '1', type: 'Voice Call', price: '$30', icon: 'phone' },
  { id: '2', type: 'Messaging', price: '$20', icon: 'comment' },
  { id: '3', type: 'Video Call', price: '$50', icon: 'video-camera' },
  { id: '4', type: 'House Visit', price: '$100', icon: 'home' },
];

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const totalMinutes = i * 15;
  const hours = Math.floor(totalMinutes / 60) + 8;
  const minutes = totalMinutes % 60;
  
  const formattedHour = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const period = hours < 12 ? 'AM' : 'PM';
  
  return `${formattedHour}:${formattedMinutes} ${period}`;
});

const DoctorAppointment = ({ route }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
 

  const { doctor } = route.params; // Assuming doctor is passed in route params
  const availabilities = doctor.availabilities; // Doctor's availability data

  const handleTypeSelect = (type) => {
  
    setSelectedType(type);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePayment = () => {
    const appointmentDate = date; // Assuming selectedDate is in the correct format
    const appointmentTime = selectedTime; // This should be the selected time
    const appointmentType = selectedType; // This should be the selected type
    const userId = user.id; // Assuming currentUser  contains the logged-in user's information
    
    const doctorDetails = doctor; // Assuming doctor contains the doctor's information
    if (selectedType && selectedTime) {
      const selectedDay = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(); // Get the selected day (e.g., 'MON')
      const selectedTime24 = convertTo24HourFormat(selectedTime); // Convert selected time to 24-hour format
      const isAvailable = checkAvailability(selectedDay, selectedTime24);
      const paymentParams = {
        userId: userId,
        doctor: doctorDetails,
        date: appointmentDate,
        time: appointmentTime,
        type: appointmentType,
      };
      const serializedParams = JSON.stringify(paymentParams);
      console.log("la")
      console.log(paymentParams)
      if (isAvailable) {
        navigation.navigate('PaymentOption', {serializedParams})
      } else {
        Alert.alert("Doctor not available at this time");
      }
    } else {
      Alert.alert('Please select both a service type and a time slot.');
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hourMinute, period] = time.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);
    
    if (period === 'PM' && hour < 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:00`;
  };

  const checkAvailability = (day, time) => {
    return availabilities.some(slot => {
      if (slot.day_of_week === day) {
        return time >= slot.start_time && time <= slot.end_time;
      }
      return false;
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {date.toLocaleDateString()}</Text>
      <Button title="Select Date" onPress={openDatePicker} />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()} // Ensure the date is today or later
        />
      )}

      <Text style={styles.label}>Select Time:</Text>
      <FlatList
        data={timeSlots}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.timeSlot, selectedTime === item && styles.selectedTime]}
            onPress={() => handleTimeSelect(item)}
          >
            <Text style={styles.timeText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.label}>Select Appointment Type:</Text>
      <FlatList
        data={appointmentTypes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.typeContainer, selectedType?.id === item.id && styles.selectedType]}
            onPress={() => handleTypeSelect(item)}
          >
            <Icon name={item.icon} size={24} color="#000" />
            <Text style={styles.typeText}>{item.type} - {item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />

      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  timeSlot: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedTime: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  timeText: {
    color: '#000',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
  },
  selectedType: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  typeText: {
    marginLeft: 10,
    color: '#000',
  },
});

export default DoctorAppointment;