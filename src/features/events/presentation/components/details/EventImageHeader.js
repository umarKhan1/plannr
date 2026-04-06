import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';
import { useUserStore } from '../../../../../core/store/useUserStore';

const { width } = Dimensions.get('window');

const EventImageHeader = ({ imageUrl, eventId }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const isFavorite = useUserStore(state => state.favoriteEvents.includes(eventId));
    const toggleFavorite = useUserStore(state => state.toggleFavorite);

    return (
        <View style={styles.container}>
            <Image
                source={imageUrl}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            {/* Top Bar Overlay */}
            <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 20) }]}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Feather name="chevron-left" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Favorite Button */}
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => toggleFavorite(eventId)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Feather
                        name="heart"
                        size={24}
                        color={isFavorite ? "#FF0055" : "#FFFFFF"}
                        style={isFavorite ? undefined : styles.heartShadow}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: verticalScale(300),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
    },
    iconButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartShadow: {
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    }
});

export default EventImageHeader;
