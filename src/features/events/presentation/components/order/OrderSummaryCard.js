import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const OrderSummaryCard = ({ event }) => {
    if (!event) return null;

    return (
        <View style={styles.container}>
            <Image
                source={event.image}
                style={styles.image}
                contentFit="cover"
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{event.title}</Text>

                <View style={styles.infoRow}>
                    <Feather name="calendar" size={14} color="#7A7A7A" />
                    <Text style={styles.infoText}>{event.dateRange.split(',')[0]} {event.dateRange.split('-')[0].split(',')[1]}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Feather name="map-pin" size={14} color="#7A7A7A" />
                    <Text style={styles.infoText}>{event.location}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        padding: moderateScale(16),
        marginBottom: verticalScale(32),
        // subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    image: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(12),
        marginRight: moderateScale(16),
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...Typography.h4,
        color: '#1A1A1A',
        marginBottom: verticalScale(8),
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(4),
    },
    infoText: {
        ...Typography.body2,
        color: '#7A7A7A',
        marginLeft: moderateScale(6),
    }
});

export default OrderSummaryCard;
