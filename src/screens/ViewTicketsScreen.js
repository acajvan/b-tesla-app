import React, {useEffect, useState} from "react";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TicketDetailModal from "../components/TicketDetailModal";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useTranslation} from "react-i18next";
import i18n from "../locales/i18n";

const ViewTicketsScreen = () => {
    const navigation = useNavigation();
    const [tickets, setTickets] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const { t } = useTranslation();

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
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Main')}>
                        <Icon name="home" size={36} color="#8f0a6d" />
                    </TouchableOpacity>
                    <Text style={styles.header}>{t("loc.vts.yourtickets")}</Text>
                    {tickets.map((ticket, index) =>(
                        <TouchableOpacity key={index} style={styles.ticketItem} onPress={() => {
                            setSelectedTicket(ticket);
                            setModalVisible(true);
                        }}>
                            <Text style={styles.textColorItem} >{t("loc.vts.caramount")} {ticket.betAmount}</Text>
                            {ticket.color ?
                                <Text style={styles.textColorItem} >{t("loc.vts.atleast")} {ticket.colorQuantity} {getColorPluralForm(ticket.color, ticket.colorQuantity)}</Text>
                                : null
                            }
                            <Text style={styles.textColorItem}>{t("loc.vts.date")}: {new Date(ticket.dateCreated).toLocaleDateString(getLocale(), { day: 'numeric', month: 'numeric', year: 'numeric' })}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.footer}>
                        <Text style={styles.textColorItem}>{t("loc.vts.goodluck")} ;) </Text>
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    scrollContainer: {
        paddingTop: 20,
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
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#101d4b',
    },
});



export default ViewTicketsScreen;