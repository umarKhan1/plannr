import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AppColors } from '../theme/colors';
import { verticalScale, moderateScale } from '../../core/utils/responsive';

export const PrimaryButton = ({ text, onPress, style, textStyle, isLoading = false }) => {
    return (
        <TouchableOpacity
            style={[styles.btn, style, isLoading && styles.btnDisabled]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="white" size="small" />
            ) : (
                <Text style={[styles.btnText, textStyle]}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: verticalScale(55),
        borderRadius: moderateScale(15),
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow for depth (optional but professional)
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: verticalScale(2),
        },
        shadowOpacity: 0.1,
        shadowRadius: moderateScale(3),
        elevation: 3,
    },
    btnDisabled: {
        opacity: 0.7,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: moderateScale(18),
    },
});
