import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';



export default function MapScreen() {

    return (
        <View style={styles.container}>
            <MapView style={styles.map} onMarkerSelect={setLocation}>
                <Marker coordinate={location} />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});