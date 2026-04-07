import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { FadeInUp } from '../../../../shared/components/AnimatedEntry';
import { CustomInput }   from '../../../../shared/components/CustomInput';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { useEditProfile } from '../../hooks/useEditProfile';
import { AppColors }     from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const EditProfileScreen = ({ navigation }) => {
    const {
        fullName, setFullName,
        email,    setEmail,
        password, setPassword,
        isLoading,
        errors,
        handleUpdate,
    } = useEditProfile(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {/* ── Header ── */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="chevron-left" size={moderateScale(26)} color="#1A1A2E" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Edit Profile</Text>

                    {/* Spacer to keep title centred */}
                    <View style={styles.headerSpacer} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* ── Form ── */}
                    <FadeInUp delay={100}>
                        <CustomInput
                            label="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Enter your full name"
                            autoCapitalize="words"
                            error={errors.fullName}
                        />

                        <CustomInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            error={errors.email}
                        />

                        <CustomInput
                            label="New Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Leave blank to keep current"
                            secureTextEntry
                            isPassword
                            error={errors.password}
                        />
                    </FadeInUp>

                    {/* ── Global error ── */}
                    {errors.global && (
                        <Text style={styles.globalError}>{errors.global}</Text>
                    )}

                    {/* ── Update button ── */}
                    <FadeInUp delay={200}>
                        <PrimaryButton
                            text="Update Profile"
                            onPress={handleUpdate}
                            isLoading={isLoading}
                            style={styles.updateBtn}
                        />
                    </FadeInUp>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    /* Header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(16),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backBtn: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(12),
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1A1A2E',
        letterSpacing: 0.2,
    },
    headerSpacer: {
        width: moderateScale(38),   // mirrors backBtn width to keep title centred
    },

    /* Scroll */
    scrollContent: {
        paddingHorizontal: moderateScale(24),
        paddingTop: verticalScale(28),
        paddingBottom: verticalScale(50),
    },

    /* Errors / button */
    globalError: {
        color: 'red',
        fontSize: moderateScale(13),
        textAlign: 'center',
        marginBottom: verticalScale(10),
    },
    updateBtn: {
        marginTop: verticalScale(12),
    },
});

export default EditProfileScreen;
