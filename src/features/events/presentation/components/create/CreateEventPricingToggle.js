import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const OPTIONS = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
];

const CreateEventPricingToggle = ({ value, onChange }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>
                Ticket Price <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <View style={styles.container}>
                {OPTIONS.map((option) => {
                    const isActive = value === option.value;
                    return (
                        <TouchableOpacity
                            key={option.value}
                            style={[styles.pill, isActive && styles.pillActive]}
                            onPress={() => onChange(option.value)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
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
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F5',
        borderRadius: moderateScale(12),
        padding: moderateScale(4),
    },
    pill: {
        flex: 1,
        paddingVertical: verticalScale(11),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillActive: {
        backgroundColor: AppColors.primary,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    pillText: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#888',
    },
    pillTextActive: {
        color: '#fff',
    },
});

export default CreateEventPricingToggle;
