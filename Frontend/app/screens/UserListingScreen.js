import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import Lottie from 'lottie-react-native';

import Screen from '../components/Screen';
import listingsApi from '../api/listings'
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import ActivityIndicator from '../components/ActivityIndicator';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';



function UserListingScreen({ route, navigation }) {

    const users = route.params
    //console.log(users)
    var list = []

    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {

        setLoading(true);
        const response = await listingsApi.getListings({ screen: "UserListing", userID: users.userId });
        setLoading(false);

        if (!response.ok) return setError(true);

        var count = 0
        var loca = response.data
        //console.log(loca[1]._doc)
        while (count != loca.length) {
            if (loca[count]._doc.userId == users.userId) {
                list.push(loca[count])
            }
            count++
        }
        setError(false);
        setListings(list);
    };

    const sendDeleteList = async (listID, SwipeDirecton) => {
        const response = await listingsApi.verifyList({ ListId: listID, userID: users.userId, SwipeDirection: SwipeDirecton })
        console.log(response.originalError)
    }

    const rightSwipeActions = (list) => {
        const deleteListings = () => {
            Alert.alert(
                "Do you want to delete " + list.title + " ?",
                "",
                [
                    {
                        text: "Yes!",
                        onPress: () => {
                            sendDeleteList(list._id, "delete")
                            loadListings()
                        },
                        style: "cancel"
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                ],
            );
        }
        return (
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={deleteListings} >
                <View
                    style={{
                        justifyContent: 'center',
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <MaterialCommunityIcons color={colors.danger} name="delete" size={25} />
                    <Text
                        style={{
                            color: '#1b1a17',
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            color: colors.danger,
                        }}
                    >Delete
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <>
            <ActivityIndicator visible={loading} />
            <Screen style={styles.screen}>
                {error && <>
                    <AppText>Could't retrive the listings.</AppText>
                    <AppButton title='Retry' onPress={loadListings} />
                </>}
                <View style={styles.container} >
                    {listings.length != 0 ? <FlatList
                        data={listings}
                        keyExtractor={listing => listing._doc._id.toString()}
                        ItemSeparatorComponent={ListItemSeparator}
                        renderItem={({ item }) =>
                            <ListItem
                                title={item._doc.title}
                                subTitle={(item._doc.popularity) > 5 ? "Verified" : "Pending..."}
                                subIcon={(item._doc.popularity) > 5 ? "check" : "clock-time-two-outline"}
                                iconColor={(item._doc.popularity) > 5 ? "ligthGreen" : "danger"}
                                image={{ uri: item.images[0].url }}
                                onPress={() => navigation.navigate(routes.USERS_LISTS, item)}
                                isIconNeed={true}
                                renderRightActions={() => rightSwipeActions(item._doc)}
                                isIconNeeded={true}
                                elevation={5}
                            />
                        }
                        refreshing={refreshing}
                        showsVerticalScrollIndicator={false}
                        style={{ borderRadius: 15 }}
                        onRefresh={() => loadListings()}
                    />
                    :
                        <View style={{ justifyContent: 'center', marginTop: -180, alignSelf: 'center', flex: 1 }}>
                            <Lottie
                                autoPlay
                                loop
                                source={require('../assets/animations/lf30_editor_gtxcu6sz.json')}
                            />
                            <View style={{ marginTop: 200, width: "100%" }}>
                                <AppText>No contributions yet</AppText>
                            </View>
                        </View>
                    }
                </View>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical: -2,
    },
    screen: {
        padding: 8,
        marginTop: -20,
        backgroundColor: colors.light,
        width: "100%",
        paddingBottom: 40,
        marginBottom: -7,
    },
})

export default UserListingScreen;