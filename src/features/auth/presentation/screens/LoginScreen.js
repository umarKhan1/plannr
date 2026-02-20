import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';
import { AppAssets } from '../../../../core/constants/assets';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { CustomInput } from '../../../../shared/components/CustomInput';
import { SocialButton } from '../../../../shared/components/SocialButton';
import { GoogleIcon, AppleIcon } from '../../../../core/utils/SVGIcons';
import { useLogin } from '../../hooks/useLogin';
import { FadeInUp } from '../../../../shared/components/AnimatedEntry';

export default function LoginScreen({ navigation }) {
    const {
        email, setEmail,
        password, setPassword,
        rememberMe, setRememberMe,
        errors,
        isLoading,
        handleLogin,
        handleGoogleLogin,
        handleAppleLogin
    } = useLogin(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header: Logo & Welcome */}
                    <FadeInUp delay={100}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Image
                                    source={AppAssets.logo}
                                    style={[styles.logo, { tintColor: AppColors.primary }]}
                                    resizeMode="contain"
                                />
                                <Text style={styles.brandName}>LogExpress</Text>
                            </View>

                            <Text style={styles.welcomeTitle}>Welcome back!</Text>
                            <Text style={styles.welcomeSubtitle}>Please enter your details</Text>
                        </View>
                    </FadeInUp>

                    {/* Social Buttons */}
                    <FadeInUp delay={200}>
                        <View style={styles.socialRow}>
                            <SocialButton
                                text="Google"
                                icon={<GoogleIcon />}
                                onPress={handleGoogleLogin}
                            />
                            <View style={{ width: moderateScale(15) }} />
                            <SocialButton
                                text="Apple"
                                icon={<AppleIcon />}
                                onPress={handleAppleLogin}
                            />
                        </View>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>
                    </FadeInUp>

                    {/* Form Fields & Actions */}
                    <FadeInUp delay={300}>
                        <CustomInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="helloexample@gmail.com"
                            error={errors.email}
                            keyboardType="email-address"
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

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.optionsRow}>
                            <View style={styles.rememberRow}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={rememberMe}
                                    onValueChange={setRememberMe}
                                    color={rememberMe ? AppColors.primary : undefined}
                                />
                                <Text style={styles.rememberText}>Remember for 30 days</Text>
                            </View>

                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forgot password</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <PrimaryButton
                            text="Login"
                            onPress={handleLogin}
                            isLoading={isLoading}
                            style={{ marginTop: verticalScale(20) }}
                        />

                        {/* Sign Up Link */}
                        <View style={styles.signupRow}>
                            <Text style={styles.signupText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signupLink}>Sign Up</Text>
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
        paddingTop: verticalScale(60),
        paddingBottom: verticalScale(30),
    },
    header: {
        marginBottom: verticalScale(20),
        // Removed alignItems: 'center' to align left defaults
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(25),
    },
    logo: {
        width: moderateScale(60),
        height: moderateScale(60),
        marginRight: moderateScale(20),
    },
    brandName: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#000',
    },
    welcomeTitle: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: verticalScale(8),
    },
    welcomeSubtitle: {
        fontSize: moderateScale(16),
        color: '#717171',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(20),
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: moderateScale(10),
        fontSize: moderateScale(14),
        color: '#717171',
        fontWeight: '500',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        marginTop: verticalScale(5),
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(6),
        borderColor: '#E0E0E0',
        marginRight: moderateScale(8),
    },
    rememberText: {
        fontSize: moderateScale(14),
        color: '#333',
    },
    forgotText: {
        fontSize: moderateScale(14),
        color: '#333',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    signupRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: verticalScale(30),
    },
    signupText: {
        fontSize: moderateScale(16),
        color: '#717171',
    },
    signupLink: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: AppColors.primary,
        textDecorationLine: 'underline',
    },
});
