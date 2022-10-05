import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Lottie from 'lottie-react-native';

import Screen from '../components/Screen';
import ListItem from '../components/ListItem'
import listingsApi from '../api/listings'
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';


function FactCheckScreen({ navigation, route }) {

    const users = route.params
    var list = []
    //console.log(users)
    var approvedList
    var applen
    const [approvedLength, setApprovedLength] = useState();
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefresing] = useState(false);

    useEffect(() => {
        loadListings();
    }, []);
    const loadListings = async () => {
        try {
            setLoading(true);
            const response = await listingsApi.getListings({ screen: "FactScreen" })
            const getUsers = await listingsApi.getUser({ userID: users.userId, screen: "FactScreen" })
            setLoading(false);

            if (!response.ok) {
                loadListings()
            }

            var count = 0
            var loca = response.data
            approvedList = getUsers.data[0].approved
            setApprovedLength(approvedList.length)
            while (count != loca.length) {
                if (loca[count]._doc.city == users.city) {
                    if(!approvedList.includes((loca[count]._doc._id))){
                        list.push(loca[count])
                    }
                }
                count++
            }
            setError(false);
            setListings(list);
        } catch (error) {
            console.log(error)
        }
    };

    const sendVerifiedList = async ( listID, SwipeDirecton ) => {
        const response = await listingsApi.verifyList({ ListId: listID, userID: users.userId, SwipeDirection: SwipeDirecton })
        console.log(response.originalError)
    }

    const rightSwipeActions = (list) => {
        const deleteFunction = () => {
            Alert.alert(
                "Is " + list.title + " a real place?",
                "",
                [
                    {
                        text: "No",
                        onPress: () => {
                            sendVerifiedList(list._id, "right")
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
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => deleteFunction()} >
                <View
                    style={{
                        justifyContent: 'center',
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <MaterialCommunityIcons color={colors.danger} name="close" size={25} />
                    <Text
                        style={{
                            color: '#1b1a17',
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            color: colors.danger,
                        }}
                    >Not Real Place
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    const leftSwipeActions = (list) => {
        const deleteFunction = () => {
            Alert.alert(
                "Is " + list.title + " a real place?",
                "",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            sendVerifiedList(list._id, "left")
                            loadListings()
                        }
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
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => deleteFunction()} >
                <View
                    style={{
                        justifyContent: 'center',
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 15,
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <MaterialCommunityIcons color={colors.ligthGreen} name="check" size={25} />
                    <Text
                        style={{
                            color: '#1b1a17',
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            color: colors.ligthGreen,
                        }}
                    >Real Place
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <>
            <Screen style={styles.screen}>
                {error && <>
                    <AppText>Could't retrive the listings.</AppText>
                    <AppButton title='Retry' onPress={loadListings} />
                </>}
                <View style={{
                    margin: -10,
                    marginTop: 5,
                    marginBottom: 20,
                    backgroundColor: 'white',
                    height: 40,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: 5 }}
                >
                    <Text style={{ color: colors.black, marginLeft: 10, fontSize: 16 }} >Restaurants you approved:</Text>
                    <Text style={{ color: colors.secondary, fontWeight: 'bold', marginLeft: 5, fontSize: 16 }} >{approvedLength}</Text>
                </View>
                {listings.length != 0 ? <FlatList
                    data={listings}
                    keyExtractor={listing => listing._doc._id.toString()}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item._doc.title}
                            subTitle={"Approved by " + item._doc.popularity +" users"}
                            image={{ uri: item.images[0].url }}
                            onPress={() => navigation.navigate(routes.USERS_LISTS, item)}
                            isIconNeed={true}
                            renderRightActions={() => rightSwipeActions(item._doc)}
                            renderLeftActions={() => leftSwipeActions(item._doc)}
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
                    <View style={{ justifyContent: 'center', marginTop: -180, alignSelf: 'center', flex:1}}>
                        <Lottie
                            autoPlay
                            loop
                            source={require('../assets/animations/listComplete.json')}
                        />
                        <View style={{ marginTop: 240, width: "100%" }} >
                            <AppText>All caught up no more restaurants to verify</AppText>
                        </View>
                    </View>
                }
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
        marginTop: -10,
        padding: 5,
        backgroundColor: colors.light,
        paddingBottom: 40,
        marginBottom: -7,
        width: "100%",
    },
})

export default FactCheckScreen;