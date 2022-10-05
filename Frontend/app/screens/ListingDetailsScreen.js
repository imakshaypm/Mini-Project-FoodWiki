import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, TouchableOpacity, Alert, Linking, ScrollView } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import routes from '../navigation/routes';
import users from '../api/getUser'
import AppButton from '../components/AppButton';

function ListingDetailsScreen({ route, navigation }) {

    var user
    const [name, setName] = useState();
    const [list, setList] = useState();
    const listing = route.params;

    const images = route.params["images"];
    const ia = images.map((e) => e["url"]);
    var objs = ia.map(x => ({
        url: x,
    }));
    
    useEffect(() => {
        loadUser()
    }, [])
    
    const loadUser = async () => {
       try {
           const response = await users.getUsersById({ userID: listing._doc.userId, screen: "ListDetailScreen" });
           if (!response.ok) return console.log("Error");
           user = response.data
           setName(user.name)
           console.log(name)
           setList(user.noList)
       } catch (error) {
        console.log(error)
       }
    };
    const rightSwipeActions = () => {
        return (
            <TouchableOpacity style={{justifyContent: 'center'}} >
                <View
                    style={{
                        justifyContent: 'center',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        alignItems: 'center',

                    }}
                >
                    <MaterialCommunityIcons color={colors.danger} name="heart-plus" size={25} />
                    <Text
                        style={{
                            color: '#1b1a17',
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            color: colors.danger
                        }}
                    >Favotite
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const showAlert = (lan, lon, title) => {
        if (lan && lon == null) {
            Alert.alert(
                "No location is available",
                "You can use call option",
                [{
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }
                ],
            );
        } else {
            Alert.alert(
                "Want to know the location of " + title + "?",
                "",
                [
                    {
                        text: "Yes",
                        onPress: () => openGps(lan, lon)
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                ],
            );
        }
    }

    const showAlertOnCall = (number, title) => {
        Alert.alert(
            "Do you want to call " + title + "?",
            "",
            [
                {
                    text: "Yes",
                    onPress: () => makeCall(number)
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                }
            ],
        );
    }

    const openGps = (lat, lng) => {
        const scheme = `${Platform.OS === 'ios' ? 'maps' : 'geo'}:0,0?q=`;
        const link = Platform.select({
            ios: `${scheme}$@${lat},${lng}`,
            android: `${scheme}${lat},${lng}`
        });
        Linking.openURL(link);
    }

    const makeCall = (pNumber) => {
        const phoneNumber = `${Platform.OS !== 'android' ? 'telprompt' : 'tel'}:${pNumber}`;
        Linking.openURL(phoneNumber)
    }

    return (
        <ScrollView showsVerticalScrollIndicator = {false} >
            <View>
                <TouchableHighlight
                    onPress={() => navigation.navigate(routes.VIEW_IMAGE, objs)}
                >
                    <Image
                        style={styles.image}
                        tint="light"
                        preview={{ uri: listing.images[0].thumbnailUrl }}
                        uri={listing.images[0].url}
                    />
                </TouchableHighlight>
                <View style={styles.detailsContainer}>
                    <View style={{ flexDirection: 'row', marginRight: 70, alignItems: 'center' }} >
                        <AppText style={styles.title}>{listing._doc.title}</AppText>
                        <View style={{ flexDirection: 'row' }}>
                            <AppButton color='secondary' inListDetails={true} icon={"phone"} size={8} onPress={() => showAlertOnCall(listing._doc.phone, listing._doc.title)} />
                            <AppButton inListDetails={true} icon={"map-marker"} size={8} onPress={() => showAlert(listing._doc.location.latitude, listing._doc.location.longitude, listing._doc.title)} />
                        </View>
                    </View>
                    {listing._doc.categoryId == 1 && <AppText style={styles.sub}>{"Vegiterian"}</AppText>}
                    {listing._doc.categoryId == 2 && <AppText style={styles.sub}>{"Non Vegiterian"}</AppText>}
                    {listing._doc.categoryId == 3 && <AppText style={styles.sub}>{"Vegiterian & Non Vegiterian"}</AppText>}
                    <View style={styles.dishlist}>
                        <ListItem
                            title={"Dish: " + listing._doc.dishone}
                            subTitle={"Price: ₹" + listing._doc.doneprice}
                            isIconNeed={false}
                            renderRightActions={rightSwipeActions}
                        />
                        {listing._doc.dishtwo != "" && <ListItem
                            title={"Dish: " + listing._doc.dishtwo}
                            subTitle={"Price: ₹" + listing._doc.dtwoprice}
                            isIconNeed={false}
                            renderRightActions={rightSwipeActions}
                        />}{listing._doc.dishthree != "" && <ListItem
                            title={"Dish: " + listing._doc.dishthree}
                            subTitle={"Price: ₹" + listing._doc.dthreeprice}
                            isIconNeed={false}
                            renderRightActions={rightSwipeActions}
                        />}
                    </View>
                    <View style={styles.userContainer}>
                        <ListItem
                            title={name}
                            imageProfile={name}
                            subTitle={list + " Listing"}
                            isIconNeeded={false}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dishlist: {
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    bottomButtons: {
        flexDirection: 'row',
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 300,
    },
    sub: {
        color: colors.secondary,
        fontSize: 18,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
    },
    userContainer: {
        marginVertical: 10,
    },
})

export default ListingDetailsScreen;