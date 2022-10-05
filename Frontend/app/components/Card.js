import React from 'react';
import { Alert, View, StyleSheet, TouchableWithoutFeedback, Linking, Text } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl, location, phoneNumber }) {

    const showAlert = (lan, lon, title) => {
        if (lan && lon == null) {
            Alert.alert(
                "No location is available",
                "You can use call option",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }
                ],
            );
        } else {
            Alert.alert(
                "Want to know the location of "+ title +"?",
                "",
                [
                    {
                        text: "Yes",
                        onPress: () => openGps(lan, lon)
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    }
                ],
            );
        }
    }

    const showAlertOnCall = (number, title) => {
        Alert.alert(
            "Do you want to call "+title+"?",
            "",
            [
                {
                    text: "Yes",
                    onPress: () => makeCall(number)
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ],
        );
    }

    const openGps = (lat, lng) => {
        const scheme = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
        const link = Platform.select({
            ios: `${scheme}$@${lat},${lng}`,
            android: `${scheme}${lat},${lng}`
        });
        Linking.openURL(link);
    }

    const makeCall = (pNumber) => {
        const phoneNumber = `${Platform.OS !== 'android' ? 'telprompt' : 'tel'}:${pNumber}`;
        Linking.openURL(phoneNumber)
    }

    return (
        <View style={styles.card}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.side}>
                    <Image
                        style={styles.image}
                        tint="light"
                        preview={{ uri: thumbnailUrl }}
                        uri={imageUrl}
                    />
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        <AppText style={styles.subTitle}>{subTitle}</AppText>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.bottomButtons}>
                <AppButton
                    title="Call"
                    icon='phone'
                    size={22}
                    width="47%"
                    color="secondary"
                    onPress={() => showAlertOnCall(phoneNumber, title)}
                />
                <AppButton
                    title="Direction"
                    icon='map-marker'
                    size={22}
                    width="47%"
                    onPress={() => showAlert(location.latitude, location.longitude, title)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomButtons: {
        flexDirection: 'row',
    },
    side: {
        flexDirection: 'row',
    },
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        margin: 20,
        overflow: 'hidden',
        padding: 10,
        elevation: 10,
    },
    detailsContainer: {
        padding: 10,

    },
    subTitle: {
        color: colors.medium,
        fontWeight: '100',
    },
    title: {
        fontSize: 18,
        width: 170

    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 15,
    },
})
export default Card;