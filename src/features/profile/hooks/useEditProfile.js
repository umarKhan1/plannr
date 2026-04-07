import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useUserStore } from '../../../core/store/useUserStore';
import { isValidEmail } from '../../../core/utils/validation';

export const useEditProfile = (navigation) => {
    const user      = useUserStore((s) => s.user);
    const isLoading = useUserStore((s) => s.isLoading);

    // ── Local form state (seeded from store; swap with Supabase fetch later) ──
    const [fullName, setFullName]   = useState(user?.name  ?? '');
    const [email,    setEmail]      = useState(user?.email ?? '');
    const [password, setPassword]   = useState('');

    const [errors, setErrors] = useState({});

    // ── Validation ────────────────────────────────────────────────────────────
    const validate = useCallback(() => {
        const newErrors = {};

        if (!fullName.trim())         newErrors.fullName = 'Full name is required';

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (password && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    }, [fullName, email, password]);

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleUpdate = useCallback(async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // TODO: replace with Supabase update call
        await new Promise(resolve => setTimeout(resolve, 1000));

        Alert.alert('Success', 'Profile updated successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    }, [validate, navigation]);

    return {
        // form fields
        fullName, setFullName,
        email,    setEmail,
        password, setPassword,
        // state
        isLoading,
        errors,
        // actions
        handleUpdate,
    };
};
