import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { useUserStore } from '../../../core/store/useUserStore';
import { CATEGORIES } from '../../../core/constants/strings';

export const useCategorySelection = (navigation) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Access global store context to persist selected categories
    const syncUserCategories = useUserStore((state) => state.syncUserCategories);

    const showToast = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const toggleCategory = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(prev => prev.filter(catId => catId !== id));
        } else {
            if (selectedCategories.length >= 4) {
                showToast();
            } else {
                setSelectedCategories(prev => [...prev, id]);
            }
        }
    };

    const handleFinish = async () => {
        // 1. Map IDs to human-readable names for the database
        const categoryNames = selectedCategories.map(id => {
            const category = CATEGORIES.find(cat => cat.id === id);
            return category ? category.name : id;
        });

        // 2. Save to global state and sync with Supabase
        await syncUserCategories(categoryNames);

        // 3. Navigate home
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return {
        selectedCategories,
        fadeAnim,
        toggleCategory,
        handleFinish
    };
};
