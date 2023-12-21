import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainButton from '../components/MainButton';
import {useNavigation} from "@react-navigation/native";
import {SvgFromUri} from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const MainScreen = () => {

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

    return (
        <SafeAreaView style={styles.safeArea} >
            <StatusBar style="light" backgroundColor="transparent" translucent={true} />
        <View style={styles.container}>
            <SvgFromUri uri={"https://www.svgrepo.com/show/342292/tesla.svg"} width={125} height={125} />
            <Text style={styles.title}>Câte Tesla vedem azi?</Text>
            <Text style={styles.date}>Astăzi: {currentDateTime} </Text>
            <MainButton title="Crează biletul" onPress={() => navigation.navigate('CreateTicket')} />
            <MainButton title="Vezi biletele tale" onPress={() => navigation.navigate('ViewTicket')} />
        </View>
        </SafeAreaView>
);};

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
        color: 'white',
    },
    date:{
        fontSize: 16,
        marginTop: 10,
        textTransform: "capitalize",
        color: 'white',
    },
    credits: {
        fontSize: 10,
        alignItems: "flex-end",
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#101d4b',
    },
});

export default MainScreen;
