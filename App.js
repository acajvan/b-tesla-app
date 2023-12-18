import React from "react";
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import TicketCreationScreen from './src/screens/TicketCreationScreen'; // You'll create this next


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
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false,}} initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="CreateTicket" component={TicketCreationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
