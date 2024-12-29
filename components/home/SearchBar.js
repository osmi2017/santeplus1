import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const SearchBar = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (query.length > 0) {
            try {
                const response = await fetch(`http://192.168.1.6:8000/api/users/search/?q=${query}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': 'your_csrf_token_here', // Replace with your actual CSRF token
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // Log the result to the console
                onSearchResults(data); // Pass the results to the parent component
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            // If the query is empty, call the fetchDoctors function
            fetchDoctors();
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://192.168.1.5:8000/api/users/doctors/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'your_csrf_token_here', // Replace with your actual CSRF token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Log the result to the console
            onSearchResults(data); // Pass the results to the parent component
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search for doctors..." 
                    value={query}
                    onChangeText={setQuery} // Update the query state on text change
                />
                <TouchableOpacity 
                    style={styles.iconContainer} 
                    onPress={handleSearch} // Trigger search or fetch doctors on button press
                >
                    <Icon 
                        name={query.length > 0 ? "search" : "refresh"} 
                        size={24} 
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    input: {
        flex: 1, // Take up available space
        height: 40,
        paddingHorizontal: 10,
    },
    iconContainer: {
        padding: 10, // Add padding around the icon
    },
});

export default SearchBar;