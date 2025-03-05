import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

// API URL from environment variable
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://bookshelf-be.onrender.com';

function DetailScreen({ route, navigation }) {
    const { bookID } = route.params; // Get productId from route params
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                console.log(route)
                const response = await fetch(`${API_URL}/api/books/${bookID}`);
                const data = await response.json();
                console.log('Book Details Response:', data);
                setBook(data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải thông tin sách');
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookID]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Đang tải...</Text>
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
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {Array.isArray(book.image) && book.image.length > 0 ? (
                    <Image
                        source={{ uri: book.image[0] }}
                        style={styles.bookImage}
                        onError={(e) => console.log('Image load error:', e)}
                    />
                ) : typeof book.image === 'string' && book.image.trim() ? (
                    <Image
                        source={{ uri: book.image }}
                        style={styles.bookImage}
                        onError={(e) => console.log('Image load error:', e)}
                    />
                ) : (
                    <Image
                        source={require('../assets/loi-404-tren-cyber-panel.jpg')}
                        style={styles.bookImage}
                    />
                )}
                <Text style={styles.title}>{book.bookName}</Text>
                <Text style={styles.detailText}>
                    Tác giả: {book.actorID?.actorName ? book.actorID.actorName : 'Chưa xác định'}
                </Text>
                <Text style={styles.detailText}>
                    Danh mục: {book.categoryID ? book.categoryID.categoryName : 'Không có'}
                </Text>
                <Text style={styles.description}>
                    Mô tả: {book.description}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C4A484',
    },
    content: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4A484',
    },
    bookImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
    },
    loadingText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default DetailScreen;