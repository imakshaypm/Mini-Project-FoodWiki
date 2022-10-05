import React, { useState } from 'react';
import { StyleSheet, Modal } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';

import colors from '../config/colors';

function ViewImageScreen({ route }) {
    const [isModalVisible, setModelvisible] = useState(true)
    const array = route.params
    const closeModel = () => {
        setModelvisible(false)
    }
    return (
        <Modal
            style={styles.image}
            visible={isModalVisible}
            animationType='slide'
            statusBarTranslucent={true}
            transparent={true}
        >
            <ImageViewer
                imageUrls={array}
                onSwipeDown={() => closeModel()}
                enableSwipeDown={true}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
    },
    container: {
        backgroundColor: colors.black,
        flex: 1,
    },
    closeIcon: {
        position: "absolute",
        top: 40,
        left: 30,
    },
    deleteIcon: {
        position: "absolute",
        top: 40,
        right: 30,
    }
})

export default ViewImageScreen;