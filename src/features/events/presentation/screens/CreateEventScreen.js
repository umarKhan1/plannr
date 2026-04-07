import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { useCreateEvent } from '../../hooks/useCreateEvent';
import CreateEventImagePicker from '../components/create/CreateEventImagePicker';
import CreateEventCategoryPicker from '../components/create/CreateEventCategoryPicker';
import CreateEventPricingToggle from '../components/create/CreateEventPricingToggle';
import CreateEventDateRow from '../components/create/CreateEventDateRow';
import { CustomInput } from '../../../../shared/components/CustomInput';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';
import { FadeInUp } from '../../../../shared/components/AnimatedEntry';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const CreateEventScreen = () => {
    const navigation = useNavigation();
    const {
        title, setTitle,
        description, setDescription,
        coverImageUri,
        category, setCategory,
        location, setLocation,
        setLocationCoords,
        startDate, endDate,
        pricingType, setPricingType,
        amount, setAmount,
        showStartPicker, setShowStartPicker,
        showEndPicker, setShowEndPicker,
        onStartDateChange,
        onEndDateChange,
        formatDate,
        formatTime,
        errors,
        isLoading,
        pickCoverImage,
        handleSubmit,
    } = useCreateEvent(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="chevron-left" size={moderateScale(26)} color="#1A1A2E" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Event</Text>
                    <View style={styles.headerSpacer} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always" // Important for Google Places Autocomplete 
                >
                    <FadeInUp delay={100}>
                        <CreateEventImagePicker
                            uri={coverImageUri}
                            onPress={pickCoverImage}
                            error={errors.coverImage}
                        />
                    </FadeInUp>

                    <FadeInUp delay={200}>
                        <CustomInput
                            label="Event Title"
                            value={title}
                            onChangeText={setTitle}
                            placeholder="e.g. Friday Night Jazz"
                            error={errors.title}
                        />

                        <CustomInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Tell us about your event..."
                            multiline
                            numberOfLines={4}
                            style={styles.textArea}
                            error={errors.description}
                        />
                    </FadeInUp>

                    <View style={{ zIndex: 2000 }}>
                        <FadeInUp delay={300}>
                            <Text style={styles.inputLabel}>Location <Text style={{ color: 'red' }}>*</Text></Text>
                            <GooglePlacesAutocomplete
                                placeholder="Search event location..."
                                fetchDetails={true}
                                onPress={(data, details = null) => {
                                    setLocation(data.description);
                                    if (details?.geometry?.location) {
                                        setLocationCoords({
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        });
                                    }
                                }}
                                query={{
                                    key: GOOGLE_API_KEY,
                                    language: 'en',
                                }}
                                textInputProps={{
                                    placeholderTextColor: '#9E9E9E',
                                    clearButtonMode: 'never',
                                }}
                                styles={googleAutocompleteStyles}
                                enablePoweredByContainer={false}
                            />
                            {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
                        </FadeInUp>
                    </View>

                    <FadeInUp delay={400}>
                        <CreateEventCategoryPicker
                            selected={category}
                            onSelect={setCategory}
                            error={errors.category}
                        />
                    </FadeInUp>

                    <FadeInUp delay={500}>
                        <CreateEventDateRow
                            startDate={startDate}
                            endDate={endDate}
                            showStartPicker={showStartPicker}
                            showEndPicker={showEndPicker}
                            onStartPress={() => setShowStartPicker(true)}
                            onEndPress={() => setShowEndPicker(true)}
                            onStartDateChange={onStartDateChange}
                            onEndDateChange={onEndDateChange}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            setShowStartPicker={setShowStartPicker}
                            setShowEndPicker={setShowEndPicker}
                            error={errors.endDate}
                        />
                    </FadeInUp>

                    <FadeInUp delay={600}>
                        <CreateEventPricingToggle
                            value={pricingType}
                            onChange={setPricingType}
                        />

                        {pricingType === 'paid' && (
                            <FadeInUp duration={300}>
                                <CustomInput
                                    label="Ticket Price (USD)"
                                    value={amount}
                                    onChangeText={setAmount}
                                    placeholder="0.00"
                                    keyboardType="decimal-pad"
                                    error={errors.amount}
                                />
                            </FadeInUp>
                        )}
                    </FadeInUp>

                    <FadeInUp delay={700}>
                        <PrimaryButton
                            text="Create Event"
                            onPress={handleSubmit}
                            isLoading={isLoading}
                            style={styles.submitBtn}
                        />
                    </FadeInUp>

                    <View style={{ height: verticalScale(40) }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const googleAutocompleteStyles = {
    container: {
        flex: 0,
        marginBottom: verticalScale(15),
    },
    textInput: {
        height: verticalScale(50),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        backgroundColor: '#fff',
        fontSize: moderateScale(16),
        color: '#000',
    },
    listView: {
        backgroundColor: '#FFF',
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: '#EEE',
        marginTop: verticalScale(5),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        scrollEnabled: false, // Prevents VirtualizedList warning inside ScrollView
    },
    row: {
        padding: moderateScale(15),
        height: verticalScale(50),
        flexDirection: 'row',
    },
    separator: {
        height: 1,
        backgroundColor: '#F5F5F5',
    },
    description: {
        fontSize: moderateScale(14),
        color: '#333',
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(16),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backBtn: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(12),
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1A1A2E',
    },
    headerSpacer: {
        width: moderateScale(38),
    },
    scrollContent: {
        paddingHorizontal: moderateScale(24),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(20),
    },
    inputLabel: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#333',
        marginBottom: verticalScale(6),
    },
    textArea: {
        height: verticalScale(100),
        textAlignVertical: 'top',
        paddingTop: verticalScale(12),
    },
    submitBtn: {
        marginTop: verticalScale(10),
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(-10),
        marginBottom: verticalScale(15),
        marginLeft: moderateScale(4),
    },
});

export default CreateEventScreen;
