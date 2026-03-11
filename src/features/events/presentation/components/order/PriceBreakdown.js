import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const PriceBreakdown = ({ ticketPrice, quantity = 1, fees = 3.00 }) => {
    const rawPrice = parseFloat(ticketPrice.replace('$', '')) || 0;
    const subtotal = rawPrice * quantity;
    const total = subtotal + fees;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            <View style={styles.row}>
                <Text style={styles.label}>{quantity}x Ticket price</Text>
                <Text style={styles.value}>${rawPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Fees</Text>
                <Text style={styles.value}>${fees.toFixed(2)}</Text>
            </View>

            <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(32),
    },
    sectionTitle: {
        ...Typography.h3,
        color: '#1A1A1A',
        fontWeight: 'bold',
        marginBottom: verticalScale(16),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(16),
    },
    label: {
        ...Typography.body1,
        color: '#4A4A4A',
    },
    value: {
        ...Typography.body1,
        color: '#1A1A1A',
        fontWeight: '500',
    },
    totalRow: {
        marginTop: verticalScale(8),
        paddingTop: verticalScale(16),
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    totalLabel: {
        ...Typography.h3,
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    totalValue: {
        ...Typography.h3,
        color: '#1A1A1A',
        fontWeight: 'bold',
    }
});

export default PriceBreakdown;
