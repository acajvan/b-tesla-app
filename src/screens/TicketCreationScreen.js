import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import SliderWithRef from "@react-native-community/slider/src/Slider";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TicketCreationScreen = () => {
    const [betAmount, setBetAmount] = useState(0);
    const navigation = useNavigation();
    const [customColor, setCustomColor] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const createTicket = async () => {
        const newTicket = {
            id: Date.now(),
            betAmount,
            color: customColor || selectedColor,
            dateCreated: new Date().toISOString(),
        };

        try {
            //retrieve existing tickets
            const storedTickets = await AsyncStorage.getItem('tickets');
            const currentTickets = storedTickets ? JSON.parse(storedTickets) : [];

            //add new ticket
            const updatedTickets = [...currentTickets, newTicket];
            await AsyncStorage.setItem('tickets', JSON.stringify(updatedTickets));

            //reset fields
            setBetAmount(0);
            setSelectedColor('');
            setCustomColor('');
            Alert.alert('Ticket Created', 'Your ticket has been created successfully! ');
        }
        catch (error) {
            Alert.alert('Error', 'There was an error submitting the ticket');
        }

    };

    const ColorButton = ({ title }) =>
        (
            <TouchableOpacity
                style={[styles.colorButton, {background: 'blue'}]}
                onPress={() => {setSelectedColor(title.toLowerCase())}}>
                <Text style={{color: title.toLowerCase() }}>{title}</Text>
            </TouchableOpacity>
        )


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Main')}>
                <Icon name="home" size={30} color="#007bff" />
            </TouchableOpacity>

            <Text style={styles.header}>Biletul Zilei</Text>

            <Text style={styles.label}>Numarul de Tesla vazute azi</Text>
            <SliderWithRef
                style={styles.slider}
                value={betAmount}
                onValueChange={setBetAmount}
                minimumValue={0}
                maximumValue={25}
                step={1}
            />
            <Text>Total: {betAmount}</Text>

            {/* Add additional betting options here */}

            <View style={styles.colorContainer}>
                <ColorButton title="White" />
                <ColorButton title="Black" />
                <ColorButton title="Grey" />
                <ColorButton title="Blue" />
                <ColorButton title="Red" />
            </View>

            <TextInput
                style={styles.input}
                onChangeText={setCustomColor}
                value={customColor}
                placeholder="Enter custom color"
            />

            <MainButton title="Submit Ticket" onPress={createTicket} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    slider: {
        width: 200,
        height: 40,
    },
    homeButton: {
        position: "absolute",
        top: 60,
        left: 20,
    },
    colorButton: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        fontSize: 25,
        fontWeight: "bold",
        backgroundColor: 'rgba(48,79,110,0.23)',
    },
    colorContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems:"center",
        justifyContent: "center",
        marginVertical: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 10,
      width: '80%',
      marginBottom: 20,
    },
});

export default TicketCreationScreen;
