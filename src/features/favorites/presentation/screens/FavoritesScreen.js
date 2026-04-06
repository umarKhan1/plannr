import React from 'react';
import {
    SafeAreaView, StyleSheet, FlatList, View, Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Correct relative paths from: src/features/favorites/presentation/screens/
import { useFavoritesList } from '../../hooks/useFavoritesList';             // 2 up
import TicketShimmer from '../../../tickets/presentation/components/TicketShimmer'; // 3 up -> features/tickets
import EmptyTicketState from '../../../tickets/presentation/components/EmptyTicketState'; // 3 up
import { moderateScale, verticalScale } from '../../../../core/utils/responsive'; // 4 up -> src/core
import { AppColors } from '../../../../shared/theme/colors';                 // 4 up -> src/shared
import { useUserStore } from '../../../../core/store/useUserStore';          // 4 up -> src/core

const SCREEN_BG = '#F7F7F7';

const FavoriteEventCard = ({ event }) => {
    const navigation = useNavigation();
    const isLiked = useUserStore(state => state.hasFavorited(event.id));
    const toggleFavorite = useUserStore(state => state.toggleFavorite);

    const locationName = typeof event.location === 'string'
        ? event.location
        : (event.location?.name || 'Location TBD');

    const dateFormatted = event.dateRange?.split(',')[0] || event.date || '';
    const description = event.description
        || 'Join us for an unforgettable experience at this amazing event. Don\'t miss out!';

    const handleViewDetails = () => {
        // EventDetailsScreen expects eventId param
        navigation.navigate('EventDetails', { eventId: event.id });
    };

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.88} onPress={handleViewDetails}>
            {/* Event Image */}
            <Image
                source={{ uri: event.image }}
                style={styles.cardImage}
                contentFit="cover"
                transition={200}
            />

            {/* Heart button overlay */}
            <TouchableOpacity
                style={styles.heartOverlay}
                onPress={() => toggleFavorite(event.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <MaterialCommunityIcons
                    name={isLiked ? 'cards-heart' : 'heart-outline'}
                    size={20}
                    color={isLiked ? AppColors.primary : '#888'}
                />
            </TouchableOpacity>

            {/* Card Content */}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{event.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>

                <View style={styles.cardMeta}>
                    <View style={styles.metaRow}>
                        <Feather name="map-pin" size={12} color={AppColors.primary} />
                        <Text style={styles.metaText} numberOfLines={1}>{locationName}</Text>
                    </View>
                    {dateFormatted ? (
                        <View style={styles.metaRow}>
                            <Feather name="calendar" size={12} color={AppColors.primary} />
                            <Text style={styles.metaText}>{dateFormatted}</Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.cardFooter}>
                    <Text style={[styles.priceText, { color: AppColors.primary }]}>
                        {event.price && event.price !== 'Free' ? event.price : 'Free'}
                    </Text>
                    <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
                        <Text style={styles.detailsButtonText}>View Details</Text>
                        <Feather name="arrow-right" size={12} color={AppColors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const FavoritesScreen = () => {
    const { favorites, isLoading } = useFavoritesList();

    const renderItem = ({ item }) => <FavoriteEventCard event={item} />;

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <EmptyTicketState
                title="No Favorites Yet"
                subtitle="Heart any event on the home screen and it will show up here!"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header — matches background */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Favorites</Text>
                <Text style={styles.headerSubtitle}>Events you've saved</Text>
            </View>

            {isLoading ? (
                <View style={styles.listContainer}>
                    <TicketShimmer />
                    <TicketShimmer />
                    <TicketShimmer />
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={[
                        styles.listContainer,
                        favorites.length === 0 && { flex: 1 }
                    ]}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SCREEN_BG,
    },
    // Header now matches background — no white box
    header: {
        alignItems: 'center',
        paddingHorizontal: moderateScale(24),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(20),
        backgroundColor: SCREEN_BG,
    },
    headerTitle: {
        fontSize: moderateScale(22),
        fontWeight: '800',
        color: '#111',
    },
    headerSubtitle: {
        fontSize: moderateScale(13),
        color: '#888',
        marginTop: verticalScale(3),
        fontWeight: '500',
    },
    listContainer: {
        paddingHorizontal: moderateScale(20),
        paddingBottom: verticalScale(40),
    },
    emptyContainer: {
        flex: 1,
    },

    // Card
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        marginBottom: verticalScale(18),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: verticalScale(160),
        backgroundColor: '#E0E0E0',
    },
    heartOverlay: {
        position: 'absolute',
        top: moderateScale(12),
        right: moderateScale(12),
        backgroundColor: '#FFFFFFCC',
        borderRadius: moderateScale(20),
        padding: moderateScale(7),
    },
    cardContent: {
        padding: moderateScale(16),
    },
    cardTitle: {
        fontSize: moderateScale(17),
        fontWeight: '800',
        color: '#111',
        marginBottom: verticalScale(6),
    },
    cardDescription: {
        fontSize: moderateScale(13),
        color: '#666',
        lineHeight: moderateScale(19),
        marginBottom: verticalScale(12),
    },
    cardMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: verticalScale(14),
        gap: moderateScale(12),
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: moderateScale(12),
        color: '#555',
        fontWeight: '500',
        marginLeft: moderateScale(4),
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2',
        paddingTop: verticalScale(12),
    },
    priceText: {
        fontSize: moderateScale(15),
        fontWeight: '800',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsButtonText: {
        fontSize: moderateScale(13),
        color: AppColors.primary,
        fontWeight: '700',
        marginRight: moderateScale(4),
    },
});

export default FavoritesScreen;
