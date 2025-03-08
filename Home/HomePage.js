import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#C4A484', padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#fff' }}>Xin chào USER 🌿</Text>
                <Image
                    source={require('../assets/avatar.jpg')}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#fff' }}>Relax and read book</Text>
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, padding: 10, alignItems: 'center' }}>
                <FontAwesome name="search" size={20} color="#000" style={{ marginRight: 10 }} />
                <TextInput placeholder="Search book" style={{ flex: 1 }} />
            </View>
        </View>
    );
}

