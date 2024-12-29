import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const specialties = [
    { title: 'Cardiology', icon: 'favorite',doctors: 20 },
    { title: 'Dermatology', icon: 'spa',doctors: 20 },
    
    { title: 'Pediatrics', icon: 'child-care',doctors: 41 },
    { title: 'Neurology', icon: 'psychology',doctors: 28 },
    { title: 'Orthopedics', icon: 'healing',doctors: 19 },
];

const SpecialtyButtons = () => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => {}}>
            <Icon name={item.icon} size={30} color="gray" style={styles.icon} />
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.cardDoctor}>{item.doctors} Doctors</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Specialist</Text>
            <FlatList
                data={specialties}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    cardText: {
        fontSize: 16,
        marginTop: 5, // Add some space between the icon and text
        fontWeight:'bold',
    },
    icon: {
        marginBottom: 5, // Add some space below the icon
        color:'green',
    },
});

export default SpecialtyButtons;