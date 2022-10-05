import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from '../config/colors';
import AppText from './AppText';

function ListItem({ elevation = 0, isIconNeeded = false, isIcon2Need = false, title, subTitle, image, IconComponent, onPress, renderRightActions, isIconNeed = false, renderLeftActions }) {
    return (
        <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            containerStyle={{ borderRadius: 15, margin: 10, elevation: elevation, }}
        >
            <TouchableHighlight
                underlayColor={colors.light}
                onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailContainer}>
                        <AppText style={styles.title} numberOfLines={2} >{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>}
                    </View>
                    {isIconNeeded ?
                        <>
                            {!isIconNeed && !isIcon2Need && <MaterialCommunityIcons color={colors.medium} name="chevron-right" size={25} />}
                            {isIconNeed && <MaterialCommunityIcons color={colors.medium} name="arrow-left-thin" size={25} />}
                            {isIcon2Need && <MaterialCommunityIcons color={colors.danger} name="delete" size={25} />}
                        </>
                        : null}
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    righttext: {
        alignItems: 'flex-end'
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        padding: 12,
        backgroundColor: colors.white,
        borderRadius: 15,

    },
    detailContainer: {
        marginLeft: 15,
        justifyContent: 'center',
        //backgroundColor: 'black',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
})

export default ListItem;