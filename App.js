import 'intl-pluralrules';
import React, { useEffect, useState } from "react";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import TicketCreationScreen from './src/screens/TicketCreationScreen';
import viewTicketsScreen from "./src/screens/ViewTicketsScreen";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import Settings from "./src/screens/Settings";
import { LanguageProvider } from "./src/components/LanguageContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#101d4b'
    }
}

const App = () => {

    const [initialRoute, setInitialRoute] = useState('Register');
    
    useEffect(() => {
        const checkToken = async () => {
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await fetch('http://192.168.0.37:3600/auth/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            refreshToken
                        })
                    });
                    const data = await response.json();
                    if (data.accessToken) {
                        await AsyncStorage.setItem('accessToken', data.accessToken);
                        setInitialRoute('Main');
                    } else {
                        setInitialRoute('Login');
                    }
                }
            } catch (error) {
                console.error("Token refresh failed: ", error);
                setInitialRoute('Login');
        } 
    }
        checkToken();
    
    }, []);

  return (
      <LanguageProvider>
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right" }} initialRouteName="Register">
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="CreateTicket" component={TicketCreationScreen} />
                <Stack.Screen name="ViewTicket" component={viewTicketsScreen} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </NavigationContainer>
      </LanguageProvider>
  );
};

export default App;
