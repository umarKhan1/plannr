import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const ConversationRow = ({ conversation, onPress }) => {
    const isEvent = conversation.type === 'event';
    const hasUnread = conversation.unreadCount > 0;

    return (
        <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.75}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: conversation.avatar }}
                    style={styles.avatar}
                    contentFit="cover"
                />
                {/* Group chat badge */}
                {isEvent && (
                    <View style={styles.eventBadge}>
                        <Feather name="users" size={9} color="#fff" />
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={[styles.name, hasUnread && styles.nameBold]} numberOfLines={1}>
                        {conversation.name}
                    </Text>
                    <Text style={[styles.time, hasUnread && styles.timeUnread]}>
                        {conversation.lastMessageTime}
                    </Text>
                </View>

                <View style={styles.bottomRow}>
                    <Text
                        style={[styles.preview, hasUnread && styles.previewBold]}
                        numberOfLines={1}
                    >
                        {conversation.lastMessage}
                    </Text>
                    {hasUnread ? (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                            </Text>
                        </View>
                    ) : null}
                </View>

                {isEvent && (
                    <Text style={styles.participantText}>
                        {conversation.participants} members
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(12),
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        backgroundColor: '#FFFFFF',
    },
    avatarWrapper: {
        position: 'relative',
        marginRight: moderateScale(14),
    },
    avatar: {
        width: moderateScale(52),
        height: moderateScale(52),
        borderRadius: moderateScale(26),
        backgroundColor: '#E0E0E0',
    },
    eventBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: AppColors.primary,
        borderRadius: moderateScale(9),
        width: moderateScale(18),
        height: moderateScale(18),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    content: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(3),
    },
    name: {
        fontSize: moderateScale(15),
        fontWeight: '500',
        color: '#111',
        flex: 1,
        marginRight: moderateScale(8),
    },
    nameBold: {
        fontWeight: '700',
    },
    time: {
        fontSize: moderateScale(12),
        color: '#AAAAAA',
    },
    timeUnread: {
        color: AppColors.primary,
        fontWeight: '600',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    preview: {
        fontSize: moderateScale(13),
        color: '#888',
        flex: 1,
        marginRight: moderateScale(8),
    },
    previewBold: {
        color: '#444',
        fontWeight: '600',
    },
    badge: {
        backgroundColor: AppColors.primary,
        borderRadius: moderateScale(10),
        minWidth: moderateScale(20),
        height: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(4),
    },
    badgeText: {
        fontSize: moderateScale(11),
        color: '#fff',
        fontWeight: '700',
    },
    participantText: {
        fontSize: moderateScale(11),
        color: '#BBBBBB',
        marginTop: verticalScale(2),
    },
});

export default ConversationRow;
