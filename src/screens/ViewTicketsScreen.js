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
            if (storedTickets) setTickets(JSON.parse(storedTickets));
        };

        loadTickets();
    }, []);


    return (
        <View style={styles.container}>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('Main')}>
                    <Icon name="home" size={36} color="#8f0a6d" />
                </TouchableOpacity>



            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Your Tickets</Text>
                {tickets.map((ticket, index) =>(
                    <TouchableOpacity key={index} style={styles.ticketItem} onPress={() => {
                        setSelectedTicket(ticket);
                        setModalVisible(true);
                    }}>
                        <Text>Bet Amount: {ticket.betAmount}</Text>
                        <Text>Color: {ticket.color}</Text>
                        <Text>Date: {new Date(ticket.dateCreated).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TicketDetailModal ticket={selectedTicket} onClose={() => setModalVisible(false)} />
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
        paddingTop: 80,
    },
    homeButton: {
        position: "fixed",
        top: 60,
        left: 20,
        zIndex: 10
    },
    header: {
        fontSize: 22,
        color: 'white',
        marginBottom: 20,
    },
    ticketItem: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    }
});



export default ViewTicketsScreen;