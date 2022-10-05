import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import UserListingScreen from '../screens/UserListingScreen';
import FactCheckScreen from "../screens/FactCheckScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import colors from "../config/colors";


const Stack = createStackNavigator();

const modalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.1, 0.3, 0.7]
            })
        },
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
                extrapolate: "clamp"
            })
        }
    })
};

const AccountFeedNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: true,
            animation: true,
        }}
    >
        <Stack.Screen
            name="Account"
            component={AccountScreen}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="UserListing"
            component={UserListingScreen}
            options={{
                title: 'Your Listings',
                ...TransitionPresets.SlideFromRightIOS,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: colors.secondary,
                    fontSize: 21,
                },
                headerLeft: null,
                headerStyle: {
                    borderBottomLeftRadius: 35,
                    borderBottomRightRadius: 35,
                }
                
            }}

        />
        <Stack.Screen
            name="UserFactCheck"
            component={FactCheckScreen}
            options={{
                title: 'Check the facts',
                ...TransitionPresets.SlideFromRightIOS,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: colors.secondary,
                    fontSize: 20,
                },
                headerLeft: null,
                headerStyle: {
                    borderBottomLeftRadius: 35,
                    borderBottomRightRadius: 35,
                }
            }}
        />
        <Stack.Screen
            name="UsersListings"
            component={ListingDetailsScreen}
            options={{
                title: 'Fact Check',
                ...TransitionPresets.RevealFromBottomAndroid,
                headerShown: false
            }}
        />
        <Stack.Screen
            name='ImageView'
            component={ViewImageScreen}
            options={{ 
                presentation: "transparentModal",
                ...TransitionPresets.RevealFromBottomAndroid,
                headerShown: false
            }}
        />
    </Stack.Navigator>

);

export default AccountFeedNavigator;