import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import Login from '../Login/LoginScreen';
import Register from '../Register/RegisterScreen';
import ProductScreen from "../Screens/ProductScreen";
import DetailScreen from "../Screens/DetailScreen";
import BeginScreen from '../Screens/BeginScreen';
import HomeScreen from '../Home/HomePage';
import QRScreen from '../Screens/QRScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

export default function Navigator() {

    const StackNavigator = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Begin" component={BeginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={TabNavigator} />
                <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
                <Stack.Screen name="ProductScreen" component={ProductScreen} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        )
    }
    const TabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: '#8B5E3C' },
                    tabBarActiveTintColor: '#1E90FF',
                    tabBarInactiveTintColor: '#E0E0E0',
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

    return (

        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );

}
