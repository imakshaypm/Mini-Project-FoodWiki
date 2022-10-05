import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ListItem from "../components/ListItem";
import ListItemDeleteActions from '../components/ListItemDeleteActions';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
    {
        id: 1,
        title: "T1",
        description: "D1",
        image: require("../assets/mosh.jpg")
    },
    {
        id: 2,
        title: "T2",
        description: "D2",
        image: require("../assets/mosh.jpg")
    }
]

function MessagesScreen(props) {

    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefresing] = useState(false);

    const handlerDelete = message => {
        //Delete the message from messages
        //Call the server
        setMessages(messages.filter((m) => m.id !== message.id));
    }

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={(message) => message.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.title}
                        subTitle={item.description}
                        image={item.image}
                        onPress={() => console.log("Message selected", item)}
                        renderRightActions={() =>
                            <ListItemDeleteActions onPress={() => handlerDelete(item)} />}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                refreshing={refreshing}
                onRefresh={() => {
                    setMessages([
                        {
                            id: 2,
                            title: "T2",
                            description: "D2",
                            image: require("../assets/mosh.jpg")
                        }
                    ])
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
})

export default MessagesScreen;