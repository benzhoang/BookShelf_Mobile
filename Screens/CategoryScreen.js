import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// API URL from environment variable (assuming it's set in your Expo config)
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://bookshelf-be.onrender.com';

function CategoryScreen() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listKey, setListKey] = useState(0); // Add state for FlatList key

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories`); // Assuming /categories endpoint
                const data = await response.json();
                setCategories(data); // Expecting an array of { categoryName, ... }
                setLoading(false);
                setListKey(prevKey => prevKey + 1); // Update key to force re-render
            } catch (err) {
                setError('Failed to load categories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Render each category item
    const renderCategory = ({ item }) => (
        <View style={styles.categoryItem}>
            <Image
                source={require('../assets/loi-404-tren-cyber-panel.jpg')} // Adjust path as needed
                style={styles.backgroundImage}
            />
            <Text style={styles.categoryText}>{item.categoryName}</Text>
        </View>
    );

    // Show loading, error, or the list
    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Book Categories</Text>
            <FlatList
                key={listKey} // Add key to force re-render when data changes
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id ? item.id.toString() : item.categoryName} // Adjust based on your API response
                numColumns={2} // Keep numColumns constant
                columnWrapperStyle={styles.columnWrapper} // Add spacing between columns
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

// Styles for the screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C4A484', // Matching your HomeScreen background
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    categoryItem: {
        flex: 1, // Ensure items take equal space in the row
        padding: 15,
        borderRadius: 10,
        margin: 5, // Add margin for spacing
        height: 150, // Fixed height to match the image layout
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // For layering text over the image
    },
    backgroundImage: {
        width: '100%', // Fill the container
        height: '100%', // Fill the container
        borderRadius: 10,
        position: 'absolute', // Position behind the text
        opacity: 0.5, // Slightly fade the image for a muted effect (adjust as needed)
    },
    categoryText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        top: 25,
        zIndex: 1, // Ensure text is on top of the image
    },
    columnWrapper: {
        justifyContent: 'space-between', // Space evenly between columns
    },
    list: {
        paddingBottom: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default CategoryScreen;