import React from 'react';
import { StyleSheet, View } from 'react-native'

import ListItem from '../components/ListItem';
import ListItemButton from '../components/ListItemButton';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Icon from '../components/Icon';
import useAuth from '../auth/useAuth';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

function AccountScreen({ navigation }) {

    const { user, logOut } = useAuth();
    //console.log(user.city)
    return (
        <Screen style={styles.screen}>
            <View style={styles.topText} >
                <View>
                    <AppText style={styles.firstText} numberOfLines={1} >Hi There,</AppText>
                    <AppText style={styles.accountText} numberOfLines={1} >{user.name}</AppText>
                </View>
                <View style={{  }} >
                    <AppButton  color='secondary' inListDetails={true} icon={"logout"} onPress={() => logOut()} size={8} />
                </View>
            </View>
            <View style={styles.container}>
                <ListItem
                    title={user.name}
                    subTitle={user.email}
                    imageProfile={user.name}
                    isIconNeeded={false} />
            </View>
            <View style={styles.button} >
                <ListItemButton
                    isIconNeeded={false}
                    title={"My Lisiting"}
                    IconComponent={
                        <Icon
                            name={"format-list-bulleted"}
                            backgroundColor={colors.primary}
                        />
                    }
                    onPress={() => navigation.navigate("UserListing", user)}
                />
                <ListItemButton
                    isIconNeeded={false}
                    title={"Fact Check"}
                    IconComponent={
                        <Icon
                            name={"check-decagram"}
                            backgroundColor={colors.secondary}
                        />
                    }
                    onPress={() => navigation.navigate("UserFactCheck", user)}
                />
            </View>
            
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent:'center',
        marginBottom: 50
    },
    firstText:{
        color: colors.black,
        fontSize: 32,
        fontWeight: 'bold',
        width: "100%"
    },
    accountText: {
        color: colors.secondary,
        fontSize: 28,
        fontWeight: 'bold',
        width: "100%"
    },
    topText: {
        margin: 20,
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 10,
    },
})

export default AccountScreen;