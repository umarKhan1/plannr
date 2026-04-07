import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const PhotoPickerSheet = ({ visible, onClose, onGallery, onCamera }) => {
    const translateY     = useSharedValue(300);
    const overlayOpacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            overlayOpacity.value = withTiming(1, { duration: 220 });
            translateY.value = withSpring(0, { damping: 18, stiffness: 160 });
        } else {
            overlayOpacity.value = withTiming(0, { duration: 200 });
            translateY.value = withTiming(300, {
                duration: 260,
                easing: Easing.out(Easing.cubic),
            });
        }
    }, [visible]);

    const sheetStyle   = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));
    const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));

    if (!visible) return null;

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
            {/* Dim overlay */}
            <Animated.View style={[styles.overlay, overlayStyle]}>
                <Pressable style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* Sheet */}
            <Animated.View style={[styles.sheet, sheetStyle]}>
                <View style={styles.handle} />

                <Text style={styles.title}>Update Profile Photo</Text>
                <Text style={styles.subtitle}>Choose how you'd like to set your photo</Text>

                <View style={styles.optionsRow}>
                    {/* Gallery */}
                    <TouchableOpacity style={styles.option} onPress={onGallery} activeOpacity={0.75}>
                        <View style={styles.iconCircle}>
                            <Feather name="image" size={moderateScale(24)} color={AppColors.primary} />
                        </View>
                        <Text style={styles.optionLabel}>Gallery</Text>
                        <Text style={styles.optionSub}>Pick from your photos</Text>
                    </TouchableOpacity>

                    <View style={styles.optionDivider} />

                    {/* Camera */}
                    <TouchableOpacity style={styles.option} onPress={onCamera} activeOpacity={0.75}>
                        <View style={styles.iconCircle}>
                            <Feather name="camera" size={moderateScale(24)} color={AppColors.primary} />
                        </View>
                        <Text style={styles.optionLabel}>Camera</Text>
                        <Text style={styles.optionSub}>Take a new photo</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

                <View style={{ height: Platform.OS === 'ios' ? verticalScale(24) : verticalScale(12) }} />
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: moderateScale(28),
        borderTopRightRadius: moderateScale(28),
        paddingHorizontal: moderateScale(24),
        paddingTop: verticalScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 20,
    },
    handle: {
        width: moderateScale(40),
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E0E0E0',
        alignSelf: 'center',
        marginBottom: verticalScale(20),
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1A1A2E',
        textAlign: 'center',
        marginBottom: verticalScale(4),
    },
    subtitle: {
        fontSize: moderateScale(13),
        color: '#9E9E9E',
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: verticalScale(24),
    },
    option: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: verticalScale(12),
    },
    iconCircle: {
        width: moderateScale(64),
        height: moderateScale(64),
        borderRadius: moderateScale(32),
        backgroundColor: `${AppColors.primary}12`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(10),
        borderWidth: 1.5,
        borderColor: `${AppColors.primary}30`,
    },
    optionLabel: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 2,
    },
    optionSub: {
        fontSize: moderateScale(11),
        color: '#9E9E9E',
    },
    optionDivider: {
        width: 1,
        height: verticalScale(60),
        backgroundColor: '#F0F0F0',
        marginHorizontal: moderateScale(8),
    },
    cancelBtn: {
        backgroundColor: '#F5F6FA',
        borderRadius: moderateScale(14),
        paddingVertical: verticalScale(14),
        alignItems: 'center',
    },
    cancelText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: '#757575',
    },
});

export default PhotoPickerSheet;
