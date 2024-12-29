import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import SearchBar from './SearchBar';
import SpecialtyButtons from './SpecialtyButtons';
import AppointmentButton from './AppointmentButton';
import DoctorCard from './DoctorCard';
import BottomNav from './BottomNav';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDoctors(); // Fetch doctors on initial load
    }, []); // Empty dependency array to run only once

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://192.168.1.6:8000/api/users/doctors/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchResults = (results) => {
        if (Array.isArray(results) && results.length === 0) {
            fetchDoctors(); // Fetch default doctors if no results
        } else if (Array.isArray(results)) {
            setDoctors(results); // Update doctors with search results
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <SearchBar onSearchResults={handleSearchResults} />
                <SpecialtyButtons />
                <AppointmentButton />
                <FlatList
                    data={doctors}
                    renderItem={({ item }) => (
                        <DoctorCard doctor={{
                            id: item.id,
                            name: `${item.first_name} ${item.last_name}`,
                            specialty: item.speciality.name,
                            photo: `http://192.168.1.6
                            // 
                            // 
                            // :8000/${item.photo}`, // Construct full photo URL
                        }} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;