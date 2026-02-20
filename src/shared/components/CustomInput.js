import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors } from '../theme/colors';
import { moderateScale, verticalScale } from '../../core/utils/responsive';
import Checkbox from 'expo-checkbox';
import { EyeIcon, EyeOffIcon } from '../../core/utils/SVGIcons';

export const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    keyboardType = 'default',
    isPassword
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const checkSecure = secureTextEntry && !isVisible;

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label} <Text style={{ color: 'red' }}>*</Text>
                </Text>
            )}

            <View style={[
                styles.inputContainer,
                isFocused && styles.focusedInput,
                error && styles.errorInput
            ]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9E9E9E"
                    secureTextEntry={checkSecure}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoCapitalize="none"
                />

                {isPassword && (
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.eyeBtn}>
                        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(15),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#333',
        marginBottom: verticalScale(6),
    },
    inputContainer: {
        height: verticalScale(50),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(15),
        backgroundColor: '#fff', // Design uses white/transparent
        flexDirection: 'row',
        alignItems: 'center',
    },
    focusedInput: {
        borderColor: AppColors.primary,
        borderWidth: 1.5,
    },
    errorInput: {
        borderColor: 'red',
    },
    input: {
        flex: 1,
        fontSize: moderateScale(16),
        color: '#000',
        height: '100%',
    },
    eyeBtn: {
        padding: moderateScale(5),
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(5),
    }
});
