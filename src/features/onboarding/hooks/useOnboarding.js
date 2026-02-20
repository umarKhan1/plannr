import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { useUserStore } from '../../../core/store/useUserStore';
import { ONBOARDING_SLIDES } from '../../../core/constants/onboarding';

const { width } = Dimensions.get('window');

export const useOnboarding = (navigation) => {
    const currentSlideIndex = useUserStore((state) => state.currentSlideIndex);
    const setCurrentSlideIndex = useUserStore((state) => state.setCurrentSlideIndex);
    const completeOnboarding = useUserStore((state) => state.completeOnboarding);

    const flatListRef = useRef(null);

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);

        // Only update if index actually changed to prevent unnecessary re-renders
        if (currentIndex !== currentSlideIndex) {
            setCurrentSlideIndex(currentIndex);
        }
    };

    const handleNext = () => {
        if (currentSlideIndex < ONBOARDING_SLIDES.length - 1) {
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
            }
        } else {
            completeOnboarding();
            navigation.replace('Login');
        }
    };

    return {
        currentSlideIndex,
        flatListRef,
        updateCurrentSlideIndex,
        handleNext,
        data: ONBOARDING_SLIDES,
    };
};
