import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TicketDetailModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!ticket}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Ticket Details</Text>
                    <Text style={styles.modalInfo}>Amount Bet: ${ticket.betAmount}</Text>
                    <Text style={styles.modalInfo}>Color: {ticket.color}</Text>
                    <Text style={styles.modalInfo}>Quantity of Color: {ticket.colorQuantity}</Text>
                    <Text style={styles.modalInfo}>Date: {new Date(ticket.dateCreated).toLocaleDateString()}</Text>
                    {/* Include any other information you want to show */}
                    <TouchableOpacity
                        style={styles.buttonClose}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TicketDetailModal;
