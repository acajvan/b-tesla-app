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
    <SafeAreaView>
        <StatusBar />
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={checkLogin}>
                <Text style={styles.buttonText}>test</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    },
    errorText: {
        color: 'red',
        marginTop: 10
    }
});

export default Login