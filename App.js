import 'intl-pluralrules';
import React from "react";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import TicketCreationScreen from './src/screens/TicketCreationScreen';
import viewTicketsScreen from "./src/screens/ViewTicketsScreen";
import Register from "./src/screens/Register";
import { LanguageProvider } from "./src/components/LanguageContext";



const Stack = createNativeStackNavigator();

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#101d4b'
    }
}

const App = () => {
  return (
      <LanguageProvider>
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator screenOptions={{headerShown: false, animation: "slide_from_right" }} initialRouteName="Register">
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="CreateTicket" component={TicketCreationScreen} />
                <Stack.Screen name="ViewTicket" component={viewTicketsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
      </LanguageProvider>
  );
};

export default App;
