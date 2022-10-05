import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from '../../config/colors';

function FormButton({ onPress, color = "primary", icon }) {
    return (
        <TouchableOpacity style={[ styles.button, { backgroundColor: colors[color] }]} onPress={onPress}>
            <MaterialCommunityIcons name={icon} size={100}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        marginVertical: 50,
        alignSelf: "center",
    },
    text: {
        color: colors.black,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})

export default FormButton;