import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useUserStore } from '../../../core/store/useUserStore';

export const useLocationPicker = (navigation, isFromHome = false) => {
    // Local State
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Global State
    const { syncUserLocation } = useUserStore();

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
                const coords = {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                };

                // Fetch address for initial location
                const address = await getAddressFromCoords(coords.latitude, coords.longitude);

                setLocation({
                    ...coords,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                    address: address,
                });
            } catch (error) {
                console.log("Error fetching location", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialLocation();
    }, []);

    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (result) {
                const parts = [
                    result.name || result.streetNumber,
                    result.street,
                    result.city,
                    result.region,
                ].filter(Boolean);
                return parts.join(', ');
            }
        } catch (error) {
            console.log("Reverse geocoding failed", error);
        }
        return null;
    };

    const handleConfirmLocation = async () => {
        if (location) {
            await syncUserLocation(location);
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
                address: data.description, // Store the human-readable address
            };
            setLocation(newRegion);
            mapRef.current?.animateToRegion(newRegion, 1000);
        }
    };

    const handleMyLocation = async () => {
        try {
            let currentLocation = await Location.getCurrentPositionAsync({});
            const address = await getAddressFromCoords(currentLocation.coords.latitude, currentLocation.coords.longitude);

            const newRegion = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005,
                address: address,
            };
            setLocation(newRegion);
            mapRef.current?.animateToRegion(newRegion, 1000);
        } catch (error) {
            console.log("Cannot fetch my location", error);
        }
    };

    const handleRegionChangeComplete = async (region) => {
        const address = await getAddressFromCoords(region.latitude, region.longitude);
        setLocation({
            ...location,
            latitude: region.latitude,
            longitude: region.longitude,
            address: address, // Update address as map moves
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
