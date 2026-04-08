import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const CustomCalendarIcon = () => {
    // A beautiful SVG representation inspired by the mockup calendar
    return (
        <Svg width={140} height={140} viewBox="0 0 100 100" fill="none">
            {/* Background shadow card */}
            <Rect x="20" y="24" width="60" height="66" rx="8" fill="#B0B0B0" opacity="0.4" />
            
            {/* Main Calendar Body */}
            <Rect x="16" y="20" width="60" height="66" rx="8" fill="#E8E8E8" />
            
            {/* Top Header */}
            <Path d="M16 28 C16 23.5817 19.5817 20 24 20 L68 20 C72.4183 20 76 23.5817 76 28 L76 34 L16 34 L16 28 Z" fill={AppColors.primary} />
            
            {/* Binder Rings */}
            <Rect x="25" y="16" width="4" height="10" rx="2" fill="#3D405B" />
            <Rect x="44" y="16" width="4" height="10" rx="2" fill="#3D405B" />
            <Rect x="63" y="16" width="4" height="10" rx="2" fill="#3D405B" />
            
            <Circle cx="27" cy="24" r="3" fill="#2A2D40" />
            <Circle cx="46" cy="24" r="3" fill="#2A2D40" />
            <Circle cx="65" cy="24" r="3" fill="#2A2D40" />

            {/* Grid rows (simulating dates) */}
            <Rect x="26" y="44" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="38" y="44" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="50" y="44" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="62" y="44" width="8" height="3" rx="1.5" fill="#6C6C6C" />

            <Rect x="26" y="54" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="38" y="54" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="50" y="54" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="62" y="54" width="8" height="3" rx="1.5" fill="#6C6C6C" />

            <Rect x="26" y="64" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="38" y="64" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="50" y="64" width="8" height="3" rx="1.5" fill="#6C6C6C" />
            <Rect x="62" y="64" width="8" height="3" rx="1.5" fill="#6C6C6C" />

            {/* Base line */}
            <Rect x="0" y="86" width="100" height="2" fill="#3D405B" />
        </Svg>
    );
};

const EmptyTicketState = ({ type }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <CustomCalendarIcon />
            </View>
            <Text style={styles.title}>
                {type === 'UPCOMING' ? 'No Upcoming Event' : 'No Past Event'}
            </Text>
            <Text style={styles.subtitle}>
                {type === 'UPCOMING' 
                    ? "You don't have any upcoming tickets yet. Explore trending events and join the fun!"
                    : "No past events to show. Attend some events to see your history here!"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(40),
        marginTop: verticalScale(40), // Push it slightly up from middle
    },
    iconContainer: {
        marginBottom: verticalScale(20),
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: '#1A1A24', // deep dark blue/black
        marginBottom: verticalScale(12),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: '#7D7D8A',
        textAlign: 'center',
        lineHeight: moderateScale(22),
    }
});

export default EmptyTicketState;
