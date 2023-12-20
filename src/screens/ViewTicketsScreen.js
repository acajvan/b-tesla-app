import React, {useEffect, useState} from "react";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TicketDetailModal from "../components/TicketDetailModal";

const ViewTicketsScreen = () => {
    const navigation = useNavigation();
    const [tickets, setTickets] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const loadTickets = async () => {
            const storedTickets = await AsyncStorage.getItem('tickets');
            if (storedTickets)
            {
                let tickets = JSON.parse(storedTickets);
                tickets.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setTickets(tickets);
            }


        };

        loadTickets();
    }, []);

    const loadTickets = async () => {
        const storedTickets = await AsyncStorage.getItem('tickets');
        if (storedTickets)
        {
            let tickets = JSON.parse(storedTickets);
            tickets.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

            setTickets(tickets);
        }
    }

    const handleDeleteTicket = () => {
        setModalVisible(false);
        loadTickets();
    }

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
            <ScrollView style={styles.scrollContainer}>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('Main')}>
                    <Icon name="home" size={36} color="#8f0a6d" />
                </TouchableOpacity>




                <Text style={styles.header}>Biletele tale</Text>
                {tickets.map((ticket, index) =>(
                    <TouchableOpacity key={index} style={styles.ticketItem} onPress={() => {
                        setSelectedTicket(ticket);
                        setModalVisible(true);
                    }}>
                        <Text style={styles.textColorItem} >Nr. de masini: {ticket.betAmount}</Text>
                        {ticket.color ?
                            <Text style={styles.textColorItem} >Dintre care: {ticket.colorQuantity} {getColorPluralForm(ticket.color, ticket.colorQuantity)}</Text>
                            : null
                        }
                        <Text style={styles.textColorItem} >Data: {new Date(ticket.dateCreated).toLocaleDateString('ro-RO', { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.footer}>
                    <Text style={styles.textColorItem}>Bafta ;) </Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TicketDetailModal ticket={selectedTicket} onClose={() => setModalVisible(false)} onDelete={handleDeleteTicket} />
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    scrollContainer: {
        paddingTop: 40,
        paddingBottom: 160
    },
    homeButton: {
        marginVertical: 20,
        alignSelf: "flex-start",
        padding: 10
    },
    header: {
        fontSize: 22,
        color: 'white',
        marginBottom: 20,
    },
    ticketItem: {
        backgroundColor: "#97abff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textColorItem: {
        color: "white",
        fontSize: 20,
    },
    footer: {
        flex: 1,
        padding: 10,
        marginBottom: 50
    }
});



export default ViewTicketsScreen;