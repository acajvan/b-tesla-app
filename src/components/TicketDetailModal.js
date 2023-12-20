import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const TicketDetailModal = ({ ticket, onClose, onDelete }) => {
    if (!ticket) return null;

    const deleteTicket = async () => {
        try {
            const storedTickets = await AsyncStorage.getItem('tickets');
            let tickets = storedTickets ? JSON.parse(storedTickets) : [];

            tickets = tickets.filter((t) => t.id !== ticket.id);

            await AsyncStorage.setItem('tickets', JSON.stringify(tickets));

            onClose();
            onDelete();
        }
        catch (error) {
            console.error('Failed to delete the ticket:', error);
        }
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
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!ticket}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Detalii</Text>
                    <Text style={styles.modalInfo}>Nr. de masini: {ticket.betAmount}</Text>
                    {ticket.color ?
                        <Text style={styles.modalInfo}>Dintre care: {ticket.colorQuantity} {getColorPluralForm(ticket.color, ticket.colorQuantity)} </Text>
                        : null
                    }
                    <Text style={styles.modalInfo}>Date: {new Date(ticket.dateCreated).toLocaleDateString('ro-RO', { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={deleteTicket}>
                            <Icon name="trash" size={26} color="#FF0000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#7987c9',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.70,
        shadowRadius: 6,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalInfo: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonClose: {
        backgroundColor: '#8f0a6d',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    actionButton: {
        padding: 5,
        marginLeft: 10
    },
});

export default TicketDetailModal;
