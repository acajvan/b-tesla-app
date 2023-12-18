import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MainButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#005eb8',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default MainButton;
