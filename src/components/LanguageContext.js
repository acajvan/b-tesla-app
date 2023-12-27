import React, { createContext, useState, useContext } from "react";
import i18n from "../locales/i18n";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(i18n.language);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ro' : 'en';
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};