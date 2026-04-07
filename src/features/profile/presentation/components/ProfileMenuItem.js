import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const ProfileMenuItem = ({ icon, label, onPress, isDestructive = false }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn  = () => { scale.value = withSpring(0.97, { damping: 15, stiffness: 200 }); };
    const handlePressOut = () => { scale.value = withSpring(1,    { damping: 15, stiffness: 200 }); };

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                style={styles.row}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={[styles.iconBadge, isDestructive && styles.iconBadgeDestructive]}>
                    {icon}
                </View>

                <Text style={[styles.label, isDestructive && styles.labelDestructive]}>
                    {label}
                </Text>

                {!isDestructive && (
                    <Feather name="chevron-right" size={moderateScale(18)} color="#BDBDBD" />
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(14),
    },
    iconBadge: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(10),
        backgroundColor: `${AppColors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(14),
    },
    iconBadgeDestructive: {
        backgroundColor: '#FFEBEE',
    },
    label: {
        flex: 1,
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: '#1A1A2E',
    },
    labelDestructive: {
        color: '#E53935',
    },
});

export default ProfileMenuItem;
