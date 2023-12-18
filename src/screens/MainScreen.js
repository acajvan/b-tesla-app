import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import MainButton from '../components/MainButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const MainScreen = () => {
    const [tickets, setTickets] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const updateDateTime = () =>
        {
            const now = new Date();
            const date = `${now.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
            setCurrentDateTime(`${date}`);
        };

        updateDateTime();

        const intervalID = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalID);
    }, []);

    const createTickets = async () => {
        const newTicket ={id: Date.now(), date: new Date().toLocaleDateString()}
        const updatedTickets = [...tickets, newTicket];
        setTickets(updatedTickets);
        await AsyncStorage.setItem('tickets', JSON.stringify(updatedTickets));
        Alert.alert('Success', 'Ticket Created');
    }



    return (
        <View style={styles.container}>

            <Text style={styles.title}>Tesla Betting App</Text>
            <Text style={styles.date}>Today Date: {currentDateTime} </Text>
            <MainButton title="Create Ticket For Today" onPress={() => navigation.navigate('CreateTicket')} />
            <MainButton title="View Your Ticket" onPress={() => {}} />
            <MainButton title="Yesterday's Results" onPress={() => {}} />


        </View>


);
};

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
    },
    date:{
        fontSize: 16,
        marginTop: 10,
        textTransform: "capitalize",
    },
    credits: {
        fontSize: 10,
        alignItems: "flex-end",
    }
});

export default MainScreen;
