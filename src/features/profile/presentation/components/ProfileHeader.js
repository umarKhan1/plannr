import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const ProfileHeader = ({ name, avatarUri, onAvatarPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={onAvatarPress}
                style={styles.avatarWrapper}
            >
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
                <View style={styles.cameraBadge}>
                    <Feather name="camera" size={moderateScale(12)} color="#FFF" />
                </View>
            </TouchableOpacity>

            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: verticalScale(24),
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: verticalScale(12),
    },
    avatar: {
        width: moderateScale(100),
        height: moderateScale(100),
        borderRadius: moderateScale(50),
        borderWidth: 3,
        borderColor: AppColors.primary,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#1A1A2E',
        letterSpacing: 0.2,
    },
});

export default ProfileHeader;
