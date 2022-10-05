import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Lottie from 'lottie-react-native'

import Card from '../components/Card';
import Screen from '../components/Screen';
import listingsApi from '../api/listings'
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import useLocation from '../hooks/useLocation';



function ListingScreen({ navigation }) {

    const location = useLocation()
    const address = location[1] 
    var addPresnt = false
    var city = []
    var subRegion = []
    var list = []
    
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);

    if(address){
        addPresnt = true
        var city = address.map(function (el) {
            return el["city"];
        });
        var subRegion = address.map(function (el) {
            return el["subregion"];
        });

    }else{
        addPresnt = false
    }

    useEffect(() => {
        const timeountId = setTimeout(() => {
            if (address){
                loadListings()
            }
        },  1500);
        return () => clearTimeout(timeountId);
    }, [address]);

    const loadListings = async () => {
        try {
            setLoading(true);
            const response = await listingsApi.getListings({ screen: "ListingScreen" });
            setLoading(false);

            if (!response.ok) {
                loadListings()
                console.log("Here")
            }

            var count = 0
            var loca = response.data
            while (count != loca.length) {
                if (loca[count]._doc.city == city[0]) {
                    list.push(loca[count])
                }
                count++
            }
            if (listings == []) {
                loadListings()
            }
            setError(false);
            setListings(list);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.screen}>
                {!addPresnt ? 
                    <View style={styles.locationCheak}>
                        <Lottie
                            autoPlay
                            loop
                            resizeMode='center'
                            source={require('../assets/animations/addressLoading.json')}
                            style={{ width: "15%" }}
                        />
                    </View>
                    :
                    <View style={styles.locationDetailsTop} >
                        <MaterialCommunityIcons
                            name='map-marker'
                            size={35}
                            color={colors.secondary}
                        />
                        <AppText style={styles.cityAndSub}>
                            {city[0] + ', ' + subRegion[0]}
                        </AppText>
                    </View>
                }
                {error && <>
                    <AppText>Could't retrive the listings.</AppText>
                    <AppButton title='Retry' onPress={loadListings} />
                </>}
                <FlatList
                    data={listings}
                    keyExtractor={listing => listing._doc._id.toString()}
                    renderItem={({ item }) =>
                        <Card
                            title={item._doc.title}
                            subTitle={item._doc.categoryId == 1 ? "Vegiterian" : "Non Vegiterian"}
                            imageUrl={item.images[0].url}
                            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                            location={item._doc.location}
                            phoneNumber={item._doc.phone}
                        />
                    }
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                    style={{ borderRadius: 15}}
                    onRefresh={() => loadListings()}
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    cityAndSub: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.medium
    },
    locationDetailsTop: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 5,
        zIndex: 1,
    },
    locationCheak: {
        zIndex: 1,
        overflow: 'hidden',
        height: 50,
        marginBottom: 0
    },
    screen: {
        padding: 5,
        backgroundColor: colors.light,
        width: "100%",
        flex: 1,
        paddingBottom: 40,
        marginBottom: -7,
    },
})

export default ListingScreen;