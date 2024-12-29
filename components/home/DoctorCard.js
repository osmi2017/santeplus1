import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DoctorCard = ({ doctor }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('DoctorProfile', { doctorId: doctor.id })} // Pass doctor.id as a parameter
        >
            <Image source={{ uri: doctor.photo }} style={styles.image} />
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        marginRight: 5,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    specialty: {
        color: 'gray',
    },
});

export default DoctorCard;