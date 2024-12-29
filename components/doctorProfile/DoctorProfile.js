// src/components/DoctorProfile.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DoctorProfile = ({ route }) => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const { doctorId } = route.params;
    console.log(doctorId)
    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.6:8000/api/users/doctors/${doctorId}/`);
                setDoctor(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    if (!doctor) {
        return <Text>No doctor data available.</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: `http://192.168.1.5:8000/${doctor.photo}` }} style={styles.profileImage} />
            <Text style={styles.name}>{`${doctor.first_name} ${doctor.last_name}`}</Text>
            <Text style={styles.title}>{doctor.title}</Text>
            <Text style={styles.specialty}>{doctor.speciality.name}</Text>        

            <Text style={styles.availabilityTitle}>Availability:</Text>
            {doctor.availabilities.length > 0 ? (
                <FlatList
                    data={doctor.availabilities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.availability}>
                            {item.day_of_week}: {item.start_time} - {item.end_time}
                        </Text>
                    )}
                />
            ) : (
                <Text style={styles.info}>No availability information available.</Text>
            )}
            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.smallButton}>
                    <Icon name="heart" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {  navigation.navigate('DoctorAppointments', { doctor }); }}style={styles.largeButton} >
                    <Text style={styles.largeButtonText}>Book an Appointment</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
    },
    availabilityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    availability: {
        fontSize: 16,
        marginBottom: 2,
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    smallButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50, // Adjust width as needed
        height: 50, // Adjust height as needed
    },
    largeButton: {
        backgroundColor: '#28a745', // Green color for the button
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, // This allows the button to take up the remaining space
        marginLeft: 10, // Space between the small and large button
    },
    largeButtonText: {
        color: '#fff', // White text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DoctorProfile;