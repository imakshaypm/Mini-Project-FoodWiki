import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground
            blurRadius={1}
            style={styles.background}
            source={require("../assets/background.jpg")}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/RegisterScreenLogo.png")} />
                <Text style={styles.tagline}>Explore The Unexplored</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
                <AppButton title="Register" color='secondary' onPress={() => navigation.navigate("Register")} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonContainer: {
        padding: 10,
        width: "100%",
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 300,
        
    },
    logoContainer: {
        position: 'absolute',
        top: 150,
        alignItems: "center",
    },
    tagline: {
        fontSize: 30,
        fontWeight: "600",
        paddingVertical: 20,
    },
})

export default WelcomeScreen;