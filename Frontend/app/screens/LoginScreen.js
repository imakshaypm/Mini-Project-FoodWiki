import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';
import { useTogglePasswordVisibility } from '../components/passwordHide'

import Screen from '../components/Screen';
import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms/index';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
})

function LoginScreen(props) {

    const { logIn } = useAuth();
    const [loginFaild, setLoginFaild] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();


    const handleSubmit = async ({ email, password }) => {
        //console.log(password)
        const result = await authApi.login(email, password);
        if (!result.ok) return setLoginFaild(true);
        setLoginFaild(false);
        logIn(result.data);
    }

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/LoginScreenLogo.png")}
            />
            <AppForm
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error="Invalid email or password" visible={loginFaild} />
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
                <SubmitButton icon="arrow-right" color="secondary"/>
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.primary,
    },
    logo: {
        width: 100,
        height: 160,
        alignSelf: 'center',
        marginBottom: 20,
    },
    foodwiki: {
        alignSelf: 'center',
    }
})

export default LoginScreen;