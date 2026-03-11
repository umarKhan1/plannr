import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useUserStore } from '../../../core/store/useUserStore';

export const useLocationPicker = (navigation, isFromHome = false) => {
    // Local State
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Global State
    const setUserLocation = useUserStore((state) => state.setUserLocation);

    // Refs
    const mapRef = useRef(null);

    // Initialize Permissions and get current location
    useEffect(() => {
        const fetchInitialLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setIsLoading(false);
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            } catch (error) {
                console.log("Error fetching location", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialLocation();
    }, []);

    const handleConfirmLocation = () => {
        if (location) {
            setUserLocation(location);
        }

        if (isFromHome) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'CategorySelection' }],
            });
        }
    };

    const handleSearchSelect = (data, details = null) => {
        if (details) {
            const newRegion = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setLocation(newRegion);
            mapRef.current?.animateToRegion(newRegion, 1000);
        }
    };

    const handleMyLocation = async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            const newRegion = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0005, // Updated for more zoom
                longitudeDelta: 0.0005, // Updated for more zoom
            };
            setLocation(newRegion);
            mapRef.current?.animateToRegion(newRegion, 1000);
        } catch (error) {
            console.log("Cannot fetch my location", error);
        }
    };

    const handleRegionChangeComplete = (region) => {
        setLocation({
            ...location,
            latitude: region.latitude,
            longitude: region.longitude,
        });
    };

    return {
        location,
        isLoading,
        mapRef,
        handleConfirmLocation,
        handleSearchSelect,
        handleMyLocation,
        handleRegionChangeComplete,
    };
};
