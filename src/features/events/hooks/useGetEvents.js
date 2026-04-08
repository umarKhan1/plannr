import { useState, useEffect } from 'react';

// Mock data for the home screen feed
export const MOCK_EVENTS = [
    {
        id: '1',
        title: 'Going to a Rock Concert',
        categoryName: 'Music',
        dateRange: 'THU 26 May, 09:00 - FRI 27 May, 10:00',
        location: 'New York',
        price: '$30.00',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop', // High-quality concert image
        organizer: {
            name: 'Altanito Salami',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        },
        attendees: {
            avatars: [
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=50&auto=format&fit=crop',
            ],
            count: 15, // +15 
        },
        description: "Experience the ultimate rock energy! Join us for an unforgettable night featuring top-tier bands, incredible light shows, and a high-octane atmosphere that will keep you on your feet all night long.",
        locationCoordinates: { latitude: 23.2156, longitude: 72.6369 } // Gandhinagar
    },
    {
        id: '2',
        title: 'Friday Night Dance Party',
        categoryName: 'Dance',
        dateRange: 'FRI 27 May, 22:00 - SAT 28 May, 03:00',
        location: 'California',
        price: 'Free',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', // Dance floor image
        organizer: {
            name: 'Maria Johns',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
        },
        attendees: {
            avatars: [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=50&auto=format&fit=crop',
            ],
            count: 42,
        },
        description: "Come join us for a fun night of dancing under the stars. Live DJ, drinks, and a great vibe!",
        locationCoordinates: { latitude: 36.7783, longitude: -119.4179 }
    },
    {
        id: '3',
        title: 'Tech Innovators Summit 2024',
        categoryName: 'Business',
        dateRange: 'MON 15 Aug, 08:00 - TUE 16 Aug, 18:00',
        location: 'San Francisco',
        price: '$150.00',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop',
        organizer: {
            name: 'TechCrunch',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop',
        },
        attendees: {
            avatars: [
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=50&auto=format&fit=crop',
            ],
            count: 250,
        },
        description: "The biggest tech summit of the year showcasing the latest innovations, keynote speakers, and networking opportunities.",
        locationCoordinates: { latitude: 37.7749, longitude: -122.4194 }
    },
    {
        id: '4',
        title: 'Global Music Awards',
        categoryName: 'Event',
        dateRange: 'SAT 02 Jul, 18:00 - 23:00',
        location: 'Los Angeles',
        price: '$95.00',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop',
        organizer: {
            name: 'Recording Academy',
            avatar: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=100&auto=format&fit=crop',
        },
        attendees: {
            avatars: [
                'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=50&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=50&auto=format&fit=crop',
            ],
            count: 120,
        },
        description: "Celebrating the best in global music. Join us for a night of incredible performances and awards.",
        locationCoordinates: { latitude: 34.0522, longitude: -118.2437 }
    }
];

export function useGetEvents(activeCategoryId, userPreferredIds = []) {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Independent state for Popular Now
    const [popularEvents, setPopularEvents] = useState([]);
    const [isPopularLoading, setIsPopularLoading] = useState(true);

    // Fetch popular events ONCE (they don't depend on category filter in the design)
    useEffect(() => {
        const fetchPopular = async () => {
            setIsPopularLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800)); // mock network delay
            setPopularEvents(MOCK_EVENTS);
            setIsPopularLoading(false);
        };
        fetchPopular();
    }, []);

    // Fetch categorical upcoming events when category changes
    useEffect(() => {
        // Simulate an API call based on categories
        const fetchEvents = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800)); // mock network delay

            // Simulate that certain categories have no events to show the empty state
            // E.g., Health(4), Education(6), Holiday(15) return empty
            if (['4', '6', '14', '15'].includes(activeCategoryId)) {
                setEvents([]);
            } else {
                setEvents(MOCK_EVENTS);
            }

            setIsLoading(false);
        };

        fetchEvents();
    }, [activeCategoryId]);

    return { events, isLoading, popularEvents, isPopularLoading };
}
