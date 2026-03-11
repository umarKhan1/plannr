import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { useLocationPicker } from '../../hooks/useLocationPicker';
import { LocationMapView } from '../components/LocationMapView';
import { MapSearchBox } from '../components/MapSearchBox';
import { AppColors } from '../../../../shared/theme/colors';

export default function LocationPickerScreen({ navigation, route }) {
    const isFromHome = route.params?.fromHome || false;

    const {
        location,
        isLoading,
        mapRef,
        handleConfirmLocation,
        handleSearchSelect,
        handleMyLocation,
        handleRegionChangeComplete,
    } = useLocationPicker(navigation, isFromHome);

    return (
        <SafeAreaView style={styles.container}>
            <LocationMapView
                mapRef={mapRef}
                location={location}
                isLoading={isLoading}
                onRegionChangeComplete={handleRegionChangeComplete}
            />

            <MapSearchBox
                onSearchSelect={handleSearchSelect}
            />

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.myLocationButton}
                    onPress={handleMyLocation}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="my-location" size={24} color={AppColors.primary} />
                </TouchableOpacity>

                <PrimaryButton
                    text={isFromHome ? "UPDATE" : "ADD"}
                    onPress={handleConfirmLocation}

                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    footerContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? verticalScale(30) : verticalScale(20),
        left: moderateScale(20),
        right: moderateScale(20),
    },

    myLocationButton: {
        backgroundColor: 'white',
        width: verticalScale(50),
        height: verticalScale(50),
        borderRadius: moderateScale(25), // Circle mapping from target icon
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: verticalScale(15),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
});
