import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const CreateEventImagePicker = ({ uri, onPress, error }) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[styles.container, error && styles.containerError]}
                onPress={onPress}
                activeOpacity={0.8}
            >
                {uri ? (
                    <>
                        <Image source={{ uri }} style={styles.image} />
                        {/* Edit overlay */}
                        <View style={styles.editOverlay}>
                            <View style={styles.editBadge}>
                                <Feather name="camera" size={moderateScale(16)} color="#fff" />
                                <Text style={styles.editText}>Change Photo</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.placeholder}>
                        <View style={styles.iconCircle}>
                            <Feather name="camera" size={moderateScale(28)} color={AppColors.primary} />
                        </View>
                        <Text style={styles.placeholderTitle}>Add Cover Photo</Text>
                        <Text style={styles.placeholderSub}>Tap to upload a 16:9 image</Text>
                    </View>
                )}
            </TouchableOpacity>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: verticalScale(20),
    },
    container: {
        height: verticalScale(190),
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        backgroundColor: '#FAFAFA',
    },
    containerError: {
        borderColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(20),
        gap: moderateScale(6),
    },
    editText: {
        color: '#fff',
        fontSize: moderateScale(13),
        fontWeight: '600',
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderStyle: 'dashed',
    },
    placeholderTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 4,
    },
    placeholderSub: {
        fontSize: moderateScale(12),
        color: '#9E9E9E',
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(4),
        marginLeft: moderateScale(4),
    },
});

export default CreateEventImagePicker;
