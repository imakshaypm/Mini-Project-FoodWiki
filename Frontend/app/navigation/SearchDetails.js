import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const SearchDetails = () => (
    <Stack.Navigator mode='modal' screenOptions={{ headerShown: false, animation: true }}>
        <Stack.Screen
            name='Search'
            component={SearchScreen}
        />
        <Stack.Screen
            name='ListingDetails'
            component={ListingDetailsScreen}
            options={{
                title: 'ListingDetails',
                ...TransitionPresets.RevealFromBottomAndroid,
            }}
        />
    </Stack.Navigator>
);

export default SearchDetails;