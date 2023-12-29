import React, {createContext, useState, useContext, useEffect} from "react";
import i18n from "../locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(i18n.language);


    const storeLanguage = async (newLanguage) => {
        try {
            await AsyncStorage.setItem('userLanguage', newLanguage);
            setLanguage(newLanguage)
            i18n.changeLanguage(newLanguage);
        } catch (error) {
            console.error('Failed to save the language to AsyncStorage');
        }
    };


    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ro' : 'en';
        storeLanguage(newLanguage)
    };


    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('userLanguage');
                if (storedLanguage !== null) {
                    setLanguage(storedLanguage);
                    i18n.changeLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Failed to retrieve the language from storage')
            }
        };

        loadLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};