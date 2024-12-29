import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import { useNavigation } from '@react-navigation/native';

const BottomNav = () => {
    const navigation = useNavigation();
    const [activePage, setActivePage] = useState('Home'); // State to track the active page

    const navigateTo = (page) => {
        setActivePage(page); // Update the active page
        console.log(`Navigating to ${page}`);
    };

    const getIconStyle = (page) => {
        return activePage === page ? styles.activeIcon : styles.icon;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigateTo('Home'); navigation.navigate('Home'); }} style={styles.iconContainer}>
                <Icon name="home" size={getIconStyle('Home').fontSize} color={activePage === 'Home' ? 'green' : 'gray'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigateTo('Profile'); navigation.navigate('Profile'); }} style={styles.iconContainer}>
                <Icon name="person" size={getIconStyle('Profile').fontSize} color={activePage === 'Profile' ? 'green' : 'gray'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigateTo('Appointments'); navigation.navigate('Appointments'); }} style={styles.iconContainer}>
                <Icon name="event" size={getIconStyle('Appointments').fontSize} color={activePage === 'Appointments' ? 'green' : 'gray'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigateTo('Messages'); navigation.navigate('Messages'); }} style={styles.iconContainer}>
                <Icon name="message" size={getIconStyle('Messages').fontSize} color={activePage === 'Messages' ? 'green' : 'gray'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigateTo('Settings'); navigation.navigate('Settings'); }} style={styles.iconContainer}>
                <Icon name="settings" size={getIconStyle('Settings').fontSize} color={activePage === 'Settings' ? 'green' : 'gray'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute', // Fix the position
        bottom: 0, // Align to the bottom
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 30, // Default icon size
    },
    activeIcon: {
        fontSize: 35, // Increased size for active icon
    },
});

export default BottomNav;