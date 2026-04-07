import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { useProfile } from '../../hooks/useProfile';
import ProfileHeader      from '../components/ProfileHeader';
import ProfileStatBar     from '../components/ProfileStatBar';
import ProfileMenuItem    from '../components/ProfileMenuItem';
import PhotoPickerSheet   from '../components/PhotoPickerSheet';

import { AppColors }      from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const {
        profile,
        avatarUri,
        pickerVisible,
        openPicker,
        closePicker,
        pickFromGallery,
        pickFromCamera,
        handleLogout,
    } = useProfile();

    const tealProps = { size: moderateScale(18), color: AppColors.primary };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false}
            >
                {/* Title */}
                <Animated.Text entering={FadeInDown.delay(0).springify()} style={styles.pageTitle}>
                    Profile
                </Animated.Text>

                {/* Avatar + Name */}
                <Animated.View entering={FadeInDown.delay(80).springify()}>
                    <ProfileHeader
                        name={profile.name}
                        avatarUri={avatarUri}
                        onAvatarPress={openPicker}
                    />
                </Animated.View>

                {/* Stats */}
                <Animated.View entering={FadeInDown.delay(160).springify()}>
                    <ProfileStatBar
                        followers={profile.followers}
                        following={profile.following}
                        events={profile.events}
                    />
                </Animated.View>

                <View style={styles.gap} />

                {/* Main menu card */}
                <Animated.View entering={FadeInDown.delay(240).springify()} style={styles.menuCard}>
                    <ProfileMenuItem
                        icon={<Feather name="user" {...tealProps} />}
                        label="Edit Profile"
                        onPress={() => navigation.navigate('EditProfile')}
                    />
                    <View style={styles.menuDivider} />

                    <ProfileMenuItem
                        icon={<Feather name="plus-circle" {...tealProps} />}
                        label="Create Events"
                        onPress={() => navigation.navigate('CreateEvent')}
                    />
                    <View style={styles.menuDivider} />

                    <ProfileMenuItem
                        icon={<Feather name="file-text" {...tealProps} />}
                        label="Terms and Condition"
                        onPress={() => Alert.alert('Terms & Condition', 'Coming soon')}
                    />
                    <View style={styles.menuDivider} />

                    <ProfileMenuItem
                        icon={<Feather name="shield" {...tealProps} />}
                        label="Privacy Policy"
                        onPress={() => Alert.alert('Privacy Policy', 'Coming soon')}
                    />
                </Animated.View>

                <View style={styles.gap} />

                {/* Logout card */}
                <Animated.View entering={FadeInDown.delay(320).springify()} style={styles.menuCard}>
                    <ProfileMenuItem
                        icon={<Feather name="log-out" size={moderateScale(18)} color="#E53935" />}
                        label="Log Out"
                        onPress={handleLogout}
                        isDestructive
                    />
                </Animated.View>

                <View style={{ height: verticalScale(100) }} />
            </ScrollView>

            {/* Photo Picker Bottom Sheet */}
            <PhotoPickerSheet
                visible={pickerVisible}
                onClose={closePicker}
                onGallery={pickFromGallery}
                onCamera={pickFromCamera}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    scrollContent: {
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(12),
    },
    pageTitle: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#1A1A2E',
        letterSpacing: 0.3,
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    gap: {
        height: verticalScale(16),
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginLeft: moderateScale(68),
    },
});

export default ProfileScreen;
