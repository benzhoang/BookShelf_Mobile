import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import QRScreen from '../Screens/QRScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import BeginScreen from '../BeginScreen';

function HomeScreen() {
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

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#8B5E3C' }, // Màu nâu phù hợp với background
                tabBarActiveTintColor: '#1E90FF', // Màu chữ và icon khi được chọn (trắng)
                tabBarInactiveTintColor: '#E0E0E0', // Màu chữ và icon khi không được chọn (xám nhạt)
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (<FontAwesome name="home" size={24} color={color} />)
                }}
            />
            <Tab.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    tabBarIcon: ({ color }) => (<FontAwesome name="list" size={24} color={color} />)
                }}
            />
            <Tab.Screen
                name="QR"
                component={QRScreen}
                options={{
                    tabBarIcon: ({ color }) => (<FontAwesome name="qrcode" size={24} color={color} />)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (<FontAwesome name="user" size={24} color={color} />)
                }}
            />
        </Tab.Navigator>
    );
}
