import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import expoPushTokenApi from '../api/expoPushToken';
import { Platform } from 'react-native';

export default useNotifications = (notificationListener) => {

    useEffect(() => {
        registerForPushNotifications();
        if (notificationListener) Notifications.addPushTokenListener(notificationListener);
    }, []);

    const registerForPushNotifications = async () => {
        try {
            const permissions = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!permissions.granted) return;

            const token = await Notifications.getExpoPushTokenAsync();
            expoPushTokenApi.register(token);
            console.log(token)
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                }),
            });
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    sound: true,
                    lightColor: '#FF231F7C',
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                });
                console.log("success")
            } else {
                console.log("failed")
            }
        } catch (error) {
            console.log('Error getting a push token', error);
        }
        
    }
}