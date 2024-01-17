import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../components/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = () => {
    const navigation = useNavigation();
    const { language, toggleLanguage } = useLanguage();
    const isEnglish = language === "en";
    const [userEmail, setUserEmail] = useState('');

    const checkLogin = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        console.log("Current Refresh Token: ",refreshToken);
    }

    const handleSetLanguage = (lang) => {
        toggleLanguage(lang);
    }

    const handleLogout = async () => {
        // Clear stored tokens
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('email');

        // Navigate to Login screen
        navigation.navigate('Login');
    };
    useEffect(() => {
        const fetchUserEmail = async () => {
            const email = await AsyncStorage.getItem('email');
            if (email) {
                setUserEmail(email);
            }
        };

        fetchUserEmail();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Main')}>
                <Icon name="home" size={36} color="#8f0a6d" />
            </TouchableOpacity>

        {userEmail && (
            <Text style={styles.userEmail}>
                Currently logged in as:{"\n"} {"\n"}
                <Text style={styles.userEmailBold}>{userEmail}</Text>
            </Text>
        )}
            {/* Language Switcher */}
            <View style={styles.languageSwitcher}>
               <TouchableOpacity
                    style={[styles.languageButton, isEnglish ? styles.activeLanguage : {}]}
                    onPress={() => handleSetLanguage('en')}><Text style={styles.languageText}>EN</Text>
               </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.languageButton, !isEnglish ? styles.activeLanguage : {}]}
                    onPress={() => handleSetLanguage('ro')}><Text style={styles.languageText}>RO</Text>
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={checkLogin}>
                <Text style={styles.buttonText}>test</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homeButton: {
        position: "absolute",
        top: 80,
        left: 20,
    },
    languageSwitcher: {
        position: 'absolute',
        top: 80,
        right: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 6
    },
    languageButton: {
        backgroundColor: "#080f26",
        padding: 8,
        marginHorizontal: 3,
        borderRadius: 2
    },
    activeLanguage: {
        backgroundColor: "#8f0a6d"
    },
    languageText: {
        color: "white",
        fontWeight: "bold"
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 20,
        borderRadius: 5
    },
    logoutButtonText: {
        color: 'white'
    },
    userEmail: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        marginBottom: 20,
    },
    userEmailBold: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    }
});

export default Settings;
