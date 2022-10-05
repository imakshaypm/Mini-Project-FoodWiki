import React from 'react';
import Lottie from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({ visible = false, search = false }) {

    if (!visible) return null;

    return (
        <>
            {!search && 
            <View style={styles.overlay}>
                <Lottie
                    autoPlay
                    loop
                    source={require('../assets/animations/apploading2.json')}
                />
            </View>}
            {search &&
                <View style={styles.overlay}>
                    <Lottie
                        autoPlay
                        loop
                        source={require('../assets/animations/search.json')}
                    />
                </View>}

        </>        
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.8,
    },
})

export default ActivityIndicator;