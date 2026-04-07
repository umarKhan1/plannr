import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useCreateEvent = (navigation) => {

    // ── Form Fields ─────────────────────────────────────────────────────────
    const [title,          setTitle]          = useState('');
    const [description,    setDescription]    = useState('');
    const [coverImageUri,  setCoverImageUri]  = useState(null);
    const [category,       setCategory]       = useState(null);   // category id
    const [location,       setLocation]       = useState('');
    const [locationCoords, setLocationCoords] = useState(null); // { latitude, longitude }
    const [startDate,      setStartDate]      = useState(new Date());
    const [endDate,        setEndDate]        = useState(new Date());
    const [pricingType,    setPricingType]    = useState('free'); // 'free' | 'paid'
    const [amount,         setAmount]         = useState('');

    // ── Date Picker visibility ──────────────────────────────────────────────
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker,   setShowEndPicker]   = useState(false);

    // ── State ───────────────────────────────────────────────────────────────
    const [errors,    setErrors]    = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // ── Image Picker ────────────────────────────────────────────────────────
    const pickCoverImage = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please allow photo library access in Settings.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.85,
        });
        if (!result.canceled && result.assets?.[0]?.uri) {
            setCoverImageUri(result.assets[0].uri);
        }
    }, []);

    // ── Date Picker handlers ────────────────────────────────────────────────
    const onStartDateChange = useCallback((event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowStartPicker(false);
        }
        if (selectedDate) setStartDate(selectedDate);
    }, []);

    const onEndDateChange = useCallback((event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowEndPicker(false);
        }
        if (selectedDate) setEndDate(selectedDate);
    }, []);

    // ── Helpers ─────────────────────────────────────────────────────────────
    const formatDate = (date) =>
        date.toLocaleDateString('en-US', {
            weekday: 'short',
            month:   'short',
            day:     'numeric',
            year:    'numeric',
        });

    const formatTime = (date) =>
        date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const formatDateRange = () =>
        `${formatDate(startDate)}, ${formatTime(startDate)} – ${formatDate(endDate)}, ${formatTime(endDate)}`;

    // ── Validation ───────────────────────────────────────────────────────────
    const validate = useCallback(() => {
        const newErrors = {};
        if (!coverImageUri)          newErrors.coverImage   = 'Please add a cover image';
        if (!title.trim())           newErrors.title        = 'Event title is required';
        if (!description.trim())     newErrors.description  = 'Description is required';
        if (!category)               newErrors.category     = 'Please select a category';
        if (!location.trim() || !locationCoords) newErrors.location = 'Please select a valid location';
        if (endDate <= startDate)    newErrors.endDate      = 'End date must be after start date';
        if (pricingType === 'paid') {
            if (!amount.trim())      newErrors.amount       = 'Please enter the ticket price';
            else if (isNaN(parseFloat(amount))) newErrors.amount = 'Enter a valid number';
        }
        return newErrors;
    }, [coverImageUri, title, description, category, location, startDate, endDate, pricingType, amount]);

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = useCallback(async () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);

        try {
            // TODO: Replace with Supabase insert
            await new Promise(resolve => setTimeout(resolve, 1200));

            const priceLabel = pricingType === 'free' ? 'Free' : `$${parseFloat(amount).toFixed(2)}`;

            console.log("Submitting Event with Coordinates:", {
                title,
                location,
                locationCoords,
                priceLabel,
            });

            Alert.alert('Event Created! 🎉', `"${title}" has been created successfully.`, [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (e) {
            Alert.alert('Error', 'Failed to create event. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [validate, pricingType, amount, title, navigation]);

    return {
        // fields
        title,          setTitle,
        description,    setDescription,
        coverImageUri,
        category,       setCategory,
        location,       setLocation,
        locationCoords, setLocationCoords,
        startDate,      endDate,
        pricingType,    setPricingType,
        amount,         setAmount,
        // date picker
        showStartPicker, setShowStartPicker,
        showEndPicker,   setShowEndPicker,
        onStartDateChange,
        onEndDateChange,
        // helpers
        formatDate,
        formatTime,
        formatDateRange,
        // state
        errors,
        isLoading,
        // actions
        pickCoverImage,
        handleSubmit,
    };
};
