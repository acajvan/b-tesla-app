import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import TicketCreationScreen from './src/screens/TicketCreationScreen'; // You'll create this next


const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="CreateTicket" component={TicketCreationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#605b5b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
