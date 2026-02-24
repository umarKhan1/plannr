import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { useCategorySelection } from '../../hooks/useCategorySelection';
import { CATEGORIES } from '../../../../core/constants/strings';


export default function CategorySelectionScreen({ navigation }) {
    const {
        selectedCategories,
        fadeAnim,
        toggleCategory,
        handleFinish
    } = useCategorySelection(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose your favorite event</Text>
                <Text style={styles.subtitle}>Get personalized event recomendation.</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.gridContainer}>
                    {CATEGORIES.map((category) => {
                        const isSelected = selectedCategories.includes(category.id);
                        return (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                                onPress={() => toggleCategory(category.id)}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons
                                    name={category.icon}
                                    size={24}
                                    color={isSelected ? AppColors.primary : '#444'}
                                />
                                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <PrimaryButton
                    text="Finish"
                    onPress={handleFinish}
                />
            </View>

            <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]} pointerEvents="none">
                <Text style={styles.toastText}>Only four categories are allowed</Text>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8A8A8A',
        marginBottom: 10,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Make room for the button
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 10,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 8,
        marginRight: 8,
    },
    categoryCardSelected: {
        borderColor: AppColors.primary,
        backgroundColor: '#F5F8FF', // subtle primary tint (or similar)
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginLeft: 8,
    },
    categoryTextSelected: {
        color: AppColors.primary,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        left: 20,
        right: 20,
    },
    toastContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 100 : 90,
        alignSelf: 'center',
        backgroundColor: '#333333',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    toastText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
});
