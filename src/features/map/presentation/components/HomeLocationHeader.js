import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useUserStore } from '../../../../core/store/useUserStore';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

export function HomeLocationHeader() {
    const navigation = useNavigation();
    const userLocation = useUserStore((state) => state.userLocation);
    const [addressText, setAddressText] = useState('Select Location');

    useEffect(() => {
        const getAddress = async () => {
            if (userLocation?.latitude && userLocation?.longitude) {
                try {
                    const geocode = await Location.reverseGeocodeAsync({
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    });
                    if (geocode && geocode.length > 0) {
                        const { name, street, streetNumber, city, district, subregion } = geocode[0];
                        let displayAddress = name;
                        if (!displayAddress || displayAddress === city || displayAddress === district) {
                            if (street) {
                                displayAddress = streetNumber ? `${streetNumber} ${street}` : street;
                            } else {
                                displayAddress = district || subregion || city;
                            }
                        } if (displayAddress && city && !displayAddress.includes(city)) {
                            displayAddress = `${displayAddress}, ${city}`;
                        }

                        setAddressText(displayAddress || 'Unknown Location');
                    }
                } catch (error) {
                    console.error("Geocoding error:", error);
                    setAddressText('Location Error');
                }
            }
        };

        getAddress();
    }, [userLocation]);

    const handleLocationPress = () => {
        navigation.navigate('LocationPicker', { fromHome: true });
    };

    const handleNotificationPress = () => {
        console.log("Notification pressed");
    };

    return (
        <View style={styles.container}>
            <View style={styles.locationSection}>
                <Text style={styles.locationLabel}>Location</Text>

                <TouchableOpacity
                    style={styles.addressRow}
                    onPress={handleLocationPress}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="map-marker-outline" size={26} color={AppColors.primary} />
                    <Text style={styles.addressText} numberOfLines={1}>
                        {addressText}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.bellButton}
                onPress={handleNotificationPress}
                activeOpacity={0.7}
            >
                <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(10),
        backgroundColor: 'transparent',
    },
    locationSection: {
        flex: 1,
        marginRight: moderateScale(15),
    },
    locationLabel: {
        fontSize: moderateScale(18),
        color: '#333333',
        marginBottom: verticalScale(4),
        fontWeight: '500',
    },


    addressRow: {
        flexDirection: 'row',
        alignItems: 'center', // Keeps the larger icon and text centered on the same horizontal line
    },
    addressText: {
        fontSize: moderateScale(17),
        fontWeight: '600',
        color: '#666666',
        marginLeft: moderateScale(5), // Slightly increased margin to breathe with the larger icon
        flex: 1,
        // If the text looks too high/low compared to the icon, 
        // you can add: lineHeight: moderateScale(20)
    },
    bellButton: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: moderateScale(12),
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
        // subtle shadow for the bell button
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
});
