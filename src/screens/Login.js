import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();


    
    const checkLogin = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        console.log("Current Refresh Token: ",refreshToken);
    }

    const navigateToRegister = () => {
        navigation.navigate('Register');
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const isFormValid = () => isValidEmail(email) && password.length > 0;


    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.0.37:3600/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
    
            // Handle successful login
            await AsyncStorage.setItem('accessToken', data.accessToken);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);

            console.log("Stored Refresh Token: ", data.refreshToken);

            navigation.navigate('Main');
            console.log('Login successful:', data);
            setError('');
    
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        }
    };
    


  return (
    <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
            
            <View style={styles.container}>
                <Text style={styles.title}>Login and start your</Text>
                <Text style={styles.titleTwo}>Tesla journey</Text>
                
                <TouchableOpacity style={styles.inputContainer} onPress={() => this.emailInput.focus()}>
                    <Icon name='envelope' style={styles.iconStyle} />
                    <TextInput
                        ref={(input) => { this.emailInput = input; }}
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.inputContainer} onPress={() => this.passwordInput.focus()}>
                    <Icon name='lock' style={styles.iconStyle} />
                    <TextInput
                        ref={(input) => { this.passwordInput = input; }}
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, !isFormValid() && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={!isFormValid()}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => { /* will implement the forgot password logic later */ }}>
                    <Text style={styles.forgotPasswordText}>I forgot my password</Text>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity style={styles.signUpButton} onPress={navigateToRegister}>
                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.debugButton} onPress={checkLogin}>
                    <Text style={styles.buttonText}>debug: test_login</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    titleTwo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
    },
    iconStyle: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPasswordButton: {
        marginTop: 15,
    },
    forgotPasswordText: {
        color: '#007bff',
        fontWeight: 'bold',
        textAlign: 'center',
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
    },
    debugButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 30,
    },
});

export default Login