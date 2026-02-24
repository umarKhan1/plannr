import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { useUserStore } from '../../../core/store/useUserStore';

export const useCategorySelection = (navigation) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Access global store context to persist selected categories
    const setUserCategories = useUserStore((state) => state.setUserCategories);

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
        // 1. Save to global state (Zustand)
        // With Zustand persist middleware, this acts as your local cache
        setUserCategories(selectedCategories);

        // 2. Future: This is where you would sync with Supabase
        // await supabase.from('user_profiles').update({ categories: selectedCategories }).eq('id', user.id);

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
