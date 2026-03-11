import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

export function EventCardShimmer({ variant = 'horizontal' }) {
    const opacityValue = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacityValue, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, [opacityValue]);

    if (variant === 'vertical') {
        return (
            <View style={[styles.cardContainer, styles.verticalContainer]}>
                <Animated.View style={[styles.shimmer, styles.verticalImage, { opacity: opacityValue }]} />
                <View style={styles.verticalTextContainer}>
                    <Animated.View style={[styles.shimmer, styles.titleSkeleton, { opacity: opacityValue }]} />
                    <Animated.View style={[styles.shimmer, styles.shortTitleSkeleton, { opacity: opacityValue, marginTop: verticalScale(5) }]} />
                    <Animated.View style={[styles.shimmer, styles.dateSkeleton, { opacity: opacityValue, marginTop: verticalScale(10) }]} />
                </View>
            </View>
        );
    }

    if (variant === 'home') {
        return (
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.shimmer, styles.homeImage, { opacity: opacityValue }]} />
                <View style={styles.homeContentContainer}>
                    <View>
                        <Animated.View style={[styles.shimmer, styles.titleSkeleton, { opacity: opacityValue }]} />
                        <Animated.View style={[styles.shimmer, styles.shortTitleSkeleton, { opacity: opacityValue, marginTop: verticalScale(5) }]} />
                    </View>
                    <View style={styles.homeBottomRow}>
                        <Animated.View style={[styles.shimmer, styles.locationSkeleton, { opacity: opacityValue }]} />
                        <Animated.View style={[styles.shimmer, styles.buttonSkeleton, { opacity: opacityValue }]} />
                    </View>
                </View>
            </View>
        );
    }

    // Default 'horizontal' variant
    return (
        <View style={styles.cardContainer}>
            <Animated.View style={[styles.shimmer, styles.image, { opacity: opacityValue }]} />
            <View style={styles.textContainer}>
                <Animated.View style={[styles.shimmer, styles.titleSkeleton, { opacity: opacityValue }]} />
                <Animated.View style={[styles.shimmer, styles.dateSkeleton, { opacity: opacityValue, marginTop: verticalScale(10) }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        padding: moderateScale(10),
        marginBottom: verticalScale(15),
        borderColor: '#F5F5F5',
        borderWidth: 1,
    },
    shimmer: {
        backgroundColor: '#E0E0E0',
        borderRadius: moderateScale(6),
    },

    // Horizontal specific styles
    image: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(12),
    },
    textContainer: {
        flex: 1,
        marginLeft: moderateScale(15),
        marginRight: moderateScale(10),
        justifyContent: 'center',
    },
    titleSkeleton: {
        height: moderateScale(16),
        width: '90%',
    },
    shortTitleSkeleton: {
        height: moderateScale(16),
        width: '60%',
    },
    dateSkeleton: {
        height: moderateScale(12),
        width: '40%',
    },

    // Home specific styles
    homeImage: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(15),
    },
    homeContentContainer: {
        flex: 1,
        marginLeft: moderateScale(15),
        justifyContent: 'space-between',
        height: moderateScale(90),
    },
    homeBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(8),
    },
    locationSkeleton: {
        height: moderateScale(14),
        width: '40%',
    },
    buttonSkeleton: {
        height: moderateScale(30),
        width: moderateScale(60),
        borderRadius: moderateScale(8),
    },

    // Vertical specific styles
    verticalContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: moderateScale(200),
        marginRight: moderateScale(15),
        padding: 0,
        overflow: 'hidden',
    },
    verticalImage: {
        width: '100%',
        height: verticalScale(120),
        borderRadius: 0,
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
    },
    verticalTextContainer: {
        padding: moderateScale(12),
        width: '100%',
    },
});
