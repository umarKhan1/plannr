import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const EventAboutSection = ({ description }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(24),
        marginBottom: verticalScale(28),
    },
    title: {
        ...Typography.h3,
        color: '#1A1A1A',
        marginBottom: verticalScale(16),
        fontWeight: 'bold',
    },
    description: {
        ...Typography.body1,
        color: '#4A4A4A',
        lineHeight: 22,
    }
});

export default EventAboutSection;
