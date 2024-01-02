import React, { useEffect, useMemo, useRef } from "react";
import {
    Easing,
    TextInput,
    Animated,
    Text,
    View,
    StyleSheet,
} from "react-native";
import Svg, { G, Circle, Rect, Image } from 'react-native-svg';
import { colours } from "../theme/colours";
import { Avatar } from "react-native-paper";


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const CircularProgressIndicator = ({
    percentage,
    max = 100,
    radius = 40,
    strokeWidth = 15,
    duration = 500,
    icon = '' }) => {

    const color = colours.primary;
    const animated = useRef(new Animated.Value(0)).current;
    const circleRef = useRef();
    const inputRef = useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;


    //removed animation as it was either not updating when values changed, pages changed etc, or was bouncing back and forth

    // const animation = (toValue) => {
    //     return Animated.timing(animated, {
    //         delay: 300,
    //         toValue,
    //         duration,
    //         useNativeDriver: true,
    //         easing: Easing.out(Easing.ease),
    //     }).start(() => {
    //         animation(percentage);
    //     });
    // };

    React.useEffect(() => {

        // animation(percentage);

        // animated.addListener((v) => {

        const maxPerc = 100 * percentage / max;
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
            inputRef.current.setNativeProps({
                text: `${Math.round(percentage)}`,
            });
        }
        if (circleRef?.current) {
            circleRef.current.setNativeProps({
                strokeDashoffset,
            });
        }
        // }, [max, percentage]);


        // return () => {
        //     animated.removeAllListeners();
        // };
    }, [max, percentage]);


    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
                style={{ alignItems: "center", justifyContent: 'center' }}>

                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    {icon != '' && <>
                        <Avatar.Icon icon={icon} size={radius * 1.7} color={color} style={{ backgroundColor: 'transparent', top: radius / 8, left: radius / 8 }} />
                    </>
                    }
                    <Circle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinejoin="round"
                        strokeOpacity=".1"
                    />
                </G>
            </Svg>
            {icon == '' && <AnimatedTextInput
                ref={inputRef}
                underlineColorAndroid="transparent"
                editable={false}
                defaultValue="0"
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: color },
                    styles.text,
                ]}
            />

            }


        </View>
    );
}

const styles = StyleSheet.create({
    text: { fontWeight: '900', textAlign: 'center' },
});

