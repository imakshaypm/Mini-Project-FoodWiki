import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default useAddress = (coordinates) => {

    const [address, setAddress] = useState();

    const getAddress = async () => {
        var latitude = coordinates["location"]["latitude"]
        var longitude = coordinates["location"]["longitude"]
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });
        setAddress(response)
    }
    useEffect(getAddress())
    return address
}