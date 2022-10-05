import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ViewImageScreen from '../screens/ViewImageScreen';

const Stack = createStackNavigator();

const ImageViewNavigator = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false, animation: true }}
    >
        <Stack.Screen
            name='ListingDetails'
            component={ListingDetailsScreen}
            options={{
                title: 'ImageView',
                ...TransitionPresets.RevealFromBottomAndroid,
            }}
        />
        <Stack.Screen
            name='ImageView'
            component={ViewImageScreen}
            options={{
                title: 'ImageView',
                ...TransitionPresets.RevealFromBottomAndroid,
            }}
        />
        
    </Stack.Navigator>
);

export default ImageViewNavigator;