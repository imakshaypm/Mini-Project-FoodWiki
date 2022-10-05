import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import colors from '../config/colors';
import SearchDetails from './SearchDetails';
import useNotifications from '../hooks/useNotifications';
import AccountFeedNavigator from './AccountFeedNavigatoi';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    useNotifications();

    const addSize = 5;

    return(
        <Tab.Navigator
            sceneContainerStyle={{
                backgroundColor: colors.white
            }}
            tabBarOptions={{
                activeTintColor: colors.secondary,
                style: {
                    height: 65,
                    backgroundColor: colors.black,
                    borderTopStartRadius: 25,
                    borderTopEndRadius: 25,
                    position: 'absolute',
                    overflow: 'hidden',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    padding: 5,
                },
                adaptive: true,
                
            }}
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => {
                    let label;
                    return label = focused ? <Text
                        style={{ 
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: colors.secondary,
                            marginBottom: 8,
                        }}>{route.name}</Text> : null
                },
            })}

        >
            <Tab.Screen
                name='Feed'
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({ color, size}) => <MaterialCommunityIcons name='home' color={color} size={size + addSize} />,
            
                }}
            />
            <Tab.Screen
                name='Add'
                component={ListingEditScreen}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialCommunityIcons name='plus-circle-outline' color={color} size={size + addSize} />,
                    
                }}
            />
            <Tab.Screen
                name='Search'
                component={SearchDetails}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialCommunityIcons name='magnify' color={color} size={size + addSize} />,

                }}
            />
            <Tab.Screen
                name='Account'
                component={AccountFeedNavigator}
                options={{
                    tabBarIcon: ({ color, size }) =>
                        <MaterialCommunityIcons name='account' color={color} size={size + addSize} />
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;