import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';
import { MESSAGE_TABS } from '../../hooks/useMessagesList';

const TABS = [
    { key: MESSAGE_TABS.ALL, label: 'All' },
    { key: MESSAGE_TABS.EVENTS, label: 'Events' },
    { key: MESSAGE_TABS.DIRECT, label: 'Direct' },
];

const MessageTabToggle = ({ activeTab, onTabChange }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const containerWidth = useRef(0);

    const activeIndex = TABS.findIndex(t => t.key === activeTab);

    useEffect(() => {
        const tabWidth = containerWidth.current / TABS.length;
        Animated.spring(translateX, {
            toValue: activeIndex * tabWidth,
            useNativeDriver: true,
            damping: 15,
            stiffness: 150,
        }).start();
    }, [activeTab]);

    return (
        <View
            style={styles.container}
            onLayout={e => { containerWidth.current = e.nativeEvent.layout.width; }}
        >
            {/* Sliding pill */}
            <Animated.View
                style={[
                    styles.pill,
                    { width: `${100 / TABS.length}%`, transform: [{ translateX }] }
                ]}
            />

            {TABS.map(tab => {
                const isActive = tab.key === activeTab;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => onTabChange(tab.key)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F5',
        borderRadius: moderateScale(12),
        padding: moderateScale(4),
        marginHorizontal: moderateScale(20),
        marginBottom: verticalScale(16),
        position: 'relative',
        overflow: 'hidden',
    },
    pill: {
        position: 'absolute',
        top: moderateScale(4),
        bottom: moderateScale(4),
        left: moderateScale(4),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: verticalScale(8),
        alignItems: 'center',
        zIndex: 1,
    },
    tabText: {
        fontSize: moderateScale(13),
        fontWeight: '600',
        color: '#888',
    },
    tabTextActive: {
        color: '#111',
        fontWeight: '700',
    },
});

export default MessageTabToggle;
