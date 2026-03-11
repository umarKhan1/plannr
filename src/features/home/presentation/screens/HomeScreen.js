import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeLocationHeader } from '../../../map/presentation/components/HomeLocationHeader';
import { HomeSearchBar } from '../../../search/presentation/components/HomeSearchBar';
import { HomeCategoriesFilter } from '../../../categories/presentation/components/HomeCategoriesFilter';
import { EventCard } from '../../../events/presentation/components/EventCard';
import { EventCardShimmer } from '../../../events/presentation/components/EventCardShimmer';
import { useGetEvents } from '../../../events/hooks/useGetEvents';
import { useUserStore } from '../../../../core/store/useUserStore';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

export default function HomeScreen() {
    const navigation = useNavigation();
    const userCategoryIds = useUserStore((state) => state.userCategories) || [];

    const defaultCategoryId = userCategoryIds.length > 0 ? userCategoryIds[0] : '1';
    const [selectedCategoryId, setSelectedCategoryId] = useState(defaultCategoryId);
    const { events, isLoading, popularEvents, isPopularLoading } = useGetEvents(selectedCategoryId, userCategoryIds);

    // Function to group events into pairs for the 2-row horizontal layout in Upcoming Events
    const chunkArray = (arr, size) => {
        const chunked = [];
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
    };

    const chunkedEvents = chunkArray(events, 2);

    const renderEmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <MaterialCommunityIcons name="calendar-blank-outline" size={60} color="#E0E0E0" />
            <Text style={styles.emptyStateTitle}>No events right now</Text>
            <Text style={styles.emptyStateSubtitle}>
                We couldn't find any upcoming events matching your selected categories. Try updating your preferences!
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <HomeLocationHeader />
                <HomeSearchBar />

                {/* Categories & Upcoming Events Section */}
                <View style={[styles.upcomingSection, { paddingTop: 0 }]}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    </View>

                    <HomeCategoriesFilter
                        selectedCategoryId={selectedCategoryId}
                        onSelectCategory={setSelectedCategoryId}
                    />

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.upcomingEventsList}
                    >
                        {isLoading ? (
                            <>
                                <View style={styles.horizontalCardWrapper}>
                                    <EventCardShimmer variant="home" />
                                    <View style={{ marginTop: 15 }}>
                                        <EventCardShimmer variant="home" />
                                    </View>
                                </View>
                                <View style={styles.horizontalCardWrapper}>
                                    <EventCardShimmer variant="home" />
                                    <View style={{ marginTop: 15 }}>
                                        <EventCardShimmer variant="home" />
                                    </View>
                                </View>
                            </>
                        ) : events.length === 0 ? (
                            renderEmptyState()
                        ) : (
                            chunkedEvents.map((chunk, index) => (
                                <View key={`upcoming-chunk-${index}`} style={styles.horizontalCardWrapper}>
                                    <EventCard
                                        event={chunk[0]}
                                        variant="home"
                                        showHeart={false}
                                        onPress={() => navigation.navigate('EventDetails', { eventId: chunk[0].id })}
                                    />
                                    {chunk[1] && (
                                        <View style={{ marginTop: 15 }}>
                                            <EventCard
                                                event={chunk[1]}
                                                variant="home"
                                                showHeart={false}
                                                onPress={() => navigation.navigate('EventDetails', { eventId: chunk[1].id })}
                                            />
                                        </View>
                                    )}
                                </View>
                            ))
                        )}
                    </ScrollView>
                </View>

                {/* Popular Now Section */}
                <View style={styles.eventsContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Popular Now</Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScrollContent}
                    >
                        {isPopularLoading ? (
                            <>
                                <EventCardShimmer variant="vertical" />
                                <EventCardShimmer variant="vertical" />
                            </>
                        ) : popularEvents.length === 0 ? (
                            <View style={styles.emptyStateContainerSmall}>
                                <Text style={styles.emptyStateSubtitle}>No popular events.</Text>
                            </View>
                        ) : (
                            popularEvents.map((event) => (
                                <EventCard
                                    key={`popular-${event.id}`}
                                    event={event}
                                    variant="vertical"
                                    showHeart={true}
                                    onPress={() => navigation.navigate('EventDetails', { eventId: event.id })}
                                />
                            ))
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    eventsContainer: {
        paddingTop: verticalScale(10),
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        marginBottom: verticalScale(15),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    seeAllText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: AppColors.primary,
    },
    horizontalScrollContent: {
        paddingHorizontal: moderateScale(20),
        gap: moderateScale(15), // Consistent spacing between cards
    },
    upcomingSection: {
        paddingTop: verticalScale(20),
    },
    upcomingEventsList: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(15),
        gap: moderateScale(15),
    },
    horizontalCardWrapper: {
        width: moderateScale(300), // Fixed width so they look like a carousel
    },
    loadingContainer: {
        paddingTop: verticalScale(40),
        alignItems: 'center',
    },
    emptyStateContainer: {
        paddingTop: verticalScale(40),
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    emptyStateContainerSmall: {
        paddingVertical: verticalScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(300), // Match card width roughly
    },
    emptyStateTitle: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        color: '#333',
        marginTop: verticalScale(15),
        marginBottom: verticalScale(8),
    },
    emptyStateSubtitle: {
        fontSize: moderateScale(15),
        color: '#888',
        textAlign: 'center',
        lineHeight: moderateScale(22),
    }
});
