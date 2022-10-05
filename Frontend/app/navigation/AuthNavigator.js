import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ 
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerStyle: { backgroundColor: colors.primary },
                title: 'Login',
                ...TransitionPresets.RevealFromBottomAndroid,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    fontSize: 30,
                    marginTop: 20
                },
                headerLeft: null
            }}
        />
        <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
                headerStyle: { 
                    backgroundColor: colors.secondary,
                    borderColor: 'white',
                },
                title: 'Register',
                ...TransitionPresets.RevealFromBottomAndroid,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    fontSize: 30,
                    marginTop: 20
                },
                headerLeft: null
            }}
        />
    </Stack.Navigator>
);

export default AuthNavigator;