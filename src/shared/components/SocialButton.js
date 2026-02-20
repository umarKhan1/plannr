import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { moderateScale, verticalScale, horizontalScale } from '../../core/utils/responsive';

export const SocialButton = ({ icon, text, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                {icon}
            </View>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%', // Allows two buttons side by side if needed, or we adapt usage
        height: verticalScale(50),
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: horizontalScale(10),
        marginBottom: verticalScale(15),
    },
    iconContainer: {
        marginRight: horizontalScale(10),
    },
    text: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: '#000',
    },
});
