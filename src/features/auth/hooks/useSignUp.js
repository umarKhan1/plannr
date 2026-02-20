import { useState } from 'react';
import { useUserStore } from '../../../core/store/useUserStore';
import { isValidEmail } from '../../../core/utils/validation';

export const useSignUp = (navigation) => {
    // Select Global Logic
    const signUp = useUserStore((state) => state.signUp);
    const isLoading = useUserStore((state) => state.isLoading);
    const globalError = useUserStore((state) => state.error);

    // Local Form State
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [validationErrors, setValidationErrors] = useState({});

    const handleSignUp = async () => {
        // 1. Validate Form
        const newErrors = {};

        if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required';

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        setValidationErrors({});

        // 2. Call Global Action
        const success = await signUp(fullName, phoneNumber, email, password);

        // 3. Handle Navigation on Success (Assuming Home is the target)
        if (success) {
            navigation.replace('Home');
        }
    };

    return {
        fullName, setFullName,
        phoneNumber, setPhoneNumber,
        email, setEmail,
        password, setPassword,
        isLoading,
        errors: { ...validationErrors, global: globalError },
        handleSignUp
    };
};
