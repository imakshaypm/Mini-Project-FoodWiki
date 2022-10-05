import React, { useState } from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import { useTogglePasswordVisibility } from '../components/passwordHide'
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../components/forms";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import authApi from '../api/auth';
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    city: Yup.string().required().label("City")
});


function RegisterScreen() {
    
    const registerApi = useApi(usersApi.register);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    const loginApi = useApi(authApi.login);
    const auth = useAuth();
    const [error, setError] = useState();

    const handleSubmit = async (userInfo) => {
        const result = await registerApi.request(userInfo);
        if (!result.ok) {
            if (result.data) setError(result.data.error);
            else {
                setError("An unexpected error occured.")
                console.log(result);
            }
            return;
        }

        const { data: authToken } = await loginApi.request(
            userInfo.email,
            userInfo.password,
        );
        auth.logIn(authToken);
        //console.log(authToken)
    }

    return (
        <>
            <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
            <ScrollView automaticallyAdjustContentInsets={true} >
                <Screen style={styles.container}>
                    <AppForm
                        initialValues={{ name: "", email: "", password: "", city: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Image
                            style={styles.logo}
                            source={require("../assets/RegisterScreenLogo.png")}
                        />
                        {error && <ErrorMessage error={error} visible={true} />}
                        <AppFormField
                            autoCorrect={false}
                            icon="account"
                            name="name"
                            placeholder="Name"
                            elevation={10}
                        />
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAddress"
                            elevation={10}
                        />
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            secureTextEntry={passwordVisibility}
                            textContentType="password"
                            elevation={10}
                            enablesReturnKeyAutomatically
                            rightIcon={rightIcon}
                            rightIconPress={handlePasswordVisibility}
                        />
                        <AppFormField
                            autoCorrect={false}
                            icon="city"
                            name="city"
                            placeholder="City"
                            elevation={10}
                        />
                        <SubmitButton icon="arrow-right" widthColor="secondary" />
                    </AppForm>
                </Screen>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.secondary,
        paddingBottom: 50,
    },
    logo: {
        width: 100,
        height: 170,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default RegisterScreen;
