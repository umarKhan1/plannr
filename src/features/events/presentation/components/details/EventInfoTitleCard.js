import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';
import { Typography } from '../../../../../shared/theme/typography';
import { AppColors } from '../../../../../shared/theme/colors';

const EventInfoTitleCard = ({ title, price, location, dateRange, attendees }) => {

    const renderAvatars = () => {
        if (!attendees || !attendees.avatars || attendees.avatars.length === 0) return null;

        return (
            <View style={styles.avatarsContainer}>
                {attendees.avatars.slice(0, 4).map((avatarUrl, index) => (
                    <Image
                        key={index}
                        source={avatarUrl}
                        style={[
                            styles.avatarImage,
                            { marginLeft: index === 0 ? 0 : moderateScale(-12) }
                        ]}
                    />
                ))}
                {attendees.count > attendees.avatars.length && (
                    <LinearGradient
                        colors={['#FF007F', '#FF0055']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.avatarBadge, { marginLeft: moderateScale(-12) }]}
                    >
                        <Text style={styles.avatarBadgeText}>
                            +{attendees.count >= 100 ? '99+' : attendees.count - attendees.avatars.length}
                        </Text>
                    </LinearGradient>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Title & Price Row */}
            <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={2}>
                    {title}
                </Text>
                <Text style={styles.price}>
                    {price}
                </Text>
            </View>

            {/* Meta Information Container */}
            <View style={styles.metaContainer}>

                {/* Location and Date Stack */}
                <View style={styles.infoStack}>
                    <View style={styles.iconRow}>
                        <Feather name="map-pin" size={16} color="#7A7A7A" />
                        <Text style={styles.infoText}>{location}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Feather name="calendar" size={16} color="#7A7A7A" />
                        <Text style={styles.infoText}>{dateRange}</Text>
                    </View>
                </View>

                {/* Overlapping Attendees */}
                <View style={styles.attendeesStack}>
                    {renderAvatars()}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(18),
        padding: moderateScale(24),
        marginTop: verticalScale(-70),
        alignSelf: 'center',
        width: '90%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: verticalScale(24),
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(16),
    },
    title: {
        flex: 1,
        ...Typography.h2,
        color: '#1A1A1A',
        marginRight: moderateScale(16),
    },
    price: {
        ...Typography.h2,
        color: '#1A1A1A',
        marginTop: verticalScale(2),
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    infoStack: {
        flex: 1,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    infoText: {
        ...Typography.body1,
        color: '#4A4A4A',
        marginLeft: moderateScale(10),
    },
    attendeesStack: {
        justifyContent: 'flex-end',
        paddingLeft: moderateScale(10),
    },
    avatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarImage: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    avatarBadge: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        borderWidth: 2,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarBadgeText: {
        color: '#FFFFFF',
        fontSize: moderateScale(11),
        fontWeight: 'bold',
    }
});

export default EventInfoTitleCard;
