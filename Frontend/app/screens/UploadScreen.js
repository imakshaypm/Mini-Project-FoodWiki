import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import Lottie from 'lottie-react-native';

import colors from '../config/colors';

function UploadScreen({ onDone, progress = 0, visible = false }) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? (
                    <Progress.Bar
                        color={colors.primary}
                        progress={progress}
                        width={200} />
                ) : (
                    <Lottie 
                        autoPlay
                        loop={false}
                        onAnimationFinish={onDone}
                        source={require('../assets/animations/Done3.json')} 
                        style={styles.animation}  
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    animation: {
        width: 200,
    },
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})
export default UploadScreen;