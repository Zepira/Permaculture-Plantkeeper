import React, { useContext, useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { colours } from "../theme/colours";
import LottieView from 'lottie-react-native';
import { Text } from "../theme";


export const LoadingComponent = () => {
    const animation = useRef(null);

    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colours.primary, }}>

            <Text variant="title" style={{ marginTop: -40, marginBottom: 30 }}>Growing...</Text>

            <LottieView
                autoPlay
                loop
                style={{ height: 140, width: '100%' }}
                key="animation"
                ref={animation}
                source={require('../../assets/loading_animation.json')}
            />



        </View>
    )
}