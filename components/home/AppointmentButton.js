import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const AppointmentButton = () => {
    return (
        <View style={styles.container}>
            <Button title="Request a Doctor's Appointment" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
});

export default AppointmentButton;