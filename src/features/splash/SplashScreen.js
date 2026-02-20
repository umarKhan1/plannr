import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, StatusBar } from 'react-native';
import { AppAssets } from '../../core/constants/assets';
import { AppColors } from '../../shared/theme/colors';
export default function SplashScreen({ onFinish }) {
    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity start 0
    const scaleAnim = useRef(new Animated.Value(0.5)).current; // Scale start 0.5

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000, // 1 second
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(onFinish, 1500);
        });
    }, [fadeAnim, scaleAnim, onFinish]);

    return (
        <View style={styles.container}>
            {/* Dark content for status bar because background is white */}
            <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />

            <Animated.Image
                source={AppAssets.logo}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background, // Should be #ffffff
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 350, // Increased size
        height: 350,
    },
});
