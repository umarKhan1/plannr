import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

// Taking props to make it reusable anywhere in the app
// variant can be 'horizontal' (for search lists), 'vertical' (for carousels), or 'home' (for home feed)
export function EventCard({ event, onPress, showHeart = true, variant = 'horizontal' }) {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePress = () => {
        setIsLiked(!isLiked);
        // Here we would also fire an async request to Supabase in the future
    };

    if (variant === 'vertical') {
        const hasAttendees = event.attendees && event.attendees.avatars && event.attendees.avatars.length > 0;

        return (
            <TouchableOpacity
                style={[styles.cardContainer, styles.verticalContainer]}
                activeOpacity={0.9}
                onPress={onPress}
            >
                <ImageBackground
                    source={{ uri: event.image }}
                    style={styles.verticalImage}
                    contentFit="cover"
                    transition={300}
                    imageStyle={{ borderTopLeftRadius: moderateScale(15), borderTopRightRadius: moderateScale(15) }}
                >
                    <View style={styles.overlayTopRow}>
                        {event.categoryName && (
                            <View style={styles.categoryPill}>
                                <Text style={styles.categoryPillText}>{event.categoryName}</Text>
                            </View>
                        )}

                        {showHeart && (
                            <TouchableOpacity style={styles.heartButtonContainer} onPress={handleLikePress}>
                                <MaterialCommunityIcons
                                    name={isLiked ? "cards-heart" : "heart-outline"}
                                    size={20}
                                    color={AppColors.primary}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {event.organizer && (
                        <View style={styles.organizerOverlay}>
                            <Image
                                source={{ uri: event.organizer.avatar }}
                                style={styles.organizerAvatar}
                                contentFit="cover"
                            />
                            <Text style={styles.organizerName} numberOfLines={1}>{event.organizer.name}</Text>
                        </View>
                    )}
                </ImageBackground>

                <View style={styles.verticalTextContainer}>
                    <Text style={styles.titleText} numberOfLines={2}>
                        {event.title}
                    </Text>
                    {event.dateRange && (
                        <Text style={styles.dateTextVertical} numberOfLines={1}>
                            {event.dateRange}
                        </Text>
                    )}

                    <View style={styles.verticalBottomRow}>
                        {hasAttendees && (
                            <View style={styles.attendeesContainer}>
                                {event.attendees.avatars.map((avatar, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: avatar }}
                                        style={[
                                            styles.attendeeAvatar,
                                            { zIndex: event.attendees.avatars.length - index, marginLeft: index === 0 ? 0 : -10 }
                                        ]}
                                        contentFit="cover"
                                    />
                                ))}
                                {event.attendees.count && (
                                    <View style={[
                                        styles.attendeeAvatar,
                                        styles.attendeeCountPill,
                                        { zIndex: 0, marginLeft: -10 }
                                    ]}>
                                        <Text style={styles.attendeeCountText}>+{event.attendees.count}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                        {event.price && (
                            <View style={styles.pricePill}>
                                <Text style={styles.priceText}>{event.price}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // 'home' variant used in the main feed
    if (variant === 'home') {
        return (
            <TouchableOpacity
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Image
                    source={{ uri: event.image }}
                    style={styles.homeImage}
                    contentFit="cover"
                    transition={300}
                />

                <View style={styles.homeContentContainer}>
                    <Text style={styles.homeTitleText} numberOfLines={2}>
                        {event.title}
                    </Text>

                    <View style={styles.homeBottomRow}>
                        <View style={styles.homeLocationContainer}>
                            <MaterialIcons name="location-on" size={16} color="#444" />
                            <Text style={styles.homeLocationText} numberOfLines={1}>
                                {event.location || "Location TBD"}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={() => console.log('Join clicked')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.joinButtonText}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // Default 'horizontal' variant used in Search
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Image
                source={{ uri: event.image }}
                style={styles.image}
                contentFit="cover"
                transition={300}
            />

            <View style={styles.textContainer}>
                <Text style={styles.titleText} numberOfLines={2}>
                    {event.title}
                </Text>
                <Text style={styles.dateText}>
                    {event.date}
                </Text>
            </View>

            {showHeart && (
                <View style={styles.heartContainer}>
                    {/* Heart icon will go here if needed in other screens */}
                </View>
            )}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        padding: moderateScale(10),
        marginBottom: verticalScale(15),
        // Subtle shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    // Horizontal specific styles
    image: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(12),
        backgroundColor: '#F0F0F0',
    },
    textContainer: {
        flex: 1,
        marginLeft: moderateScale(15),
        marginRight: moderateScale(10),
        justifyContent: 'center',
    },
    titleText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#222222',
        marginBottom: verticalScale(5),
    },
    dateText: {
        fontSize: moderateScale(13),
        color: '#8A8A8E',
        fontWeight: '500',
    },
    heartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(5),
    },

    // Vertical specific styles (for Popular/Upcoming carousels)
    verticalContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: moderateScale(280), // Wider to accommodate the design
        marginRight: moderateScale(15),
        padding: 0, // remove general padding
        overflow: 'hidden',
    },
    verticalImage: {
        width: '100%',
        height: verticalScale(160), // Taller image for overlays
        justifyContent: 'space-between',
        padding: moderateScale(10),
        backgroundColor: '#F0F0F0',
    },
    overlayTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    categoryPill: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(8),
    },
    categoryPillText: {
        color: '#333',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    heartButtonContainer: {
        backgroundColor: '#FFF0F5', // Light pink background
        padding: moderateScale(8),
        borderRadius: moderateScale(10),
    },
    organizerOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(5),
        paddingBottom: moderateScale(5),
    },
    organizerAvatar: {
        width: moderateScale(24),
        height: moderateScale(24),
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: 'white',
    },
    organizerName: {
        color: 'white',
        fontSize: moderateScale(12),
        fontWeight: '600',
        marginLeft: moderateScale(8),
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    verticalTextContainer: {
        padding: moderateScale(15),
        width: '100%',
    },
    dateTextVertical: {
        fontSize: moderateScale(13),
        color: '#666',
        marginTop: verticalScale(8),
        fontWeight: '500',
    },
    verticalBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(15),
    },
    attendeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendeeAvatar: {
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        borderWidth: 2,
        borderColor: 'white',
    },
    attendeeCountPill: {
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
    },
    attendeeCountText: {
        color: 'white',
        fontSize: moderateScale(10),
        fontWeight: 'bold',
    },
    pricePill: {
        backgroundColor: '#FFF0F5', // Very light pink background
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(8),
    },
    priceText: {
        color: AppColors.primary,
        fontWeight: 'bold',
        fontSize: moderateScale(14),
    },

    // Home specific styles
    homeImage: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(15),
        backgroundColor: '#F0F0F0',
    },
    homeContentContainer: {
        flex: 1,
        marginLeft: moderateScale(15),
        justifyContent: 'space-between',
        height: moderateScale(90), // match image height
    },
    homeTitleText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: verticalScale(2),
    },
    homeBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: verticalScale(8), // pushes location and button down
    },
    homeLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: moderateScale(10),
    },
    homeLocationText: {
        fontSize: moderateScale(13),
        color: '#666666',
        marginLeft: moderateScale(4),
        flex: 1,
    },
    joinButton: {
        backgroundColor: AppColors.primary,
        paddingHorizontal: moderateScale(18),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(8),
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: moderateScale(13),
        fontWeight: '600',
    }
});
