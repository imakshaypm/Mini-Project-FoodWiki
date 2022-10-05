import React, { useState } from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Lottie from 'lottie-react-native';

import Card from '../components/Card';
import Screen from '../components/Screen';
import listingsApi from '../api/listings'
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ListItem from '../components/ListItem';

function SearchScreen({ navigation }) {

    const [search, setSearch] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [a, setA] = useState(false)
    const [listings, setListings] = useState([]);
    const [listing, setListing] = useState([]);
    const [found, setFound] = useState(true);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const removeExtraSpace = (s) => s.trim().split(/ +/).join(' ');

    const handleSearch = async () => {
        const searchItem = removeExtraSpace(search);
        try {
            if (searchItem) {
                setFound(false);
                setA(false)
                setListings([])
                setLoading(true);
                const response = await listingsApi.getListings({ screen: "SearchScreen", search: searchItem });
                setLoading(false);
                if (!response.ok) return setError(true);
                setError(false);
                const list = response.data;
                if (list[0]._doc) {
                    setListings(list)
                    return setFound(true);
                }
                setFound(false)
            }
            
        } catch (error) {
            console.log(Error)
        }
    }

    const searchQuery = async () => {
        const searchItem = removeExtraSpace(search);
        try {
            if (searchItem) {
                setA(true);
                setListings([])
                setLoading(true);
                const response = await listingsApi.getListings({ screen: "SearchScreen", search: searchItem });
                setLoading(false);
                if (!response.ok) return setError(true);
                setError(false);
                const list = response.data;
                if (list) {
                    setListing(list)
                    return setFound(true);
                }
                setFound(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleTextChange = (value) => {
        searchQuery()
        setFound(true)
        setListings([])
        if(value == ''){
            setA(false)
            setIsSearch(false)
            setSearch("")
        }else{
            setIsSearch(true)
            setSearch(value)
        }
    }

    return (
        <>
            
            <Screen style={styles.screen}>
                {error && <>
                    <AppText>Could't retrive the listings.</AppText>
                    <AppButton title='Retry' onPress={handleSearch} />
                </>}
                <View style={styles.searchBar}>
                    <AppTextInput
                        icon="magnify"
                        placeholder="Search"
                        width={300}
                        value={search}
                        onChangeText={handleTextChange}
                        elevation={10}
                    />
                    <AppButton icon='magnify' width='100%' onPress={handleSearch} />
                </View>
                {a && <View style={{backgroundColor: 'white', borderRadius: 15, margin: 10, marginTop: -15}} >
                    <FlatList
                        data={listing}
                        keyExtractor={listing => listing._doc._id.toString()}
                        renderItem={({ item }) =>
                            <ListItem
                                title={item._doc.title}
                                //subTitle={(item._doc.popularity) > 5 ? "Verified" : "Pending..."}
                                //subIcon={(item._doc.popularity) > 5 ? "check" : "clock-time-two-outline"}
                                //iconColor={(item._doc.popularity) > 5 ? "ligthGreen" : "danger"}
                                //image={{ uri: item.images[0].url }}
                                onPress={() => setSearch(item._doc.title)}
                                isIconNeed={false}
                                isIconNeeded={false}
                                
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        style={{ borderRadius: 15 }}
                    />
                </View>}
                
                {!isSearch ? 
                    <View style={styles.searchDefault} >
                        <MaterialCommunityIcons
                            name='magnify'
                            size={100}
                            style={{ alignSelf: 'center' }}
                            color={colors.secondary}
                        />
                        <AppText>Search Results</AppText>
                    </View> : null
                }
                {found && <FlatList
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
                        />
                    }
                />}
                {!found && isSearch ? <View style={styles.searchError}>
                    <Lottie
                        autoPlay
                        loop
                        source={require('../assets/animations/notFound.json')}
                    />
                    <View style={{ marginTop: 240, width: "100%" }} >
                        <AppText>Sorry we didn't find anything for {search}</AppText>
                    </View>
                </View>: null} 
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    flatList: {
        padding: 10,
        margin: 1,
        fontSize: 16,
        borderRadius: 15,
    },
    flatListStyle: {
        margin: 15,
        marginTop: -18,
        borderRadius: 20,
        backgroundColor: colors.white,
        elevation: 10
    },
    screen: {
        backgroundColor: colors.light,
    },
    searchBar: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    searchDefault: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
        flexGrow: 10,
    },
    searchError: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 140,
    },
})

export default SearchScreen;