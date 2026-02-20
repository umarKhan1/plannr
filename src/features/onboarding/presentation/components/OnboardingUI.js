import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { AppColors } from '../../../../shared/theme/colors';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    verticalScale,
    moderateScale
} from '../../../../core/utils/responsive';

// Use shared PrimaryButton directly
export const OnboardingButton = PrimaryButton;

export const OnboardingTitle = ({ text }) => {
    const parts = text.split('\n');
    return (
        <Text style={styles.title}>
            {parts[0]}
            {parts[1] && <Text style={{ color: AppColors.primary }}> {parts[1]}</Text>}
            {parts[2] && `\n${parts[2]}`}
        </Text>
    );
};

export const OnboardingSubtitle = ({ text }) => (
    <Text style={styles.description}>{text}</Text>
);

export const OnboardingSlide = React.memo(({ item }) => {
    return (
        <View style={styles.slide}>
            {/* Top Part: Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Bottom Part: White Card & Text */}
            <View style={styles.cardContainer}>
                <View style={styles.contentWrapper}>
                    <OnboardingTitle text={item.title} />
                    <OnboardingSubtitle text={item.description} />
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: verticalScale(15),
    },
    description: {
        fontSize: moderateScale(20),
        color: 'grey',
        textAlign: 'center',
        lineHeight: verticalScale(28),
        paddingHorizontal: moderateScale(10),
    },
    slide: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.65,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cardContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.40,
        backgroundColor: '#fff',
        borderTopLeftRadius: moderateScale(40),
        borderTopRightRadius: moderateScale(40),
        marginTop: -verticalScale(40),
        alignItems: 'center',
        paddingTop: verticalScale(40),
        paddingHorizontal: moderateScale(20),
    },
    contentWrapper: {
        alignItems: 'center',
        width: '100%',
    },
});
