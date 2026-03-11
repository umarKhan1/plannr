import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../../../core/constants/strings';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

export function HomeCategoriesFilter({ selectedCategoryId, onSelectCategory }) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((category) => {
                    const isSelected = category.id === selectedCategoryId;

                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.pillContainer,
                                isSelected && styles.pillContainerSelected
                            ]}
                            activeOpacity={0.8}
                            onPress={() => onSelectCategory(category.id)}
                        >
                            <MaterialCommunityIcons
                                name={category.icon}
                                size={18}
                                color={isSelected ? '#FFFFFF' : '#444444'}
                            />
                            <Text style={[
                                styles.pillText,
                                isSelected && styles.pillTextSelected
                            ]}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(20),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(20),
        gap: moderateScale(10), // React Native 0.71+ supports gap in flex containers
    },
    pillContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: '#EFEFEF',
        // Subtle shadow to match screenshot
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1, // for Android
    },
    pillContainerSelected: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    pillText: {
        marginLeft: moderateScale(6),
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#333333',
    },
    pillTextSelected: {
        color: '#FFFFFF',
    }
});
