import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const TicketToggle = ({ activeTab, setActiveTab }) => {
    // Determine slider position based on activeTab
    // UPCOMING = 0, PAST EVENTS = 1
    const slideAnim = React.useRef(new Animated.Value(activeTab === 'UPCOMING' ? 0 : 1)).current;

    React.useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: activeTab === 'UPCOMING' ? 0 : 1,
            useNativeDriver: false,
            bounciness: 4,
            speed: 12
        }).start();
    }, [activeTab]);

    const activeLeft = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['2%', '51%']
    });

    return (
        <View style={styles.container}>
            <View style={styles.toggleBackground}>
                {/* Animated active pill */}
                <Animated.View style={[styles.activePill, { left: activeLeft }]} />

                <TouchableOpacity 
                    style={styles.tabButton} 
                    onPress={() => setActiveTab('UPCOMING')}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.tabText, 
                        activeTab === 'UPCOMING' ? styles.activeText : styles.inactiveText
                    ]}>
                        UPCOMING
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.tabButton} 
                    onPress={() => setActiveTab('PAST')}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.tabText, 
                        activeTab === 'PAST' ? styles.activeText : styles.inactiveText
                    ]}>
                        PAST EVENTS
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: verticalScale(16),
        paddingHorizontal: moderateScale(20),
    },
    toggleBackground: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: moderateScale(24),
        width: '100%',
        height: verticalScale(48),
        alignItems: 'center',
        position: 'relative',
        padding: moderateScale(2),
    },
    activePill: {
        position: 'absolute',
        width: '47%',
        height: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(20),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        zIndex: 1, // Stay on top of animated pill
    },
    tabText: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    activeText: {
        color: AppColors.primary,
    },
    inactiveText: {
        color: '#9E9E9E',
    }
});

export default TicketToggle;
