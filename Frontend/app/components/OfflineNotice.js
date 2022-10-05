import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';
import AppText from './AppText';

function OfflineNotice(props) {

    const netInfo = useNetInfo();

    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
        return (
            <View style={styles.container}>
                <AppText style={styles.text} >No Internet Connection</AppText>
            </View>
        );

    return null;
}

const styles = StyleSheet.create({
    container: {
        elevation: (Platform.OS === 'android') ? 1 : 0,
        backgroundColor: colors.secondary,
        height: 25,
        position: "absolute",
        top: Constants.statusBarHeight,
        width: "100%",
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.black,
        fontSize: 14,
        textAlign: 'center'
    },
})
export default OfflineNotice;