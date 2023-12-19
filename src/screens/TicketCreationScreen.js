import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import Slider from "@react-native-community/slider/src/Slider";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TicketCreationScreen = () => {
    const [betAmount, setBetAmount] = useState(0);
    const navigation = useNavigation();
    const [customColor, setCustomColor] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [colorQuantity, setColorQuantity] = useState(1);
    const [isColorSelected, setIsColorSelected] = useState(false);
    const resetSelections = () => {
        setBetAmount(0);
        setSelectedColor('');
        setCustomColor('');
        setColorQuantity(1);
    }


    useEffect(() => {
        setIsColorSelected(selectedColor !== '' || customColor !== '');
    }, [selectedColor, customColor]);

    const createTicket = async () => {
        const newTicket = {
            id: Date.now(),
            betAmount,
            color: customColor || selectedColor,
            colorQuantity,
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

    const ColorButton = ({ title, color }) =>
        (
            <TouchableOpacity
                style={[styles.colorButton, {background: 'blue', opacity: isColorSelected && selectedColor !== title.toLowerCase() ? 0.8 : 1 }]}
                onPress={() => {setSelectedColor(title.toLowerCase())
                    setColorQuantity(1);
                }}>
                <Text style={[styles.glowText, {color: color.toLowerCase() }]}>{title}</Text>
            </TouchableOpacity>
        )

    const getColorPluralForm = (color, quantity) => {
        const colorPlurals = {
            neagra: 'negre',
            alba: 'albe',
            albastra: 'albastre',
            gri: 'gri',
            rosie: 'rosii',
        };

        return quantity > 1 ? colorPlurals[color] || color : color;
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Main')}>
                <Icon name="home" size={36} color="#8f0a6d" />
            </TouchableOpacity>

            <Text style={styles.header}>Biletul Zilei</Text>

            <Text style={styles.label}>Numarul de Tesla vazute azi: {betAmount}</Text>
            <Slider
                style={styles.slider}
                value={betAmount}
                onValueChange={setBetAmount}
                minimumValue={0}
                maximumValue={25}
                step={1}
            />


            {/* Add additional betting options here */}

            <View style={styles.colorContainer}>
                <ColorButton title="Alba" color="White" plural="albe" />
                <ColorButton title="Neagra" color="Black" plural="negre" />
                <ColorButton title="Gri" color="Grey" plural="gri" />
                <ColorButton title="Albastra" color="Blue" plural="albastre" />
                <ColorButton title="Rosie" color="Red" plural="rosii" />
            </View>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setCustomColor(text);
                    setColorQuantity(0); //resting the quantity color
                }}
                value={customColor}
                placeholder="Alta culoare?"
                placeholderTextColor={"white"}
            />

            {isColorSelected && (
                <View style={styles.sliderContainer}>
                    <Text style={styles.label}>Dintre care macar {colorQuantity} {colorQuantity > 1 ? "sunt" : "este" } {getColorPluralForm(selectedColor, colorQuantity)} </Text>
                    <Slider style={styles.slider} value={colorQuantity} onValueChange={setColorQuantity} minimumValue={1} maximumValue={10} step={1} />
                </View>
            )}

            <MainButton title="Submit Ticket" onPress={createTicket} />

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetSelections}>
                <Text style={styles.cancelButtonText}>Cancel</Text>

            </TouchableOpacity>
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
        color: 'white',
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
        color: 'white',
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
        backgroundColor: 'rgb(14,107,168)',
    },
    glowText: {
        textShadowColor: 'rgba(159,159,180,0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,
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
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      width: '80%',
      marginBottom: 20,
        color: 'white',
        backgroundColor: 'rgba(190,187,255,0.73)'
    },
    sliderContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
    cancelButton: {
        backgroundColor: '#8f0a6d',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: "center",
        fontSize: 16,
    },

});

export default TicketCreationScreen;
