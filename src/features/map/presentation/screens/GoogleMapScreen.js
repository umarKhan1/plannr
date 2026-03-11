import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../../../../core/store/useUserStore';

import { useEventDetails } from '../../../events/hooks/useEventDetails';
import { AppColors } from '../../../../shared/theme/colors';
import { Typography } from '../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

export default function GoogleMapScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { eventId } = route.params || {};
    const { event, isLoading } = useEventDetails(eventId);
    const insets = useSafeAreaInsets();

    const hasJoinedEvent = useUserStore(state => state.hasJoinedEvent);
    const isJoined = hasJoinedEvent(eventId);

    if (isLoading || !event) return null; // Simple fallback while map loads

    return (
        <View style={styles.container}>
            {/* Full Screen Map */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: event.locationCoordinates?.latitude || 37.78825,
                    longitude: event.locationCoordinates?.longitude || -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                customMapStyle={mapGhostStyle} // To give it that cool minimal vibe (optional)
            >
                {/* Only display markers if user has bought/joined the event */}
                {isJoined && (
                    <Marker
                        coordinate={{
                            latitude: event.locationCoordinates?.latitude || 37.78825,
                            longitude: event.locationCoordinates?.longitude || -122.4324,
                        }}
                        title={event.title}
                        description={event.location}
                    >
                        <View style={styles.markerRing}>
                            <Feather name="target" size={18} color="#FFFFFF" />
                        </View>
                    </Marker>
                )}
            </MapView>

            {/* Top Bar Overlay */}
            <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 20) }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="chevron-left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{event.title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(16),
        // Add a subtle gradient or solid background to ensure text readability over map
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    backButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginRight: moderateScale(16),
    },
    headerTitle: {
        flex: 1,
        ...Typography.h3,
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    markerRing: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(18),
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 0, 85, 0.3)',
    }
});

// A standard light/minimal map style for better aesthetics
const mapGhostStyle = [
    { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
    { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
];
