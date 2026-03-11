import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';
import { AppColors } from '../../../../../shared/theme/colors';

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {

    const methods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' // Simplified mastercard logo
        },
        {
            id: 'paypal',
            name: 'Paypal',
            icon: 'https://cdn-icons-png.flaticon.com/512/174/174861.png'
        }
    ];

    const renderMethod = (method) => {
        const isSelected = selectedMethod === method.id;

        return (
            <TouchableOpacity
                key={method.id}
                style={styles.methodRow}
                activeOpacity={0.7}
                onPress={() => onSelect(method.id)}
            >
                <View style={styles.iconContainer}>
                    <Image
                        source={method.icon}
                        style={styles.methodIcon}
                        contentFit="contain"
                    />
                </View>

                <Text style={styles.methodName}>{method.name}</Text>

                <View style={styles.radioContainer}>
                    {isSelected && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {methods.map(renderMethod)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(40),
    },
    sectionTitle: {
        ...Typography.h3,
        color: '#1A1A1A',
        fontWeight: 'bold',
        marginBottom: verticalScale(16),
    },
    methodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    iconContainer: {
        width: moderateScale(56),
        height: moderateScale(48),
        backgroundColor: '#F8F8F8',
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(16),
    },
    methodIcon: {
        width: moderateScale(32),
        height: moderateScale(24),
    },
    methodName: {
        flex: 1,
        ...Typography.body1,
        color: '#1A1A1A',
    },
    radioContainer: {
        width: moderateScale(24),
        height: moderateScale(24),
        borderRadius: moderateScale(12),
        borderWidth: 2,
        borderColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: moderateScale(12),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        backgroundColor: AppColors.primary,
    }
});

export default PaymentMethodSelector;
