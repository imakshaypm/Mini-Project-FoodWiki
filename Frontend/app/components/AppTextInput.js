import React from 'react';
import { View, StyleSheet, TextInput, Button, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from '../config/styles';
import AppButton from './AppButton';

function AppTextInput({ rightIconPress, rightIcon, icon, width = '100%', elevation,  ...otherProps }) {
    return (
        <View style={[styles.container, { width }, { elevation }]}>
            {icon ? <MaterialCommunityIcons
                name={icon}
                size={25}
                color={defaultStyles.colors.medium}
                style={styles.icons} />: null}
            <TextInput
                placeholderTextColor={defaultStyles.colors.medium}
                style={defaultStyles.text} {...otherProps} />
            {rightIcon ?
                <Pressable onPress={rightIconPress} >
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={25}
                        color={defaultStyles.colors.medium}
                        style={styles.icons}
                    /> 
            </Pressable>
            : 
            null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.white,
        borderRadius: 15,
        flexDirection: "row",
        padding: 12,
        marginVertical: 10,
    },
    icons: {
        marginRight: 5,
        alignSelf: 'center'
    },
})

export default AppTextInput;