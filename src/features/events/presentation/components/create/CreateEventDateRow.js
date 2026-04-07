import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import { AppColors } from '../../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const DateRow = ({ label, date, onPress, formatDate, formatTime }) => (
    <TouchableOpacity style={styles.dateRow} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.dateIconBadge}>
            <Feather name="calendar" size={moderateScale(16)} color={AppColors.primary} />
        </View>
        <View style={styles.dateTextBlock}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatDate(date)}</Text>
        </View>
        <View style={styles.timeBlock}>
            <Feather name="clock" size={moderateScale(14)} color="#999" />
            <Text style={styles.timeValue}>{formatTime(date)}</Text>
        </View>
        <Feather name="chevron-right" size={moderateScale(16)} color="#BDBDBD" />
    </TouchableOpacity>
);

const CreateEventDateRow = ({
    startDate,
    endDate,
    showStartPicker,
    showEndPicker,
    onStartPress,
    onEndPress,
    onStartDateChange,
    onEndDateChange,
    formatDate,
    formatTime,
    setShowStartPicker,
    setShowEndPicker,
    error,
}) => {
    
    // Helper to render picker with modal on iOS for visibility
    const renderPicker = (value, onChange, onClose, visible) => {
        if (!visible) return null;

        const picker = (
            <DateTimePicker
                value={value}
                mode="datetime"
                display="spinner" // User preferred spinner
                onChange={onChange}
                minimumDate={new Date()}
                textColor="#000" // Ensure visibility on light mode
                style={{ height: verticalScale(216), width: '100%', backgroundColor: '#FFFFFF' }}
            />
        );

        if (Platform.OS === 'ios') {
            return (
                <Modal
                    transparent
                    animationType="slide"
                    visible={visible}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={onClose}>
                                    <Text style={styles.doneText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pickerContainer}>
                                {picker}
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }

        return picker;
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>
                Date &amp; Time <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <View style={styles.card}>
                <DateRow
                    label="Start"
                    date={startDate}
                    onPress={onStartPress}
                    formatDate={formatDate}
                    formatTime={formatTime}
                />
                <View style={styles.divider} />
                <DateRow
                    label="End"
                    date={endDate}
                    onPress={onEndPress}
                    formatDate={formatDate}
                    formatTime={formatTime}
                />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {renderPicker(startDate, onStartDateChange, () => setShowStartPicker(false), showStartPicker)}
            {renderPicker(endDate, onEndDateChange, () => setShowEndPicker(false), showEndPicker)}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: verticalScale(15),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#333',
        marginBottom: verticalScale(8),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: moderateScale(15),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(13),
    },
    dateIconBadge: {
        width: moderateScale(34),
        height: moderateScale(34),
        borderRadius: moderateScale(10),
        backgroundColor: `${AppColors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(12),
    },
    dateTextBlock: {
        flex: 1,
    },
    dateLabel: {
        fontSize: moderateScale(11),
        color: '#9E9E9E',
        fontWeight: '500',
        marginBottom: 2,
    },
    dateValue: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: '#1A1A2E',
    },
    timeBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: moderateScale(10),
        gap: 4,
    },
    timeValue: {
        fontSize: moderateScale(13),
        color: '#666',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginLeft: moderateScale(60),
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginTop: verticalScale(4),
    },
    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingBottom: verticalScale(20),
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: moderateScale(15),
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    doneText: {
        color: AppColors.primary,
        fontWeight: 'bold',
        fontSize: moderateScale(16),
    },
    pickerContainer: {
        height: verticalScale(216),
        backgroundColor: '#FFFFFF',
    },
});

export default CreateEventDateRow;
