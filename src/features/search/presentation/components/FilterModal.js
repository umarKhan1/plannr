import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { AppColors } from '../../../../shared/theme/colors';
import { Typography } from '../../../../shared/theme/typography';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { CATEGORIES } from '../../../../core/constants/strings';
import { PrimaryButton } from '../../../../shared/components/PrimaryButton';

const { height } = Dimensions.get('window');

const DATE_OPTIONS = ['Today', 'Tomorrow', 'This Week', 'This Weekend', 'Choose Date'];
const PRICE_OPTIONS = ['Free', '$0-$50', '$50-$100', '$100+'];

export default function FilterModal({ isVisible, onClose, onApply }) {
    const [selectedDate, setSelectedDate] = useState('Today');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const handleReset = () => {
        setSelectedDate('Today');
        setSelectedCategory(null);
        setSelectedPrice(null);
    };

    const handleApply = () => {
        onApply({ selectedDate, selectedCategory, selectedPrice });
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            {/* Drag Indicator */}
                            <View style={styles.dragIndicator} />

                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Filters</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <View style={styles.closeIconWrapper}>
                                        <MaterialIcons name="close" size={20} color="#333" />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                {/* Date Section */}
                                <Text style={styles.sectionTitle}>Time & Date</Text>
                                <View style={styles.chipContainer}>
                                    {DATE_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[styles.chip, selectedDate === option && styles.chipActive]}
                                            onPress={() => setSelectedDate(option)}
                                        >
                                            <Text style={[styles.chipText, selectedDate === option && styles.chipTextActive]}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Category Section */}
                                <Text style={styles.sectionTitle}>Category</Text>
                                <View style={styles.chipContainer}>
                                    {CATEGORIES.map((cat) => (
                                        <TouchableOpacity
                                            key={cat.id}
                                            style={[styles.chip, selectedCategory === cat.id && styles.chipActive]}
                                            onPress={() => setSelectedCategory(cat.id)}
                                        >
                                            <View style={styles.chipContent}>
                                                <MaterialIcons 
                                                  name="check" 
                                                  size={14} 
                                                  color="white" 
                                                  style={selectedCategory === cat.id ? {marginRight: 4} : {display: 'none'}} 
                                                />
                                                <Text style={[styles.chipText, selectedCategory === cat.id && styles.chipTextActive]}>
                                                    {cat.name}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Price Section */}
                                <Text style={styles.sectionTitle}>Price Range</Text>
                                <View style={styles.chipContainer}>
                                    {PRICE_OPTIONS.map((option) => (
                                        <TouchableOpacity
                                            key={option}
                                            style={[styles.chip, selectedPrice === option && styles.chipActive]}
                                            onPress={() => setSelectedPrice(option)}
                                        >
                                            <Text style={[styles.chipText, selectedPrice === option && styles.chipTextActive]}>
                                                {option}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            {/* Bottom Actions */}
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.resetButton} onPress={handleReset} activeOpacity={0.6}>
                                    <View style={styles.resetContent}>
                                        <Feather name="refresh-ccw" size={16} color="#888" style={{marginRight: 6}} />
                                        <Text style={styles.resetText}>RESET</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.applyButtonWrapper}>
                                    <PrimaryButton text="Apply Filters" onPress={handleApply} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        height: height * 0.8,
        padding: moderateScale(24),
    },
    dragIndicator: {
        width: moderateScale(40),
        height: moderateScale(5),
        backgroundColor: '#E0E0E0',
        borderRadius: moderateScale(3),
        alignSelf: 'center',
        marginBottom: verticalScale(15),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    headerTitle: {
        ...Typography.h2,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    closeIconWrapper: {
        backgroundColor: '#F5F5F5',
        padding: moderateScale(8),
        borderRadius: moderateScale(20),
    },
    scrollContent: {
        paddingBottom: verticalScale(120),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1A1A1A',
        marginTop: verticalScale(24),
        marginBottom: verticalScale(16),
        letterSpacing: 0.5,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: moderateScale(18),
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(15),
        backgroundColor: '#F8F8F8',
        marginRight: moderateScale(10),
        marginBottom: verticalScale(10),
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
    },
    chipActive: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
        // Added shadow for active chip
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    chipContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipText: {
        fontSize: moderateScale(14),
        color: '#555',
        fontWeight: '600',
    },
    chipTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        padding: moderateScale(24),
        paddingBottom: verticalScale(Platform.OS === 'ios' ? 40 : 24),
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F2F2F2',
    },
    resetButton: {
        marginRight: moderateScale(24),
    },
    resetContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resetText: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: '#888',
        letterSpacing: 0.8,
    },
    applyButtonWrapper: {
        flex: 1,
    }
});
