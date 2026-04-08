import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../../../../core/store/useUserStore';

import { useEventDetails } from '../../../events/hooks/useEventDetails';
import { MOCK_EVENTS } from '../../../events/hooks/useGetEvents';
import { EventCard } from '../../../events/presentation/components/EventCard';
import { AppColors } from '../../../../shared/theme/colors';
import { Typography } from '../../../../shared/theme/typography';
import { moderateScale, verticalScale, SCREEN_WIDTH } from '../../../../core/utils/responsive';

const CARD_WIDTH = moderateScale(320);
const CARD_MARGIN = moderateScale(10);
const SNAP_INTERVAL = CARD_WIDTH + (CARD_MARGIN * 2);

const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('music')) return 'microphone';
    if (name.includes('food')) return 'hamburger';
    if (name.includes('design')) return 'palette';
    if (name.includes('business')) return 'briefcase';
    if (name.includes('tech')) return 'laptop';
    if (name.includes('dance')) return 'music';
    return 'calendar-star';
};

export default function GoogleMapScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { eventId } = route.params || {};
    const { event, isLoading } = useEventDetails(eventId);
    const insets = useSafeAreaInsets();

    const [activeIndex, setActiveIndex] = useState(0);
    const mapViewRef = useRef(null);
    const flatListRef = useRef(null);

    // Initial setup to find index of current event
    useEffect(() => {
        if (!isLoading && MOCK_EVENTS.length > 0) {
            const index = MOCK_EVENTS.findIndex(e => e.id === eventId);
            if (index !== -1) {
                setActiveIndex(index);
                // Wait for flatlist to mount
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({ index, animated: false });
                }, 100);
            }
        }
    }, [isLoading, eventId]);

    const onMarkerPress = (index) => {
        setActiveIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: true });
        
        const event = MOCK_EVENTS[index];
        mapViewRef.current?.animateToRegion({
            latitude: event.locationCoordinates.latitude,
            longitude: event.locationCoordinates.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }, 300);
    };

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        
        if (index !== activeIndex && index >= 0 && index < MOCK_EVENTS.length) {
            setActiveIndex(index);
            const targetEvent = MOCK_EVENTS[index];
            mapViewRef.current?.animateToRegion({
                latitude: targetEvent.locationCoordinates.latitude,
                longitude: targetEvent.locationCoordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 300);
        }
    };

    const onLocateMe = () => {
        if (MOCK_EVENTS[activeIndex]) {
            const current = MOCK_EVENTS[activeIndex];
            mapViewRef.current?.animateToRegion({
                latitude: current.locationCoordinates.latitude,
                longitude: current.locationCoordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 300);
        }
    };

    if (isLoading || !event) return null;

    return (
        <View style={styles.container}>
            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: event.locationCoordinates?.latitude || 37.78825,
                    longitude: event.locationCoordinates?.longitude || -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                customMapStyle={mapGhostStyle}
            >
                {MOCK_EVENTS.map((item, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <Marker
                            key={item.id}
                            coordinate={{
                                latitude: item.locationCoordinates?.latitude || 37.78825,
                                longitude: item.locationCoordinates?.longitude || -122.4324,
                            }}
                            onPress={() => onMarkerPress(index)}
                        >
                            <View style={[styles.markerPill, isActive && styles.markerPillActive]}>
                                <View style={[styles.markerIconCircle, { backgroundColor: isActive ? AppColors.primary : '#E0E0E0' }]}>
                                    <MaterialCommunityIcons 
                                        name={getCategoryIcon(item.categoryName)} 
                                        size={14} 
                                        color={isActive ? "white" : "#666"} 
                                    />
                                </View>
                                <View style={styles.markerTextCol}>
                                    <Text style={styles.markerPriceLabel}>Ticket: {item.price}</Text>
                                    <Text style={styles.markerCategoryLabel}>{item.categoryName} Event</Text>
                                </View>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>

            <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 20) }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="chevron-left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{MOCK_EVENTS[activeIndex]?.title || "Events"}</Text>
            </View>

            {/* Locate Me Button */}
            <TouchableOpacity 
                style={[styles.locateButton, { bottom: verticalScale(280) }]}
                onPress={onLocateMe}
            >
                <MaterialIcons name="my-location" size={24} color={AppColors.primary} />
            </TouchableOpacity>

            {/* Event Carousel */}
            <View style={styles.carouselContainer}>
                <FlatList
                    ref={flatListRef}
                    data={MOCK_EVENTS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={SCREEN_WIDTH}
                    decelerationRate="fast"
                    pagingEnabled
                    onMomentumScrollEnd={handleScroll}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ width: SCREEN_WIDTH, alignItems: 'center' }}>
                            <EventCard 
                                event={item} 
                                variant="map_overlay" 
                                onPress={() => navigation.push('EventDetails', { eventId: item.id })}
                            />
                        </View>
                    )}
                />
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
    // Custom Marker Pills
    markerPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: moderateScale(6),
        borderRadius: moderateScale(15),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        minWidth: moderateScale(110),
    },
    markerPillActive: {
        borderColor: AppColors.primary,
        borderWidth: 1,
    },
    markerIconCircle: {
        width: moderateScale(26),
        height: moderateScale(26),
        borderRadius: moderateScale(13),
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerTextCol: {
        marginLeft: moderateScale(8),
    },
    markerPriceLabel: {
        fontSize: moderateScale(10),
        color: '#666',
        fontWeight: '600',
    },
    markerCategoryLabel: {
        fontSize: moderateScale(12),
        color: '#1A1A1A',
        fontWeight: '700',
    },
    // Locate Me Button
    locateButton: {
        position: 'absolute',
        right: moderateScale(20),
        width: moderateScale(46),
        height: moderateScale(46),
        borderRadius: moderateScale(23),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    // Carousel
    carouselContainer: {
        position: 'absolute',
        bottom: verticalScale(30),
        left: 0,
        right: 0,
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
