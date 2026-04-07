import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../../../../core/constants/strings';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const CreateEventCategoryPicker = ({ selected, onSelect, error }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>
                Category <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((cat) => {
                    const isSelected = selected === cat.id;
                    return (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.pill, isSelected && styles.pillSelected]}
                            onPress={() => onSelect(cat.id)}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons
                                name={cat.icon}
                                size={moderateScale(16)}
                                color={isSelected ? '#fff' : '#555'}
                            />
                            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: verticalScale(15),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#333',
        marginBottom: verticalScale(8),
        paddingHorizontal: 0,
    },
    scrollContent: {
        gap: moderateScale(8),
        paddingRight: moderateScale(4),
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(9),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: '#E8E8E8',
        gap: moderateScale(6),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    pillSelected: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    pillText: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#333',
    },
    pillTextSelected: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(6),
    },
});

export default CreateEventCategoryPicker;
