import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useUserStore } from '../../../../core/store/useUserStore';

import { useEventDetails } from '../../hooks/useEventDetails';
import EventDetailsShimmer from '../components/details/EventDetailsShimmer';
import EventImageHeader from '../components/details/EventImageHeader';
import EventInfoTitleCard from '../components/details/EventInfoTitleCard';
import EventAboutSection from '../components/details/EventAboutSection';
import EventOrganizerRow from '../components/details/EventOrganizerRow';
import EventLocationPreview from '../components/details/EventLocationPreview';
import StickyBottomBuyTicket from '../components/details/StickyBottomBuyTicket';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { Typography } from '../../../../shared/theme/typography';

export default function EventDetailsScreen() {
    const route = useRoute();
    const { eventId } = route.params || {};
    const { event, isLoading, error } = useEventDetails(eventId);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Access global store
    const hasJoinedEvent = useUserStore(state => state.hasJoinedEvent);
    const joinEvent = useUserStore(state => state.joinEvent);

    // Derived state
    const isGloballyJoined = hasJoinedEvent(eventId);

    // Local state for immediate UI feedback (simulating real-time update)
    const [localEventData, setLocalEventData] = useState(null);
    const [isLocalJoined, setIsLocalJoined] = useState(false);

    // The actual joined state is true if either global store or local mock state says so
    const isJoined = isGloballyJoined || isLocalJoined;

    useEffect(() => {
        if (event) {
            setLocalEventData(event);
        }
    }, [event]);

    const handleJoinOrBuy = () => {
        if (!localEventData) return;

        const isFree = !localEventData.price || localEventData.price.toLowerCase() === 'free' || localEventData.price === '$0';

        if (isFree && !isJoined) {
            // Simulate adding current user to attendees in UI
            const mockUserAvatar = 'https://i.pravatar.cc/150?img=32';

            setLocalEventData(prev => {
                const updatedAttendees = { ...prev.attendees };
                updatedAttendees.count += 1;
                updatedAttendees.avatars = [mockUserAvatar, ...(updatedAttendees.avatars || [])].slice(0, 5);

                return { ...prev, attendees: updatedAttendees };
            });
            setIsLocalJoined(true);

            // Push to global store
            joinEvent(eventId, {
                latitude: localEventData.locationCoordinates.latitude + (Math.random() - 0.5) * 0.01,
                longitude: localEventData.locationCoordinates.longitude + (Math.random() - 0.5) * 0.01,
            });
            console.log('Joined free event!');
        } else if (!isJoined) {
            // Proceed to buy ticket flow
            navigation.navigate('OrderDetail', { eventId: eventId, ticketPrice: localEventData.price });
        }
    };

    if (isLoading || !localEventData) {
        return <EventDetailsShimmer />;
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error || "Event not found"}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: verticalScale(100) }}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <EventImageHeader imageUrl={localEventData.image} eventId={eventId} />

                <EventInfoTitleCard
                    title={localEventData.title}
                    price={localEventData.price}
                    location={localEventData.location}
                    dateRange={localEventData.dateRange}
                    attendees={localEventData.attendees}
                />

                <EventAboutSection description={localEventData.description} />

                <EventOrganizerRow
                    organizer={localEventData.organizer}
                    attendees={localEventData.attendees}
                />

                <EventLocationPreview
                    eventId={localEventData.id}
                    locationName={localEventData.location}
                />
            </ScrollView>

            <StickyBottomBuyTicket
                price={localEventData.price}
                isJoined={isJoined}
                onPress={handleJoinOrBuy}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    errorText: {
        ...Typography.h3,
        color: '#FF0055',
    }
});
