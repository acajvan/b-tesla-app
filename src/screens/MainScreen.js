import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MainButton from '../components/MainButton';
import {useNavigation} from "@react-navigation/native";
import {SvgFromUri} from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../components/LanguageContext";
import i18n from "../locales/i18n";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";

const MainScreen = () => {

    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigation = useNavigation();
    const { language, toggleLanguage } = useLanguage();
    const isEnglish = language === "en";

    useEffect(() => {
        const updateDateTime = () =>
        {
            const now = new Date();
            const locale = i18n.language;
            const date = `${now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
            setCurrentDateTime(`${date}`);
        };

        updateDateTime();

        const intervalID = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalID);
    }, [i18n.language]);

    const { t } = useTranslation();

    const handleSetLanguage = (lang) => {
        toggleLanguage(lang);
    }

    return (
        <SafeAreaView style={styles.safeArea} >
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
        <View style={styles.container}>
        <TouchableOpacity 
                style={styles.settingsButton} 
                onPress={() => navigation.navigate('Settings')}>
                <Icon name="gear" size={30} color="white" />
            </TouchableOpacity>
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
            <SvgFromUri uri={"https://www.svgrepo.com/show/342292/tesla.svg"} width={125} height={125} />
            <Text style={styles.title}>{t('loc.mainscreen.title')}</Text>
            <Text style={styles.date}>{t('loc.mainscreen.date')} {currentDateTime} </Text>
            <MainButton title={t('loc.mainscreen.createticket')} onPress={() => navigation.navigate('CreateTicket')} />
            <MainButton title={t('loc.mainscreen.seetickets')} onPress={() => navigation.navigate('ViewTicket')} />
        </View>
        </SafeAreaView>
);};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'white',
        textAlign: 'center',
    },
    date:{
        fontSize: 16,
        marginTop: 10,
        textTransform: "capitalize",
        color: 'white',
    },
    credits: {
        fontSize: 10,
        alignItems: "flex-end",
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#101d4b',
    },
    languageSwitcher: {
        position: 'absolute',
        top: 40,
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
    settingsButton: {
        position: 'absolute',
        top: 40,
        left: 20
    },
});

export default MainScreen;
