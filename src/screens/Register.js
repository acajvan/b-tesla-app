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
        setEmail('');
        setPassword('');
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
            setEmail('');
            setPassword('');
            // Registration successful - navigate to login screen or show success message
        } catch (error) {
            console.error('Failed to register:', error);
            setError(error.message);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    const isFormValid = () => {
        return email.length > 0 && password.length > 0 && isValidEmail(email);
    }
    
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
            
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'gray'} value={email} onChangeText={onChangeEmail} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={'gray'} value={password} onChangeText={setPassword} secureTextEntry />
            </View>

                <TouchableOpacity style={[styles.button, !isFormValid() && styles.buttonDisabled]} onPress={handleRegister} disabled={!isFormValid()}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Animated.View style={[styles.fadeView, { opacity: fadeAnim}]}>
                    <Text>Registration successful</Text>
                </Animated.View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Already have an account? </Text>
                    <TouchableOpacity style={styles.signUpButton} onPress={navigateToLogin}>
                        <Text style={styles.signUpButtonText}> Log In </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        width: '80%',
        marginBottom: 20,
    },
    input: {
        color: 'white',
        fontSize: 16,
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
        padding: 15,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontSize: 18,
        color: '#fff',
    },
    signUpButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 10,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: 'gray',
        opacity: 0.5,
    }
});

export default Register;
