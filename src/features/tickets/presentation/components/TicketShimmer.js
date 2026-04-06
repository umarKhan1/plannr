import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const TicketShimmer = () => {
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

    return (
        <View style={styles.cardContainer}>
            <Animated.View style={[styles.shimmer, styles.image, { opacity: opacityValue }]} />
            
            <View style={styles.detailsContainer}>
                <View style={styles.headerRow}>
                    <Animated.View style={[styles.shimmer, styles.titleSkeleton, { opacity: opacityValue }]} />
                    <Animated.View style={[styles.shimmer, styles.priceSkeleton, { opacity: opacityValue }]} />
                </View>
                
                <Animated.View style={[styles.shimmer, styles.shortTitleSkeleton, { opacity: opacityValue }]} />
                
                <View style={styles.footerRow}>
                    <Animated.View style={[styles.shimmer, styles.dateLocationSkeleton, { opacity: opacityValue }]} />
                    <Animated.View style={[styles.shimmer, styles.buttonSkeleton, { opacity: opacityValue }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        padding: moderateScale(10),
        marginBottom: verticalScale(16),
        borderColor: '#F0F0F0',
        borderWidth: 1,
    },
    shimmer: {
        backgroundColor: '#E0E0E0',
        borderRadius: moderateScale(6),
    },
    image: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(12),
    },
    detailsContainer: {
        flex: 1,
        marginLeft: moderateScale(14),
        justifyContent: 'space-between',
        paddingVertical: moderateScale(4),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleSkeleton: {
        height: moderateScale(16),
        width: '60%',
    },
    priceSkeleton: {
        height: moderateScale(14),
        width: '15%',
    },
    shortTitleSkeleton: {
        height: moderateScale(16),
        width: '40%',
        marginTop: verticalScale(6),
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: verticalScale(8),
    },
    dateLocationSkeleton: {
        height: moderateScale(12),
        width: '50%',
    },
    buttonSkeleton: {
        height: moderateScale(16),
        width: '20%',
    }
});

export default TicketShimmer;
