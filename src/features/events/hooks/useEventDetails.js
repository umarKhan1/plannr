import { useState, useEffect } from 'react';
import { MOCK_EVENTS } from './useGetEvents';

export function useEventDetails(eventId) {
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!eventId) return;

        const fetchEvent = async () => {
            setIsLoading(true);
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                const foundEvent = MOCK_EVENTS.find(e => e.id === eventId);

                if (foundEvent) {
                    setEvent(foundEvent);
                } else {
                    setError('Event not found');
                }
            } catch (err) {
                setError(err.message || 'An error occurred fetching event details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    return { event, isLoading, error };
}
