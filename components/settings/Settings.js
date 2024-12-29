// src/components/Profile.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BottomNav from './BottomNav'; // Ensure this path is correct

const Settings = () => {
    const [activePage, setActivePage] = useState('Settings'); // Initialize active page to 'Profile'

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Page</Text>
            {/* Pass activePage and setActivePage to BottomNav */}
            <BottomNav activePage={activePage} setActivePage={setActivePage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Settings;