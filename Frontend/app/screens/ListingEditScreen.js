import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from '../components/forms/FormImagePicker';
import listingsApi from '../api/listings';
import useLocation from '../hooks/useLocation';
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import Not from '../hooks/useNotifications'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    dishone:Yup.string().required().min(1).label("Dish One"),
    dishtwo: Yup.string().label("Dish Two"),
    dishthree: Yup.string().label("Dish Two"),
    doneprice: Yup.number().required().min(1).max(10000).label("Price"),
    dtwoprice: Yup.number().max(10000).label("Price"),
    dthreeprice: Yup.number().max(10000).label("Price"),
    description: Yup.string().label("Description"),
    city: Yup.string().min(1).label("City").required(),
    category: Yup.object().required().nullable().label("Category"),
    images: Yup.array().min(1, "Please select atlest one image."),
    phone: Yup.number().label("Phone Number").min(999999999),
    location: Yup.string().label("Location"),
});

const categories = [
    { backgroundColor: "#fc5c65", icon: "food-variant", label: "Veg", value: 1 },
    { backgroundColor: "#fd9644", icon: "food", label: "Non-Veg", value: 2 },
    { backgroundColor: "#fed330", icon: "food-takeout-box", label: "Both", value: 3 },
];

function ListingEditScreen() {

    const loca = useLocation();
    const location = loca[0]
    const { user, logOut } = useAuth();
    const [myLocation, setMyLocation] = useState("")
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isCliked, setIsClicked] = useState(false);
    var locArray = []
    var loc


    const triggerNotifications = async (listing) => {
        try {
            const permissions = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (!permissions.granted) return;
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Thank you for your contribution.",
                    body: "Your contribution " + listing.title + " is added for review.",
                },
                trigger: { seconds: 5, channelId: 'default' },

            });
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async (listing,{ resetForm }) => {
        
        if(myLocation !== ""){
            locArray = myLocation.split(',')
            console.log(locArray.length)
            if (locArray.length !== 2 ) {
                alert("Please check if the format is { latitude, logitude }")
                return setIsClicked(false), setMyLocation("")
            }else{
                const lat = parseInt(locArray[0]);
                const log = parseInt(locArray[1]);
                console.log(typeof(lat), typeof(log))
                if ((lat >= -90 && lat <= 90) && (log >= -180 && log <= 180)) {
                }else{
                    alert('Please provide the correct location')
                    return setMyLocation("")
                }
            }
        }else{
            return alert('Please provide the location or use your location.');
        }
        setProgress(0);
        setUploadVisible(true);
        
        loc = JSON.parse(JSON.stringify({
            latitude: parseFloat(locArray[0]),
            longitude: parseFloat(locArray[1])
        }))
        var giver = user.userId
        const result = await listingsApi.addListing(
            { ...listing }, loc, giver,
            (progress) => setProgress(progress)
        );
        if (!result.ok) {

            setUploadVisible(false);
            console.log(result.originalError)
            return alert('Could not save the listing.');
        }
        resetForm();
        triggerNotifications(listing)
    }

    const addMyLocation = (myLo) => {
        setIsClicked(true)
        if(!myLo){
            return(
                Alert.alert(
                    "Location is not found!",
                    "To continue, turn on device location.",
                    [{
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    }]
                )
            );
        }
        //console.log(location)
        const lat = location.latitude
        const lon = location.longitude
        setMyLocation(lat+","+lon)
    }

    const addLocation = (loc) => {
        setIsClicked(false);
        setMyLocation(loc)
    }

    return (
        <ScrollView style={styles.container}>
            <Screen style={styles.screen} >
                <UploadScreen
                    onDone={() => setUploadVisible(false)}
                    progress={progress}
                    visible={uploadVisible}
                />
                <Form
                    initialValues={{
                        title: "",
                        dishone: "",
                        doneprice: "",
                        dishtwo: "",
                        dtwoprice: "",
                        dishthree: "",
                        dthreeprice: "",
                        city: "",
                        description: "",
                        category: null,
                        images: [],
                        phone: "",
                        location: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <FormImagePicker name="images" />
                    <FormField maxLength={255} name="title" placeholder="Title" />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                        <View style={{width: "55%"}}>
                            <FormField
                                maxLength={255}
                                name="dishone"
                                placeholder="Dish One"
                            />
                        </View>
                        <View style={{ width: "40%" }}>
                            <FormField
                                keyboardType="numeric"
                                maxLength={8}
                                name="doneprice"
                                placeholder="Rs."
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={ { width: "55%" } }>
                            <FormField
                                maxLength={255}
                                name="dishtwo"
                                placeholder="Dish Two"
                            />
                        </View>
                        <View style={{ width: "40%" }}>
                            <FormField
                                keyboardType="numeric"
                                maxLength={8}
                                name="dtwoprice"
                                placeholder="Rs."
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ width: "55%" }}>
                            <FormField
                                maxLength={255}
                                name="dishthree"
                                placeholder="Dish Three"
                            />
                        </View>
                        <View style={{ width: "40%" }}>
                            <FormField
                                keyboardType="numeric"
                                maxLength={8}
                                name="dthreeprice"
                                placeholder="Rs."
                            />
                        </View>
                    </View>
                    <FormField
                        keyboardType="numeric"
                        maxLength={12}
                        name="phone"
                        placeholder="Phone Number"
                        width={"60%"}
                    />
                    <Picker
                        items={categories}
                        name="category"
                        placeholder="Category"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        width="50%"
                    />
                    <FormField
                        maxLength={255}
                        multiline
                        name="description"
                        numberOfLines={3}
                        placeholder="Description"
                    />
                    <FormField maxLength={255} name="city" placeholder="City" width={"55%"}/>
                    {!isCliked &&
                        <FormField
                            maxLength={50}
                            name="location"
                            placeholder="Location"
                            width={"60%"}
                            value={myLocation}
                            onChangeText={(value) => setMyLocation(value)}
                        />
                    }
                    <View style={styles.locationButton} >
                        <AppButton
                            title={'My Location'}
                            size={23}
                            onPress={() => addMyLocation(location)}
                            icon={'map-marker'}
                        />
                        <AppButton
                            title={'Add Location'}
                            size={23}
                            icon={'map-marker-plus-outline'}
                            onPress={() => addLocation()}
                        />
                    </View>
                    <SubmitButton title={'Submit'} width={"80%"} color="secondary"/>
                </Form>
            </Screen>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingBottom: 20,
        backgroundColor: colors.light,
        margin: 15,
    },
    container: {
        padding: 1,
        backgroundColor: colors.light,
    },
    locationButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
export default ListingEditScreen;
