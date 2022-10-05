import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from '../config/colors';

function AppButton({ inListDetails = false,  title, onPress, color = "primary", icon, size, width, widthColor = "primary" }) {
    return (
        <>
            {icon && title ? <TouchableOpacity
                style={[styles.buttonAndT, { width: width }, { backgroundColor: colors[color] }]}
                onPress={onPress}
            >
                <MaterialCommunityIcons name={icon} size={size} />
                <Text style={styles.buttonAndText}>{title}</Text>
            </TouchableOpacity>: null}

            {!title && !width && !inListDetails ? <TouchableOpacity
                style={[{ backgroundColor: colors[color], borderColor: colors[widthColor], }, styles.buttonIcon]}
                onPress={onPress}
            >
                <MaterialCommunityIcons name={icon} size={60} style={styles.iconStyle} />
            </TouchableOpacity> : null}

            {!title && width ? <TouchableOpacity
                style={[styles.buttonIconWidth, { backgroundColor: colors[color] }]}
                onPress={onPress}
            >
                <MaterialCommunityIcons name={icon} size={30} style={styles.iconStyle} />
            </TouchableOpacity> : null }

            {!icon && <TouchableOpacity
                style={[styles.button, { width: width }, {backgroundColor: colors[color]}]}
                onPress={onPress}
            >
            <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>}
            {!title && !width && inListDetails ? <TouchableOpacity
                style={{ justifyContent: 'center', borderRadius: 25, width: 50, height: 50, marginLeft: 10, elevation: 10, backgroundColor: colors[color] }}
                onPress={onPress}
            >
                <MaterialCommunityIcons name={icon} size={25} style={styles.iconStyle} />
            </TouchableOpacity> : null}
        </>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        alignSelf: 'center',
    },
    buttonAndT: {
        flex: 1,
        margin: 5,
        flexDirection: 'row',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 55,
        marginVertical: 10,
        elevation: 10,
    },
    buttonIcon: {
        borderRadius: 50,
        justifyContent: 'center',
        width: 100,
        height: 100,
        marginVertical: 30,
        alignSelf: "center",
        borderWidth: 5,
        elevation: 10,
    },
    buttonIconWidth: { 
        borderRadius: 25,
        justifyContent: 'center',
        width: 50,
        height: 50,
        alignSelf: "center",
        borderColor: colors.secondary,
        borderWidth: 5,
        marginLeft: 6,
        elevation: 10,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        height: 55,
        marginVertical: 10,
        elevation: 10
    },
    text: {
        color: colors.black,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding:1,
    },
    buttonAndText: {
        color: colors.black,
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: 1,
    },
})

export default AppButton;