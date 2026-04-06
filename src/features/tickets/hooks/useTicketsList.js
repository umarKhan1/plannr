import { useState, useEffect } from 'react';
import { useUserStore } from '../../../core/store/useUserStore';
// To reuse the same central mock data for your upcoming events
import { MOCK_EVENTS } from '../../events/hooks/useGetEvents';

export const useTicketsList = (activeTab) => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pull joined event IDs from the global store
    const joinedEvents = useUserStore((state) => state.joinedEvents);

    useEffect(() => {
        let isMounted = true;

        const loadTickets = async () => {
            setIsLoading(true);
            
            // Artificial delay to show the nice shimmer effect
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!isMounted) return;

            // Map store references to actual full event objects
            const userTickets = joinedEvents.map(joined => {
                const eventDetails = MOCK_EVENTS.find(e => e.id === joined.eventId);
                return eventDetails ? { ...eventDetails, ...joined } : null;
            }).filter(Boolean); // remove nulls if any mock mismatch

            // Simple logic for distinguishing Past vs Upcoming based on Mock Data IDs
            // Replace this with actual Date comparison logic when hooked with Supabase
            // e.g. new Date(event.date) < new Date()
            const filteredTickets = userTickets.filter(ticket => {
                // Mock logic: Event ID '1' is considered a PASSED event for preview purposes.
                // ID >= 2 are UPCOMING events.
                const isPastEvent = ticket.id === '1'; 
                
                if (activeTab === 'UPCOMING') {
                    return !isPastEvent;
                } else {
                    return isPastEvent; // PAST
                }
            });

            setTickets(filteredTickets);
            setIsLoading(false);
        };

        loadTickets();

        return () => { isMounted = false; };
    }, [activeTab, joinedEvents]);

    return {
        tickets,
        isLoading
    };
};
