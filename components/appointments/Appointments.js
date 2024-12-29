// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import BottomNav from './BottomNav'; // Ensure this path is correct
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector
import { Card } from 'react-native-paper'; // Import Card from your UI library
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import { useNavigation } from '@react-navigation/native';

const Appointments = () => {
    const [activePage, setActivePage] = useState('Appointments'); // Initialize active page to 'Profile'
    const userId = useSelector((state) => state.user.user.id); // Get user ID from Redux store
    const csrfToken = useSelector((state) => state.csrf.csrfToken); // Get CSRF token from Redux store
    const [appointments, setAppointments] = useState([]); // State to hold appointments
    const navigation = useNavigation();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("http://192.168.1.6:8000/api/users/appointments/", {
                    params: { user_id: userId }, // Pass user_id as a parameter
                    headers: {
                        'X-CSRFToken': csrfToken, // Include CSRF token in headers
                    },
                });
                console.log('ici');
                console.log(response.data); // Log the response data
                setAppointments(response.data); // Store the appointments
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments(); // Call the fetch function
    }, [userId, csrfToken]); // Dependencies to re-fetch if userId or csrfToken changes

    // Function to render the icon based on appointment type
    const renderIcon = (type) => {
        const iconColor = "#FFFFFF"; // Set the icon color to white
        const iconSize = 30; // Set a common size for the icon
        const circleColor = "blue"; // Set the circle color
    
        switch (type) {
            case 1: // Voice Call
                return (
                    <View style={[styles.iconCircle, { backgroundColor: circleColor }]}>
                        <Icon name="phone-in-talk" size={iconSize} color={iconColor} />
                    </View>
                );
            case 2: // Messaging
                return (
                    <View style={[styles.iconCircle, { backgroundColor: circleColor }]}>
                        <Icon name="message" size={iconSize} color={iconColor} />
                    </View>
                );
            case 3: // House Visit
                return (
                    <View style={[styles.iconCircle, { backgroundColor: circleColor }]}>
                        <Icon name="home" size={iconSize} color={iconColor} />
                    </View>
                );
            default:
                return null;
        }
    };

    // Render each appointment as a card
    const renderAppointment = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.cardTitle}>Appointment ID: {item.id}</Text>
                <Text style={styles.cardText}>Date: {item.date}</Text>
                <Text style={styles.cardText}>Time: {item.time}</Text>
                <View style={styles.doctorInfo}>
                    <Image source={{ uri: "http://192.168.1.6:8000" + item.doctor.photo }} style={styles.image} />
                    <Text style={styles.cardText}>Dr. {item.doctor.last_name} {item.doctor.first_name}</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('VideoCall');}} style={styles.iconContainer}>
                        {renderIcon(item.type)}
                    </TouchableOpacity>
                </View>
                
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Appointments Page</Text>
            <FlatList
                data={appointments}
                renderItem={renderAppointment}
                keyExtractor={(item) => item.id.toString()} // Use id as key
            />
            {/* Pass activePage and setActivePage to BottomNav */}
            <BottomNav activePage={activePage} setActivePage={setActivePage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5', // Light background color for contrast
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Darker color for the header
    },
    card: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff', // White background for cards
        elevation: 3, // Shadow effect for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Shadow radius
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5, // Space below the title
    },
    cardText: {
        fontSize: 14,
        marginBottom: 5, // Space below each text line
        color: '#555', // Slightly lighter color for text
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, // Space below doctor info
        justifyContent: 'space-between', // Space between doctor info and icon
    },
    image: {
        width: 50, // Set image width
        height: 50, // Set image height
        borderRadius: 25, // Make the image circular
        marginRight: 10, // Space between the image and text
        borderWidth: 1, // Optional: Add a border around the image
        borderColor: '#ddd', // Optional: Border color
        overflow: 'hidden', // Ensure the image fits within the border radius
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5, // Add padding around the icon
    },
    iconCircle: {
        width: 50, // Diameter of the circle
        height: 50, // Diameter of the circle
        borderRadius: 30, // Make it circular
        justifyContent: 'center', // Center the icon vertically
        alignItems: 'center', // Center the icon horizontally
    },
});

export default Appointments;