import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../components/LanguageContext";
import i18n from "../locales/i18n";
import {useNavigation} from "@react-navigation/native";
import {useTranslation} from "react-i18next";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const { t } = useTranslation();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }

    const navigateToLogin = () => {
        navigation.navigate('Login');
    }

    const onChangeEmail = (text) => {
        setError('');
        setEmail(text);
    }

    const handleRegister = async () => {
        try {
            const response = await fetch('http://192.168.0.37:3600/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
    
            const data = await response.json(); // Process the response
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to register");
            }
    
            console.log('Registration successful:', data);
            fadeIn();
            setTimeout(() => {
                fadeOut();
                navigation.navigate('Login');
            }, 3000)
            setError('');
            // Registration successful - navigate to login screen or show success message
        } catch (error) {
            console.error('Failed to register:', error);
            setError(error.message);
        }
    };
    
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={onChangeEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Animated.View style={[styles.fadeView, { opacity: fadeAnim}]}>
                    <Text>Registration successful</Text>
                </Animated.View>
                <TouchableOpacity 
                    style={styles.loginButton} 
                    onPress={navigateToLogin}>
                    <Text style={styles.loginButtonText}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'white',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 0.5,
        borderColor: 'red',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    button: {
        backgroundColor: '#007bff', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    fadeView: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -100 }, { translateY: -50 }],
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
    },
    loginButton: {
        marginTop: 45,
    },
    loginButtonText: {
        color: '#007bff',
        fontSize: 16,
    },
});

export default Register;
