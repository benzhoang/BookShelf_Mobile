import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let’s get started!</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <TextInput style={styles.input} placeholder="Username" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                    <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <Text style={styles.agreement}>
                By creating your account or continue with Google, you agree to our{' '}
                <Text style={styles.link}>Terms and Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity style={styles.createAccountButton}>
                <Text style={styles.createAccountText}>Create account</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={20} color="#000" />
                <Text style={styles.googleButtonText}>Sign In with Google</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Already have an account?{' '}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Sign in</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C4A484',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 14,
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
        marginBottom: 15,
    },
    inputPassword: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        fontSize: 14,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    agreement: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    link: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    createAccountButton: {
        backgroundColor: '#000',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    createAccountText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#fff',
    },
    orText: {
        marginHorizontal: 10,
        color: '#fff',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleButtonText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#000',
    },
    footerText: {
        color: '#fff',
        fontSize: 14,
    },
});
