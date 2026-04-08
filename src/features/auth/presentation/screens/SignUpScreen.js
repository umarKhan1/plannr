import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { CustomInput } from '../../../../shared/components/CustomInput';
import { PhoneInputField } from '../../../../shared/components/PhoneInput';
import { useSignUp } from '../../hooks/useSignUp';
import { FadeInUp } from '../../../../shared/components/AnimatedEntry';

export default function SignUpScreen({ navigation }) {
    const {
        fullName, setFullName,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        password, setPassword,
        isLoading,
        errors,
        handleSignUp
    } = useSignUp(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <FadeInUp delay={100}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Create Your Account</Text>
                            <Text style={styles.subtitle}>
                                Join our community and start discovering amazing events today.
                            </Text>
                        </View>
                    </FadeInUp>

                    {/* Form Fields */}
                    <FadeInUp delay={200}>
                        <CustomInput
                            label="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Aaron Ramsdale"
                            error={errors.fullName}
                        />

                        <PhoneInputField
                            label="Phone Number"
                            value={phoneNumber}
                            onChangeFormattedText={setPhoneNumber}
                            error={errors.phoneNumber}
                        />

                        <CustomInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="aaronramsdale@gmail.com"
                            keyboardType="email-address"
                            error={errors.email}
                        />

                        <CustomInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••••••"
                            secureTextEntry
                            isPassword
                            error={errors.password}
                        />
                    </FadeInUp>

                    <FadeInUp delay={300}>
                        {/* Global Error (if any, like API failure) */}
                        {errors.global && (
                            <Text style={styles.globalError}>{errors.global}</Text>
                        )}

                        {/* Sign Up Button */}
                        <PrimaryButton
                            text="Sign Up"
                            onPress={handleSignUp}
                            isLoading={isLoading}
                            style={{ marginTop: verticalScale(10) }}
                        />

                        {/* Terms and Privacy */}
                        <View style={styles.termsRow}>
                            <Text style={styles.termsText}>By registering you agree to </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity>
                                    <Text style={styles.termsLink}>Terms & Conditions </Text>
                                </TouchableOpacity>
                                <Text style={styles.termsText}>and </Text>
                                <TouchableOpacity>
                                    <Text style={styles.termsLink}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Login Link */}
                        <View style={styles.loginRow}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginLink}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </FadeInUp>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingHorizontal: moderateScale(24),
        paddingTop: verticalScale(50),
        paddingBottom: verticalScale(50),
    },
    header: {
        marginBottom: verticalScale(30),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: verticalScale(2),
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: '#717171',
        lineHeight: moderateScale(20),
    },
    globalError: {
        color: 'red',
        fontSize: moderateScale(14),
        textAlign: 'center',
        marginBottom: verticalScale(10),
    },
    termsRow: {
        alignItems: 'center',
        marginTop: verticalScale(30),
    },
    termsText: {
        fontSize: moderateScale(13),
        color: '#717171',
        marginVertical: verticalScale(0),
    },
    termsLink: {
        fontSize: moderateScale(13),
        color: AppColors.primary,
        fontWeight: '400',
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(30),
    },
    loginText: {
        fontSize: moderateScale(15),
        color: '#717171',
    },
    loginLink: {
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        color: AppColors.primary,
        textDecorationLine: 'underline',
    },
});
