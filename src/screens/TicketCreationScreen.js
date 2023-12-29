import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import Slider from "@react-native-community/slider/src/Slider";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";

const TicketCreationScreen = () => {
    const [betAmount, setBetAmount] = useState(1);
    const navigation = useNavigation();
    const [customColor, setCustomColor] = useState('');
    const [colorSelections, setColorSelections] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [colorQuantity, setColorQuantity] = useState(1);
    const [isColorSelected, setIsColorSelected] = useState(false);
    const { t } = useTranslation();
    const resetSelections = () => {
        setBetAmount(1);
        setSelectedColor('');
        setCustomColor('');
        setColorSelections([]);
    }


    useEffect(() => {
        setIsColorSelected(selectedColor !== '' || customColor !== '');
    }, [selectedColor, customColor]);

    const createTicket = async () => {
        const newTicket = {
            id: Date.now(),
            betAmount,
            colors: colorSelections,
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
            setBetAmount(1);
            setSelectedColor('');
            setCustomColor('');
            setColorSelections([]);
            Alert.alert(t("loc.alert.success.title"), t("loc.alert.success.body"));
        }
        catch (error) {
            Alert.alert('Error', 'There was an error submitting the ticket');
        }

    };

    const capitalize = (text) => {
        if(!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const ColorButton = ({ title, color }) => {

        const {t} = useTranslation();

        const handleColorPress = () => {
            const colorName = color.toLowerCase();
            const existingColor = colorSelections.find(sel => sel.color === colorName);

            if (existingColor) {
                setColorSelections(colorSelections.map(sel =>
                    sel.color === colorName ? { ...sel, quantity: sel.quantity + 1 } : sel
                ));
            } else {
                setColorSelections([...colorSelections, { color: colorName, quantity: 1}])
            }
        };




        return(
        <TouchableOpacity
            style={[styles.colorButton, {
                background: "blue",
                opacity: isColorSelected && selectedColor !== color.toLowerCase() ? 0.8 : 1
            }]}
            onPress={handleColorPress}>
            <Text style={[styles.glowText, {color: color.toLowerCase()}]}>{capitalize(t(title))}</Text>
        </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Main')}>
                <Icon name="home" size={36} color="#8f0a6d" />
            </TouchableOpacity>

            <Text style={styles.header}>{t('loc.tcs.title')}</Text>

            <Text style={styles.label}>{t('loc.tcs.label')} {betAmount}</Text>
            <Slider
                style={styles.slider}
                value={betAmount}
                onValueChange={setBetAmount}
                minimumValue={1}
                maximumValue={25}
                step={1}
            />

            <View style={styles.colorContainer}>
                <ColorButton title="loc.tcs.white" color="White" />
                <ColorButton title="loc.tcs.black" color="Black" />
                <ColorButton title="loc.tcs.grey" color="Grey" />
                <ColorButton title="loc.tcs.blue" color="Blue" />
                <ColorButton title="loc.tcs.red" color="Red" />
            </View>

            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    setCustomColor(text);
                    setColorQuantity(0); //resting the quantity color
                }}
                value={customColor}
                placeholder={t("loc.tcs.placeholder")}
                placeholderTextColor={"white"}
            />

            {colorSelections.length > 0 && (
                <View style={styles.colorSelectionsContainer}>
                    {colorSelections.map((selection, index) => (
                        <Text key={index} style={styles.colorSelectionText}>
                            {`${selection.quantity} ${t(`loc.tcs.${selection.color}${selection.quantity > 1 ? '_plural' : ''}`, { count: selection.quantity })}`}
                        </Text>
                    ))}
                </View>
            )}


            <MainButton title={t("loc.mainscreen.createticket")} onPress={createTicket} />

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={resetSelections}>
                <Text style={styles.cancelButtonText}>{t("loc.tcs.cancel")}</Text>

            </TouchableOpacity>
        </View>
        </SafeAreaView>
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
        top: 40,
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
    safeArea: {
        flex: 1,
        backgroundColor: '#101d4b',
    },
    colorSelectionsContainer: {
        margin: 10,
    },
    colorSelectionText: {
        color: "white"
    }

});

export default TicketCreationScreen;
