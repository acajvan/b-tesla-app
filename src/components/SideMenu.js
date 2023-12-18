import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SideMenu = () => {
    return (
        <View style={styles.container}>
            <Text>SideMenu1</Text>
            <Text>SideMenu2</Text>
            {/* Add more menu items here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default SideMenu;
