import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const FadeInUp = ({ children, delay = 0, duration = 600, style }) => {
    // 1. Initial State: Opacity 0, Y translated down by 30px
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        // 2. Animate to Opacity 1, Y translated to 0
        Animated.sequence([
            Animated.delay(delay), // Allow staggering
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: true, // Optimizes performance
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: duration,
                    useNativeDriver: true,
                })
            ])
        ]).start();
    }, [delay, duration, fadeAnim, translateYAnim]);

    return (
        <Animated.View
            style={[
                style,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: translateYAnim }],
                },
            ]}
        >
            {children}
        </Animated.View>
    );
};
