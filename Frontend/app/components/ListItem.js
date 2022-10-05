import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight,Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from '../config/colors';
import AppText from './AppText';

function ListItem({ imageProfile, subIcon, iconColor, elevation = 0, isIconNeeded = false, isIcon2Need = false, title, subTitle, image, IconComponent, onPress, renderRightActions, isIconNeed = false, renderLeftActions }) {
    return (
        <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            containerStyle={{ backgroundColor: colors.black, borderRadius: 15, margin: 10, elevation: elevation, }}
        >
            <TouchableHighlight
                underlayColor={colors.light}
                onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    {image && <Image style={styles.image} source={image} />}
                    {imageProfile && 
                        <View style={styles.imageProfile} >
                            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: colors.black }} >{imageProfile.charAt(0)}</Text>
                        </View>
                    }
                    <View style={styles.detailContainer}>
                        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                        {subTitle && !subIcon ? <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>: null}
                        {subTitle && subIcon ?
                            <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                <MaterialCommunityIcons name={subIcon} color={colors[iconColor]} size={20} />
                                <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
                             </View>
                             : 
                             null
                        }
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
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    detailContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    imageProfile:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
})

export default ListItem;