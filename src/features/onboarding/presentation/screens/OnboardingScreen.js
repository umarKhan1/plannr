import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native';
import { AppColors } from '../../../../shared/theme/colors';
import { useOnboarding } from '../../hooks/useOnboarding';
import { OnboardingButton, OnboardingSlide } from '../components/OnboardingUI';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
    const {
        currentSlideIndex,
        flatListRef,
        updateCurrentSlideIndex,
        handleNext,
        data
    } = useOnboarding(navigation);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <FlatList
                ref={flatListRef}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                pagingEnabled
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <OnboardingSlide item={item} />}
                keyExtractor={(item) => item.id}
                bounces={false}
                // Performance Props
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
            />

            {/* Floating Footer (Indicators & Button) */}
            <View style={styles.floatingFooter}>
                <View style={styles.indicatorContainer}>
                    {data.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex === index && styles.indicatorActive,
                            ]}
                        />
                    ))}
                </View>

                <OnboardingButton
                    text={currentSlideIndex === data.length - 1 ? 'Get Started' : 'Next'}
                    onPress={handleNext}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    floatingFooter: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        zIndex: 10,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    indicator: {
        height: 6,
        width: 6,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
        borderRadius: 3,
    },
    indicatorActive: {
        backgroundColor: AppColors.primary,
        width: 25,
    },
});
