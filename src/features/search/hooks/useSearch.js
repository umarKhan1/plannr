import { useState, useMemo } from 'react';

// Temporary mock data until Supabase is integrated
const MOCK_EVENTS = [
    {
        id: '1',
        title: 'Satellite mega festival - 2022',
        date: 'THU 26 May, 09:00',
        image: 'https://images.unsplash.com/photo-1540039155732-d684d45cbc26?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '2',
        title: 'Dance party at the top of the town - 2022',
        date: 'THU 26 May, 09:00',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '3',
        title: 'Party with friends at night - 2022',
        date: 'THU 26 May, 09:00',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '4',
        title: 'Night lights festival - 2022',
        date: 'THU 26 May, 09:00',
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=200&auto=format&fit=crop',
    },
];

export function useSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Using useMemo to simulate derived state/filtering
    // When Supabase is added, this will become an async useEffect fetching data
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const lowerCaseQuery = searchQuery.toLowerCase();
        return MOCK_EVENTS.filter(event =>
            event.title.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching, // Can be used for a loading spinner later
    };
}
