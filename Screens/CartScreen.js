// CartScreen.js (đặt trong thư mục ../Screens/)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>CartScreen.js</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default CartScreen;