import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../../../../../shared/theme/typography';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';
import { Image } from 'expo-image';

const EventLocationPreview = ({ eventId, locationName }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Location</Text>

            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.mapContainer}
                onPress={() => navigation.navigate('EventGoogleMap', { eventId })}
            >
                {/* Simulated Map Background Image for Preview */}
                <Image
                    source="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop"
                    style={styles.mapImage}
                    contentFit="cover"
                />

                {/* Map Overlay Tint to make it look like a map UI */}
                <View style={styles.mapOverlay} />

                {/* Simulated Pin Marker */}
                <View style={styles.markerContainer}>
                    <View style={styles.markerRing}>
                        <Feather name="target" size={18} color="#FFFFFF" />
                    </View>
                </View>

                {/* "See Location" Button Overlay */}
                <View style={styles.seeLocationBtn}>
                    <Text style={styles.seeLocationText}>See Location</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(24),
        marginBottom: verticalScale(40),
    },
    sectionTitle: {
        ...Typography.h3,
        color: '#1A1A1A',
        marginBottom: verticalScale(16),
        fontWeight: 'bold',
    },
    mapContainer: {
        width: '100%',
        height: verticalScale(160),
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        ...StyleSheet.absoluteFillObject,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // lighten the map image
    },
    markerContainer: {
        zIndex: 2,
    },
    markerRing: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(18),
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 0, 85, 0.3)', // subtle glow ring
    },
    seeLocationBtn: {
        position: 'absolute',
        top: moderateScale(16),
        left: moderateScale(16),
        backgroundColor: '#FFFFFF',
        paddingVertical: verticalScale(8),
        paddingHorizontal: moderateScale(16),
        borderRadius: moderateScale(12),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 2,
    },
    seeLocationText: {
        ...Typography.body2,
        color: '#1A1A1A',
        fontWeight: '600',
    }
});

export default EventLocationPreview;
