import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    FlatList
} from 'react-native';
import { Feather, Octicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '../../../../shared/theme/colors';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { useSearch } from '../../hooks/useSearch';
import { EventCard } from '../../../events/presentation/components/EventCard';
import FilterModal from '../components/FilterModal';

export default function SearchScreen() {
    const navigation = useNavigation();

    // Connect to our new state management hook
    const { searchQuery, setSearchQuery, searchResults } = useSearch();
    const [showFilterModal, setShowFilterModal] = useState(false);

    const renderEmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIconContainer}>
                <Feather name="search" size={60} color="#E0E0E0" />
            </View>
            <Text style={styles.emptyStateTitle}>Find Your Next Event</Text>
            <Text style={styles.emptyStateSubtitle}>
                Search for festivals, parties, or any activities happening around you.
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                {/* Search Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="arrow-back" size={28} color="#000" />
                    </TouchableOpacity>

                    <View style={styles.searchContainer}>
                        <View style={styles.searchBox}>
                            <Feather name="search" size={20} color="#BFBFBF" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search events..."
                                placeholderTextColor="#BFBFBF"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus={true}
                            />
                        </View>
                        <TouchableOpacity 
                            style={styles.filterButton} 
                            activeOpacity={0.7}
                            onPress={() => setShowFilterModal(true)}
                        >
                            <Octicons name="sliders" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content Area */}
                <View style={styles.contentArea}>
                    {searchQuery.length === 0 ? (
                        renderEmptyState()
                    ) : (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: verticalScale(20) }}
                            renderItem={({ item }) => (
                                <EventCard
                                    event={item}
                                    showHeart={false} // Specific user request: no heart icon here
                                    onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
                                />
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.noResultsContainer}>
                                    <Text style={styles.noResultsText}>No events found for "{searchQuery}"</Text>
                                </View>
                            )}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>

            <FilterModal 
                isVisible={showFilterModal} 
                onClose={() => setShowFilterModal(false)}
                onApply={(filters) => {
                    console.log('Applied filters:', filters);
                    // Search logic can be enhanced here to use these filters
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingTop: Platform.OS === 'android' ? verticalScale(20) : verticalScale(10),
        paddingBottom: verticalScale(15),
    },
    backButton: {
        marginRight: moderateScale(15),
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        borderWidth: 1,
        borderColor: '#EFEFEF',
        height: verticalScale(50),
        paddingHorizontal: moderateScale(15),
    },
    searchIcon: {
        marginRight: moderateScale(10),
    },
    searchInput: {
        flex: 1,
        fontSize: moderateScale(16),
        color: '#333',
    },
    filterButton: {
        width: moderateScale(50),
        height: verticalScale(50),
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        borderWidth: 1,
        borderColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: moderateScale(12),
    },
    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(233, 30, 99, 0.08)',
        paddingVertical: verticalScale(12),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(20),
    },
    currentLocationText: {
        color: AppColors.primary,
        fontSize: moderateScale(16),
        fontWeight: '600',
        marginLeft: moderateScale(8),
    },
    contentArea: {
        flex: 1,
        paddingHorizontal: moderateScale(20),
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: verticalScale(100),
    },
    emptyStateIconContainer: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    emptyStateTitle: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: verticalScale(10),
        textAlign: 'center',
    },
    emptyStateSubtitle: {
        fontSize: moderateScale(15),
        color: '#888',
        textAlign: 'center',
        lineHeight: moderateScale(22),
        paddingHorizontal: moderateScale(20),
    },
    noResultsContainer: {
        paddingTop: verticalScale(40),
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: moderateScale(16),
        color: '#888',
        textAlign: 'center',
    }
});
