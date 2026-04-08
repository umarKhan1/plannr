import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '../../../core/store/useUserStore';

// ─── Mock Profile Data (swap with API/store later) ────────────────────────────
const MOCK_PROFILE = {
    name: 'M Omar',
    avatar: 'https://i.pravatar.cc/300?img=33',
    followers: 1089,
    following: 275,
    events: 10,
};

export const useProfile = () => {
    const logout = useUserStore((s) => s.logout);
    const user = useUserStore((s) => s.user);

    // ── Local UI state ──────────────────────────────────────────────────────
    const [avatarUri, setAvatarUri] = useState(MOCK_PROFILE.avatar);
    const [pickerVisible, setPickerVisible] = useState(false);

    // Derived profile — later replace MOCK_PROFILE with real user from store
    const profile = {
        name: user?.name ?? MOCK_PROFILE.name,
        followers: MOCK_PROFILE.followers,
        following: MOCK_PROFILE.following,
        events: MOCK_PROFILE.events,
    };

    // ── Avatar picker ───────────────────────────────────────────────────────
    const openPicker = useCallback(() => setPickerVisible(true), []);
    const closePicker = useCallback(() => setPickerVisible(false), []);

    const pickFromGallery = useCallback(async () => {
        closePicker();
        // Let the sheet fully animate out first
        await new Promise(resolve => setTimeout(resolve, 320));

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please allow photo library access in Settings.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.85,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setAvatarUri(result.assets[0].uri);
        }
    }, [closePicker]);

    const pickFromCamera = useCallback(async () => {
        closePicker();
        await new Promise(resolve => setTimeout(resolve, 320));

        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please allow camera access in Settings.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.85,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setAvatarUri(result.assets[0].uri);
        }
    }, [closePicker]);

    // ── Logout ──────────────────────────────────────────────────────────────
    const handleLogout = useCallback(() => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', style: 'destructive', onPress: logout },
            ],
        );
    }, [logout]);

    return {
        profile,
        avatarUri,
        pickerVisible,
        openPicker,
        closePicker,
        pickFromGallery,
        pickFromCamera,
        handleLogout,
    };
};
