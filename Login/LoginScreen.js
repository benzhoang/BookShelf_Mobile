import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import Navigation Hook

const CustomCheckBox = ({ value, onChange }) => {
    return (
        <Pressable style={styles.checkbox} onPress={() => onChange(!value)}>
            <Ionicons name={value ? "checkbox-outline" : "square-outline"} size={20} color="black" />
        </Pressable>
    );
};

export default function Login() {
    const navigation = useNavigation(); // Sử dụng navigation
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

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

            <View style={styles.rememberContainer}>
                <CustomCheckBox value={rememberMe} onChange={setRememberMe} />
                <Text style={styles.rememberText}>Remember me</Text>

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.agreement}>
                By creating your account or continue with Google, you agree to our{' '}
                <Text style={styles.link}>Terms and Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity style={styles.LoginButton}>
                <Text style={styles.LoginText}>Sign in</Text>
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

            {/* Điều hướng đến RegisterScreen */}
            <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                    Sign up
                </Text>
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
    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    rememberText: {
        color: '#fff',
        fontSize: 14,
    },
    forgotPassword: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginLeft: '100',
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
        color: '#000',
    },
    LoginButton: {
        backgroundColor: '#000',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    LoginText: {
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
    checkbox: {
        marginRight: 10,
    },
});
