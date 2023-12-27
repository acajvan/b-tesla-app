import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import MainButton from '../components/MainButton';
import {useNavigation} from "@react-navigation/native";
import {SvgFromUri} from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../components/LanguageContext";
import i18n from "../locales/i18n";
import {useTranslation} from "react-i18next";

const MainScreen = () => {

    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigation = useNavigation();
    const [isEnglish, setIsEnglish] = useState(true);
    const { language, toggleLanguage } = useLanguage();

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

    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.safeArea} >
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
        <View style={styles.container}>
            <View style={styles.languageSwitcher}>
                <Switch trackColor={{ false: "#767577", true: "#81b0ff"}}
                        thumbColor={isEnglish ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleLanguage}
                        value={language === 'en'}
                />
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
        right: 20
    },
});

export default MainScreen;
