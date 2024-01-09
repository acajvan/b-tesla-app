import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

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
            <StatusBar style="light" />
            
            
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.registerLink}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={navigateToRegister}>
                        <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={checkLogin}>
                    <Text style={styles.buttonText}>test</Text>
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
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
    },
    input: {
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
    registerLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    linkText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default Login