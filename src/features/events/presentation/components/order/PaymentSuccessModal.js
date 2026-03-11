import React, { useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { Typography } from '../../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';
import { PrimaryButton } from '../../../../../shared/components/PrimaryButton';
import { AppColors } from '../../../../../shared/theme/colors';

const PaymentSuccessModal = ({ visible, onClose, onViewTicket }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            scale.value = withSpring(1, { damping: 12, stiffness: 90 });
            opacity.value = withTiming(1, { duration: 400 });
        } else {
            scale.value = 0;
            opacity.value = 0;
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.card, animatedStyle]}>

                    <View style={styles.iconOuterCircle}>
                        <View style={styles.iconInnerCircle}>
                            <Feather name="check" size={32} color="#FFFFFF" />
                        </View>
                    </View>

                    <Text style={styles.title}>Congratulations!</Text>
                    <Text style={styles.subtitle}>
                        You have successfully placed order for party with friends. Enjoy the event!
                    </Text>

                    <PrimaryButton
                        text="View E-Ticket"
                        onPress={onViewTicket}
                        style={styles.viewTicketBtn}
                    />

                    <TouchableOpacity
                        style={styles.homeBtn}
                        onPress={onClose}
                    >
                        <Text style={styles.homeBtnText}>Go to Home</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(24),
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(24),
        padding: moderateScale(32),
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    iconOuterCircle: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        backgroundColor: '#E6F8EF', // light teal green background
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(24),
    },
    iconInnerCircle: {
        width: moderateScale(70),
        height: moderateScale(70),
        borderRadius: moderateScale(35),
        backgroundColor: '#4ade80', // success green
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...Typography.h2,
        color: '#1A1A1A',
        fontWeight: 'bold',
        marginBottom: verticalScale(12),
        textAlign: 'center',
    },
    subtitle: {
        ...Typography.body1,
        color: '#7A7A7A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: verticalScale(32),
        paddingHorizontal: moderateScale(16),
    },
    viewTicketBtn: {
        marginBottom: verticalScale(16),
    },
    homeBtn: {
        width: '100%',
        height: verticalScale(55),
        borderRadius: moderateScale(15),
        borderWidth: 1.5,
        borderColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeBtnText: {
        color: AppColors.primary,
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    }
});

export default PaymentSuccessModal;
