import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInputLib from 'react-native-phone-number-input';
import { AppColors } from '../theme/colors';
import { moderateScale, verticalScale } from '../../core/utils/responsive';

export const PhoneInputField = ({
    label,
    value,
    onChangeFormattedText,
    error
}) => {
    const phoneInput = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label} <Text style={{ color: 'red' }}>*</Text>
                </Text>
            )}

            <View style={[
                styles.wrapper,
                isFocused && styles.focusedInput,
                error && styles.errorInput
            ]}>
                <PhoneInputLib
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="US"
                    layout="first"
                    onChangeFormattedText={onChangeFormattedText}
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.textContainer}
                    textInputStyle={styles.textInput}
                    codeTextStyle={styles.codeText}
                    textInputProps={{
                        placeholder: '(409) 487-1935',
                        placeholderTextColor: '#9E9E9E',
                        onFocus: () => setIsFocused(true),
                        onBlur: () => setIsFocused(false),
                    }}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
    wrapper: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: moderateScale(12),
        backgroundColor: '#fff',
        overflow: 'hidden', // Ensures inner flat radius doesn't bleed
    },
    focusedInput: {
        borderColor: AppColors.primary,
        borderWidth: 1.5,
    },
    errorInput: {
        borderColor: 'red',
    },
    phoneContainer: {
        width: '100%',
        height: verticalScale(48), // Match CustomInput height
        backgroundColor: 'transparent',
    },
    textContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        height: verticalScale(48),
    },
    textInput: {
        fontSize: moderateScale(16),
        color: '#000',
        height: verticalScale(48), // Ensure vertical center
        paddingVertical: 0,
    },
    codeText: {
        fontSize: moderateScale(16),
        color: '#000',
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(5),
    }
});
