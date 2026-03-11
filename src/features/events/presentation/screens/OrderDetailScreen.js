import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../../../../shared/theme/typography';
import { useEventDetails } from '../../hooks/useEventDetails';
import { useUserStore } from '../../../../core/store/useUserStore';

import OrderSummaryCard from '../components/order/OrderSummaryCard';
import PriceBreakdown from '../components/order/PriceBreakdown';
import PaymentMethodSelector from '../components/order/PaymentMethodSelector';
import StickyBottomPlaceOrder from '../components/order/StickyBottomPlaceOrder';
import PaymentSuccessModal from '../components/order/PaymentSuccessModal';
import ShimmerEffect from '../../../../shared/components/ShimmerEffect';

export default function OrderDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const { eventId, ticketPrice } = route.params || {};
    const { event, isLoading } = useEventDetails(eventId);
    const joinEvent = useUserStore(state => state.joinEvent);

    const [selectedPayment, setSelectedPayment] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // If ticketPrice was passed as a string like '$30.00'
    const rawPrice = ticketPrice ? parseFloat(ticketPrice.replace('$', '')) : 0;
    const fees = 3.00;
    const total = rawPrice + fees;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);

        // Mark user as joined in global store, saving simulated location data
        if (event) {
            joinEvent(event.id, {
                // generate a tiny random offset for map visualization
                latitude: event.locationCoordinates.latitude + (Math.random() - 0.5) * 0.01,
                longitude: event.locationCoordinates.longitude + (Math.random() - 0.5) * 0.01,
            });
        }

        setShowSuccessModal(true);
    };

    const handleViewTicket = () => {
        setShowSuccessModal(false);
        // Navigate back to event details
        navigation.goBack();
    };

    const handleGoHome = () => {
        setShowSuccessModal(false);
        navigation.navigate('Home');
    };

    if (isLoading || !event) {
        return (
            <View style={styles.centerContainer}>
                <Text>Loading Order Details...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="chevron-left" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Order Detail</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {isProcessing ? (
                    <View style={styles.shimmerContainer}>
                        {/* Summary Card Shimmer */}
                        <ShimmerEffect width="100%" height={112} borderRadius={16} style={{ marginBottom: 32 }} />

                        {/* Price Breakdown Shimmer */}
                        <ShimmerEffect width={140} height={24} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={20} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={20} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={20} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={40} style={{ marginTop: 8, marginBottom: 32 }} />

                        {/* Payment Method Shimmer */}
                        <ShimmerEffect width={160} height={24} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={48} borderRadius={12} style={{ marginBottom: 16 }} />
                        <ShimmerEffect width="100%" height={48} borderRadius={12} />
                    </View>
                ) : (
                    <>
                        <OrderSummaryCard event={event} />

                        <PriceBreakdown
                            ticketPrice={ticketPrice}
                            quantity={1}
                            fees={fees}
                        />

                        <PaymentMethodSelector
                            selectedMethod={selectedPayment}
                            onSelect={setSelectedPayment}
                        />
                    </>
                )}
            </ScrollView>

            <StickyBottomPlaceOrder
                total={total}
                onPress={handlePlaceOrder}
                isLoading={isProcessing}
            />

            <PaymentSuccessModal
                visible={showSuccessModal}
                onClose={handleGoHome}
                onViewTicket={handleViewTicket}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        ...Typography.h2,
        color: '#1A1A1A',
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100, // space for sticky button
    },
    shimmerContainer: {
        width: '100%',
    }
});
