import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const EventTicketCard = ({ event, isPast, onPressJoin, onPressViewTicket }) => {
    // If location is provided as an object, try to extract name
    const locationName = typeof event.location === 'string' 
        ? event.location 
        : (event.location?.name || 'Dhaka');

    // Default formatting if dateRange exists
    const dateFormatted = event.dateRange?.split(',')[0] || event.date || '03 October, 22';

    return (
        <View style={styles.cardContainer}>
            <Image 
                source={{ uri: event.image }} 
                style={styles.image}
                contentFit="cover"
                transition={200}
            />

            <View style={styles.detailsContainer}>
                {/* Title and Price Row */}
                <View style={styles.headerRow}>
                    <Text style={styles.title} numberOfLines={2}>
                        {event.title}
                    </Text>
                    <Text style={[styles.priceText, { color: AppColors.primary }]}>
                        {event.price && event.price !== 'Free' ? `${event.price}` : 'Free'}
                    </Text>
                </View>

                {/* Subtitle / Location Row and Action Button */}
                <View style={styles.footerRow}>
                    <View style={styles.metaInfo}>
                        <Text style={styles.metaText}>{dateFormatted}</Text>
                        <View style={styles.dot} />
                        <Text style={styles.metaText} numberOfLines={1}>
                            {locationName}
                        </Text>
                    </View>

                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity style={styles.viewButton} onPress={onPressViewTicket}>
                            <Text style={styles.viewButtonText}>VIEW TICKET</Text>
                        </TouchableOpacity>

                        {!isPast && (
                            <TouchableOpacity style={styles.actionButton} onPress={onPressJoin}>
                                <Text style={styles.actionText}>GROUP CHAT</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        padding: moderateScale(10),
        marginBottom: verticalScale(16),
        // Subtle Drop Shadow exactly like the design
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0', // Very light border for un-shadowed look consistency
    },
    image: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(12),
        backgroundColor: '#E0E0E0', // placeholder skeleton bg
    },
    detailsContainer: {
        flex: 1,
        marginLeft: moderateScale(14),
        justifyContent: 'space-between',
        paddingVertical: moderateScale(4),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        flex: 1,
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#222222',
        marginRight: moderateScale(10),
        lineHeight: moderateScale(22),
    },
    priceText: {
        fontSize: moderateScale(13),
        fontWeight: '700',
        // color handled dynamically via props to use Theme
    },
    footerRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: verticalScale(4),
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: moderateScale(8),
    },
    metaText: {
        fontSize: moderateScale(12),
        color: '#757575',
        fontWeight: '500',
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: AppColors.primary,
        marginHorizontal: moderateScale(6),
    },
    actionButtonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: verticalScale(6),
    },
    viewButton: {
        paddingVertical: verticalScale(4),
        paddingHorizontal: moderateScale(6),
        marginRight: moderateScale(8),
        borderRadius: moderateScale(6),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    viewButtonText: {
        fontSize: moderateScale(10),
        fontWeight: '700',
        color: '#555555',
        letterSpacing: 0.5,
    },
    actionButton: {
        paddingVertical: verticalScale(4),
        paddingHorizontal: moderateScale(4),
    },
    actionText: {
        fontSize: moderateScale(11),
        fontWeight: '800', // extra bold
        color: AppColors.primary, // Using primary color for call to action
        letterSpacing: 0.5,
    }
});

export default EventTicketCard;
