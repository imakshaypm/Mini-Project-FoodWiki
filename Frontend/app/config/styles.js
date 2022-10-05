import { Platform } from 'react-native';
import { useFonts } from 'expo-font';

import colors from './colors';


export default {
    colors,
    text: {
        color: colors.dark,
        fontSize: 17,
        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
        width: '80%'
    },
};