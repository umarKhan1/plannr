import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const StatColumn = ({ value, label }) => (
    <View style={styles.col}>
        <Text style={styles.value}>{value.toLocaleString()}</Text>
        <Text style={styles.label}>{label}</Text>
    </View>
);

const ProfileStatBar = ({ followers, following, events }) => {
    return (
        <View style={styles.container}>
            <StatColumn value={followers} label="Followers" />
            <View style={styles.divider} />
            <StatColumn value={following} label="Following" />
            <View style={styles.divider} />
            <StatColumn value={events}    label="Events" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(16),
        paddingVertical: verticalScale(18),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    col: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: verticalScale(36),
        backgroundColor: '#EBEBEB',
    },
    value: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 2,
    },
    label: {
        fontSize: moderateScale(12),
        color: '#9E9E9E',
        fontWeight: '500',
    },
});

export default ProfileStatBar;
