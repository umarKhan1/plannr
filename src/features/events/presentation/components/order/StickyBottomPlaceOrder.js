import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../../../../shared/components/PrimaryButton';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const StickyBottomPlaceOrder = ({ total, onPress, isLoading }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price</Text>
                <Text style={styles.priceValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    text="Place Order"
                    onPress={onPress}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: verticalScale(16),
        paddingHorizontal: moderateScale(24),
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 8,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        ...Typography.body1,
        color: '#4A4A4A',
        marginBottom: verticalScale(4),
    },
    priceValue: {
        ...Typography.h2,
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1.5,
    }
});

export default StickyBottomPlaceOrder;
