import { useState } from 'react';
import * as Location from 'expo-location';
import { useUserStore } from '../../../core/store/useUserStore';
import { isValidEmail } from '../../../core/utils/validation';

export const useLogin = (navigation) => {
    // Select Global Logic
    const login = useUserStore((state) => state.login);
    const isLoading = useUserStore((state) => state.isLoading);
    const globalError = useUserStore((state) => state.error);
    const setUserLocation = useUserStore((state) => state.setUserLocation);

    // Local Form State (Transient)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleLogin = async () => {
        // 1. Validate Local Form
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});

        // 2. Call Global Action
        const success = await login(email, password);

        // 3. Handle Navigation on Success
        if (success) {
            // Fetch and set user location automatically
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    let currentLocation = await Location.getCurrentPositionAsync({});
                    setUserLocation({
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    });
                }
            } catch (error) {
                console.log("Could not fetch location during login", error);
            }

            navigation.replace('Home');
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google Login");
    };

    const handleAppleLogin = () => {
        console.log("Apple Login");
    };

    return {
        email, setEmail,
        password, setPassword,
        rememberMe, setRememberMe,
        isLoading,
        errors: { ...validationErrors, global: globalError },
        handleLogin,
        handleGoogleLogin,
        handleAppleLogin
    };
};
