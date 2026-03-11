import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../../../../../shared/theme/typography';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const EventOrganizerRow = ({ organizer, attendees }) => {
    if (!organizer) return null;

    const renderAttendeesCount = () => {
        if (!attendees || attendees.count <= 0) return null;

        let displayCount = attendees.count;
        if (attendees.count >= 100) {
            displayCount = '99+';
        } else {
            displayCount = `+${attendees.count}`;
        }

        return (
            <LinearGradient
                colors={['#FF007F', '#FF0055']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.attendeesBadge}
            >
                <Text style={styles.attendeesBadgeText}>{displayCount}</Text>
            </LinearGradient>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Organizers and Attendees</Text>

            <View style={styles.row}>
                <View style={styles.avatarGroup}>
                    <Image
                        source={organizer.avatar}
                        style={styles.avatar}
                        contentFit="cover"
                    />
                    {renderAttendeesCount()}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.roleText}>Organizers</Text>
                    <Text style={styles.nameText}>{organizer.name}</Text>
                </View>

                {/* Message Icon Button */}
                <TouchableOpacity style={styles.messageButton}>
                    <Feather name="message-square" size={20} color="#FF007F" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(24),
        marginBottom: verticalScale(28),
    },
    sectionTitle: {
        ...Typography.h3,
        color: '#1A1A1A',
        marginBottom: verticalScale(16),
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(24),
        marginRight: moderateScale(16),
    },
    textContainer: {
        flex: 1,
    },
    roleText: {
        ...Typography.body2,
        color: '#7A7A7A',
        marginBottom: verticalScale(4),
    },
    nameText: {
        ...Typography.h4,
        color: '#1A1A1A',
    },
    messageButton: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(16),
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#FF007F', // Pink border
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: moderateScale(16),
    },
    attendeesBadge: {
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: moderateScale(-35), // Tighter overlap effect (changed from -16)
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    attendeesBadgeText: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: 'bold',
    }
});

export default EventOrganizerRow;
