import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../components/LanguageContext";
import i18n from "../locales/i18n";
import {useTranslation} from "react-i18next";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { t } = useTranslation();

    const handleRegister = async () => {
        try {
            const response = fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to register");
            }
            // Registration successful - navigate to login screen
            navigation.navigate('Login');
            console.log('Registration successful:', data);

            

            }
        catch (error) {
            console.error('Failed to register:', error);
        }
        }
    
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <Button title="Register" onPress={handleRegister} />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default Register;
