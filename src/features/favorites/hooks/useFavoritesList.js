import { useState, useEffect } from 'react';
import { useUserStore } from '../../../core/store/useUserStore';
import { MOCK_EVENTS } from '../../events/hooks/useGetEvents';

export const useFavoritesList = () => {
    const favoriteEventIds = useUserStore((state) => state.favoriteEvents);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Simulate network fetch
        const timer = setTimeout(() => {
            const resolvedFavs = favoriteEventIds
                .map((id) => MOCK_EVENTS.find((mock) => mock.id === id))
                .filter(Boolean); // Filter out any undefined matches
            
            setFavorites(resolvedFavs);
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [favoriteEventIds]);

    return {
        favorites,
        isLoading
    };
};
