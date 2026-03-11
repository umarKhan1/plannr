import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import HomeScreen from '../../features/home/presentation/screens/HomeScreen';
import { AppColors } from '../../shared/theme/colors';
import { moderateScale, verticalScale } from '../utils/responsive';

const { width } = Dimensions.get('window');

// Inline Placeholder Screens
const TicketScreen = () => (
    <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Tickets Screen</Text></View>
);
const FavoritesScreen = () => (
    <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Favorites Screen</Text></View>
);
const MessagesScreen = () => (
    <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Messages Screen</Text></View>
);
const ProfileScreen = () => (
    <View style={styles.placeholderContainer}><Text style={styles.placeholderText}>Profile Screen</Text></View>
);

const Tab = createBottomTabNavigator();

const TAB_BAR_WIDTH = width;
const TAB_COUNT = 5;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

// The sliding inner pill dimensions
const INDICATOR_WIDTH = TAB_WIDTH - moderateScale(16); // 8 padding on each side
const INDICATOR_HEIGHT = verticalScale(55);

function LiquidTabBar({ state, navigation }) {
    const activeIndexX = useSharedValue(0);

    useEffect(() => {
        // Center the inner pill horizontally within the tab area
        const centerOffset = (TAB_WIDTH - INDICATOR_WIDTH) / 2;
        activeIndexX.value = withSpring(state.index * TAB_WIDTH + centerOffset, {
            damping: 14,
            stiffness: 120,
        });
    }, [state.index]);

    const animatedIndicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: activeIndexX.value }],
        };
    });

    return (
        <View style={styles.absoluteContainer} pointerEvents="box-none">
            {/* 1. Main Tab Bar Pill */}
            <View style={styles.mainPill} />

            {/* 2. The Sliding Inner Capsule Drop */}
            <Animated.View
                style={[styles.slidingIndicator, animatedIndicatorStyle]}
            />

            {/* 3. The actual icons and touchables floating on top */}
            <View style={styles.iconSpreader} pointerEvents="box-none">
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let iconName;
                    if (route.name === 'HomeTab') iconName = 'home';
                    else if (route.name === 'TicketTab') iconName = 'tag';
                    else if (route.name === 'FavoritesTab') iconName = 'heart';
                    else if (route.name === 'MessagesTab') iconName = 'message-circle';
                    else if (route.name === 'ProfileTab') iconName = 'user';

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            onPress={onPress}
                            activeOpacity={0.8}
                            style={styles.tabButton}
                        >
                            <Feather
                                name={iconName}
                                size={isFocused ? 26 : 24}
                                color={isFocused ? AppColors.primary : '#404040'}
                            />
                            <Text style={[styles.tabLabelText, { color: isFocused ? AppColors.primary : '#404040' }]}>
                                {route.name.replace('Tab', '')}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <LiquidTabBar {...props} />}
        >
            <Tab.Screen name="HomeTab" component={HomeScreen} />
            <Tab.Screen name="TicketTab" component={TicketScreen} />
            <Tab.Screen name="FavoritesTab" component={FavoritesScreen} />
            <Tab.Screen name="MessagesTab" component={MessagesScreen} />
            <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    placeholderText: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: '#333333',
    },
    absoluteContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(75),
        paddingBottom: verticalScale(10), // Give some safe area bottom padding
    },
    mainPill: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#EAEAEA',
        // Optional subtle shadow on top
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 8,
    },
    slidingIndicator: {
        position: 'absolute',
        top: verticalScale(6), // Sit slightly higher from center given bottom padding
        width: INDICATOR_WIDTH,
        height: INDICATOR_HEIGHT,
        borderRadius: moderateScale(22), // Soft pill curve
        backgroundColor: 'transparent', // Removed grey highlight as requested
    },
    iconSpreader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabButton: {
        width: TAB_WIDTH,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    tabLabelText: {
        fontSize: moderateScale(10),
        marginTop: 4,
        fontWeight: '600'
    },
});
