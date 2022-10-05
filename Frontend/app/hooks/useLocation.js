import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default useLocation = () => {

    const [location, setLocation] = useState();
    const [address, setAddress] = useState();

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });
            setAddress(response);
            setLocation({ latitude, longitude });
        } catch (error) {
            console.log(error);
        }
        console.log(location)
    }

    useEffect(() => {
        getLocation();
    }, []);
    return [location, address]
};


