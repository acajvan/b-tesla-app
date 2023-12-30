import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "react-i18next";
import i18n from "../locales/i18n";

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

    const { t } = useTranslation();

    const getColorPluralForm = (color, quantity) => {
        if (quantity > 1){
            return t(`loc.tcs.${color}_plural`)
        }
        else {
            return t(`loc.tcs.${color}`)
        }
    }

    const getLocale = () => {
        return i18n.language;
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
                    <Text style={styles.modalText}>{t("loc.tdm.details")}</Text>
                    <Text style={styles.modalInfo}>{t("loc.vts.caramount")} {ticket.betAmount}</Text>
                        <View style={styles.colorInfoContainer}>
                            <Text style={styles.textColorItem}>{t("loc.vts.atleast") + " "}</Text>
                        {ticket.colors && ticket.colors.map((colorInfo, colorIndex) => (
                            <Text key={colorIndex} style={styles.textColorItemInLine}>
                                {colorInfo.quantity} {getColorPluralForm(colorInfo.color, colorInfo.quantity)}
                                {colorIndex < ticket.colors.length - 1 ? ',' : ''}
                            </Text>
                        ))}
                        </View>
                    <Text style={styles.modalInfo}>{t("loc.vts.date")}: {new Date(ticket.dateCreated).toLocaleDateString(getLocale(), { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>{t("loc.tdm.close")}</Text>
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
    textColorItem: {
        fontSize: 16,
        marginBottom: 10,
    },
    colorInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        fontSize: 16,
        marginBottom: 10,
    },
    textColorItemInLine: {
        marginRight: 5,
        fontSize: 16,

    }
});

export default TicketDetailModal;
