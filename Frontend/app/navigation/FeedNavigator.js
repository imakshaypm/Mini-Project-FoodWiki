import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import ListingScreen from '../screens/ListingScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ViewImageScreen from '../screens/ViewImageScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator
        mode='model'
        screenOptions={{ headerShown: false, animation: true }}
    >
        <Stack.Screen 
            name='Listing'
            component={ListingScreen}
        />
        <Stack.Screen
            name='ListingDetails'
            component={ListingDetailsScreen}
            options={{
                title: 'ListingDetails',
                ...TransitionPresets.RevealFromBottomAndroid,
            }}
        />
        <Stack.Screen
            name='ImageView'
            component={ViewImageScreen}
            options={{
                title: 'ListingDetails',
                ...TransitionPresets.RevealFromBottomAndroid,
            }}
        />
        
    </Stack.Navigator>
);

export default FeedNavigator;