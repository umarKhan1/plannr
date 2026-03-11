import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../../../../shared/components/PrimaryButton';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const StickyBottomBuyTicket = ({ price, onPress, isJoined }) => {
    const insets = useSafeAreaInsets();

    // Determine if event is free. We'll check if price is exactly 'Free' or '$0'
    const isFree = !price || price.toLowerCase() === 'free' || price === '$0' || price === '$0.00';

    let buttonText = isFree ? "Join" : "Buy Ticket";
    if (isJoined) {
        buttonText = "Joined";
    }

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <PrimaryButton
                text={buttonText}
                onPress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: verticalScale(16),
        paddingHorizontal: moderateScale(24),
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        // Shadow for separation from scroll view content
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 8,
    }
});

export default StickyBottomBuyTicket;
