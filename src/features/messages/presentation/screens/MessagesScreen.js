import React from 'react';
import {
    SafeAreaView, StyleSheet, FlatList, View,
    Text, TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMessagesList } from '../../hooks/useMessagesList';
import MessageTabToggle from '../components/MessageTabToggle';
import MessageSearchBar from '../components/MessageSearchBar';
import ConversationRow from '../components/ConversationRow';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const MessagesScreen = () => {
    const navigation = useNavigation();
    const {
        conversations,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        totalUnread,
    } = useMessagesList();

    const renderItem = ({ item }) => (
        <ConversationRow
            conversation={item}
            onPress={() => navigation.navigate('ChatDetail', { conversation: item })}
        />
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Feather name="message-circle" size={52} color="#E0E0E0" />
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySubtitle}>
                Join events or connect with people to start chatting!
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Messages</Text>
                    {totalUnread > 0 && (
                        <Text style={styles.headerSubtitle}>
                            {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    style={styles.composeButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Feather name="edit" size={22} color="#111" />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <MessageSearchBar value={searchQuery} onChangeText={setSearchQuery} />

            {/* Tab Toggle */}
            <MessageTabToggle activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Conversation List */}
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={conversations.length === 0 && styles.emptyList}
            />
        </SafeAreaView>
    );
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
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(16),
    },
    headerTitle: {
        fontSize: moderateScale(26),
        fontWeight: '800',
        color: '#111',
    },
    headerSubtitle: {
        fontSize: moderateScale(13),
        color: AppColors.primary,
        fontWeight: '500',
        marginTop: verticalScale(2),
    },
    composeButton: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#F4F4F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyList: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(40),
        paddingTop: verticalScale(60),
    },
    emptyTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#333',
        marginTop: verticalScale(16),
        marginBottom: verticalScale(8),
    },
    emptySubtitle: {
        fontSize: moderateScale(14),
        color: '#999',
        textAlign: 'center',
        lineHeight: moderateScale(21),
    },
});

export default MessagesScreen;
