import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../features/home/presentation/screens/HomeScreen';
import OnboardingScreen from '../../features/onboarding/presentation/screens/OnboardingScreen';
import LoginScreen from '../../features/auth/presentation/screens/LoginScreen';
import SignUpScreen from '../../features/auth/presentation/screens/SignUpScreen';
import { useUserStore } from '../store/useUserStore';

import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const hasSeenOnboarding = useUserStore((state) => state.hasSeenOnboarding);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={hasSeenOnboarding ? "Login" : "Onboarding"}>
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LocationPicker"
                    component={require('../../features/map/presentation/screens/LocationPickerScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CategorySelection"
                    component={require('../../features/categories/presentation/screens/CategorySelectionScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={require('../../features/search/presentation/screens/SearchScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={require('../../features/events/presentation/screens/EventDetailsScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OrderDetail"
                    component={require('../../features/events/presentation/screens/OrderDetailScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventGoogleMap"
                    component={require('../../features/map/presentation/screens/GoogleMapScreen').default}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TicketDetails"
                    component={require('../../features/tickets/presentation/screens/TicketDetailsScreen').default}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
