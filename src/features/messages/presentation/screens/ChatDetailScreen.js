import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, FlatList,
    TextInput, TouchableOpacity, KeyboardAvoidingView,
    Platform, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '../../../../core/store/useUserStore';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const SCREEN_BG = '#F5F5F5';

// Seeded mock messages per conversation type
const MOCK_SEED_MESSAGES = {
    event: [
        { id: 's1', text: 'Hey everyone! Super excited for this event 🎉', senderId: 'user_1', senderName: 'Sarah M.', senderAvatar: 'https://i.pravatar.cc/150?img=47', timestamp: '21:00', isMine: false, type: 'text' },
        { id: 's2', text: 'Same! Anyone know what time doors open?', senderId: 'user_2', senderName: 'James O.', senderAvatar: 'https://i.pravatar.cc/150?img=12', timestamp: '21:02', isMine: false, type: 'text' },
        { id: 's3', text: 'Doors open at 7pm. I got that from the organiser', senderId: 'me', senderName: 'Omar', senderAvatar: 'https://i.pravatar.cc/150?img=32', timestamp: '21:05', isMine: true, type: 'text' },
        { id: 's4', text: 'Thanks Omar! 🙏 See you all there!', senderId: 'user_3', senderName: 'Aisha R.', senderAvatar: 'https://i.pravatar.cc/150?img=31', timestamp: '21:06', isMine: false, type: 'text' },
    ],
    individual: [
        { id: 's1', text: 'Hey! How are you doing?', senderId: 'them', senderName: '', senderAvatar: '', timestamp: '20:00', isMine: false, type: 'text' },
        { id: 's2', text: "I'm great thanks! You?", senderId: 'me', senderName: 'Omar', senderAvatar: 'https://i.pravatar.cc/150?img=32', timestamp: '20:01', isMine: true, type: 'text' },
        { id: 's3', text: 'All good! Are you going to the event?', senderId: 'them', senderName: '', senderAvatar: '', timestamp: '20:02', isMine: false, type: 'text' },
    ],
};

const MessageBubble = ({ message, conversation, showAvatar }) => {
    const isImage = message.type === 'image';

    if (message.isMine) {
        return (
            <View style={styles.bubbleRowRight}>
                {isImage ? (
                    <View style={styles.myImageWrapper}>
                        <Image source={{ uri: message.imageUri }} style={styles.messageImage} contentFit="cover" />
                        <Text style={styles.imageBubbleTime}>{message.timestamp}</Text>
                    </View>
                ) : (
                    <View style={[styles.bubble, styles.myBubble]}>
                        <Text style={styles.myBubbleText}>{message.text}</Text>
                        <Text style={[styles.bubbleTime, { color: 'rgba(255,255,255,0.65)' }]}>{message.timestamp}</Text>
                    </View>
                )}
            </View>
        );
    }

    const isEvent = conversation?.type === 'event';

    return (
        <View style={styles.bubbleRowLeft}>
            {showAvatar ? (
                <Image
                    source={{ uri: message.senderAvatar || conversation?.avatar }}
                    style={styles.senderAvatar}
                    contentFit="cover"
                />
            ) : (
                <View style={styles.avatarSpacer} />
            )}
            <View style={styles.bubbleGroup}>
                {isEvent && showAvatar && (
                    <Text style={styles.senderName}>{message.senderName}</Text>
                )}
                {isImage ? (
                    <View style={styles.theirImageWrapper}>
                        <Image source={{ uri: message.imageUri }} style={styles.messageImage} contentFit="cover" />
                        <Text style={[styles.imageBubbleTime, { color: '#AAA' }]}>{message.timestamp}</Text>
                    </View>
                ) : (
                    <View style={[styles.bubble, styles.theirBubble]}>
                        <Text style={styles.theirBubbleText}>{message.text}</Text>
                        <Text style={[styles.bubbleTime, { color: '#BBBBBB' }]}>{message.timestamp}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const ChatDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { conversation } = route.params || {};

    const rawMessages = useUserStore(state => state.chatMessages[conversation?.id]);
    const messages = rawMessages ?? [];
    const sendMessage = useUserStore(state => state.sendMessage);
    const initConversationMessages = useUserStore(state => state.initConversationMessages);

    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        if (!conversation) return;
        const seedKey = conversation.type === 'event' ? 'event' : 'individual';
        const seeded = MOCK_SEED_MESSAGES[seedKey].map(m => ({
            ...m,
            senderName: m.senderName || conversation.name,
            senderAvatar: m.senderAvatar || conversation.avatar,
        }));
        initConversationMessages(conversation.id, seeded);
    }, [conversation?.id]);

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 50);
        }
    }, [messages.length]);

    const handleSend = useCallback(() => {
        const text = inputText.trim();
        if (!text) return;
        sendMessage(conversation.id, text);
        setInputText('');
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, [inputText, conversation?.id]);

    const handlePickImage = useCallback(async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Please allow access to your photo library to send images.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: false,
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.length > 0) {
                const imageUri = result.assets[0].uri;
                const newMsg = {
                    id: `msg_img_${Date.now()}`,
                    type: 'image',
                    imageUri,
                    text: '',
                    senderId: 'me',
                    senderName: 'Omar',
                    senderAvatar: 'https://i.pravatar.cc/150?img=32',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMine: true,
                };
                useUserStore.setState(state => ({
                    chatMessages: {
                        ...state.chatMessages,
                        [conversation.id]: [...(state.chatMessages[conversation.id] || []), newMsg],
                    },
                    conversations: state.conversations.map(c =>
                        c.id === conversation.id
                            ? { ...c, lastMessage: '📷 Photo', lastMessageTime: 'now' }
                            : c
                    ),
                }));
                setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
            }
        } catch (err) {
            Alert.alert(
                'Not available',
                'Image sharing requires a development build. Run `npx expo run:ios` to enable this feature.',
                [{ text: 'OK' }]
            );
        }
    }, [conversation?.id]);

    if (!conversation) {
        return <SafeAreaView style={styles.container} />;
    }

    const renderItem = ({ item, index }) => {
        const prev = messages[index - 1];
        const showAvatar = !item.isMine && (!prev || prev.senderId !== item.senderId);
        return <MessageBubble message={item} conversation={conversation} showAvatar={showAvatar} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header — matches background, no card */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Feather name="arrow-left" size={24} color="#111" />
                </TouchableOpacity>
                <Image
                    source={{ uri: conversation.avatar }}
                    style={styles.headerAvatar}
                    contentFit="cover"
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.headerName} numberOfLines={1}>{conversation.name}</Text>
                    <Text style={styles.headerSub}>
                        {conversation.type === 'event'
                            ? `${conversation.participants} members`
                            : 'Online'}
                    </Text>
                </View>
                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Feather name="more-vertical" size={22} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Messages List */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.messagesList}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            />

            {/* Input Bar — attached to bottom */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={styles.inputBar}>
                    {/* Image picker button */}
                    <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
                        <Feather name="image" size={22} color="#888" />
                    </TouchableOpacity>

                    {/* Text Input */}
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        placeholderTextColor="#AAAAAA"
                        multiline
                        maxLength={500}
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                    />

                    {/* Send button */}
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Feather name="send" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SCREEN_BG,
    },
    // No white card — matches SCREEN_BG
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: SCREEN_BG,
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(12),
        gap: moderateScale(12),
    },
    headerAvatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: '#E0E0E0',
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#111',
    },
    headerSub: {
        fontSize: moderateScale(12),
        color: '#888',
        marginTop: 1,
    },
    messagesList: {
        paddingHorizontal: moderateScale(12),
        paddingTop: verticalScale(8),
        paddingBottom: verticalScale(8),
    },
    bubbleRowRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: verticalScale(6),
    },
    bubbleRowLeft: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: verticalScale(6),
    },
    senderAvatar: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(15),
        marginRight: moderateScale(8),
        backgroundColor: '#E0E0E0',
    },
    avatarSpacer: {
        width: moderateScale(38),
    },
    bubbleGroup: {
        maxWidth: '75%',
    },
    senderName: {
        fontSize: moderateScale(11),
        color: '#888',
        marginBottom: verticalScale(2),
        marginLeft: moderateScale(4),
        fontWeight: '600',
    },
    bubble: {
        borderRadius: moderateScale(18),
        paddingHorizontal: moderateScale(14),
        paddingVertical: verticalScale(8),
    },
    myBubble: {
        backgroundColor: AppColors.primary,
        borderBottomRightRadius: moderateScale(4),
        maxWidth: '75%',
    },
    theirBubble: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: moderateScale(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    myBubbleText: {
        fontSize: moderateScale(14),
        color: '#FFF',
        lineHeight: moderateScale(20),
    },
    theirBubbleText: {
        fontSize: moderateScale(14),
        color: '#111',
        lineHeight: moderateScale(20),
    },
    bubbleTime: {
        fontSize: moderateScale(10),
        textAlign: 'right',
        marginTop: verticalScale(2),
    },
    // Image messages
    myImageWrapper: {
        maxWidth: '72%',
        borderRadius: moderateScale(16),
        borderBottomRightRadius: moderateScale(4),
        overflow: 'hidden',
    },
    theirImageWrapper: {
        maxWidth: '72%',
        borderRadius: moderateScale(16),
        borderBottomLeftRadius: moderateScale(4),
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    messageImage: {
        width: moderateScale(200),
        height: moderateScale(160),
    },
    imageBubbleTime: {
        fontSize: moderateScale(10),
        textAlign: 'right',
        paddingHorizontal: moderateScale(8),
        paddingBottom: verticalScale(4),
        paddingTop: verticalScale(2),
        color: 'rgba(255,255,255,0.8)',
        backgroundColor: 'transparent',
    },
    // Input Bar
    inputBar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(10),
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        gap: moderateScale(8),
    },
    iconButton: {
        width: moderateScale(38),
        height: moderateScale(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(19),
        backgroundColor: '#F4F4F8',
        marginBottom: verticalScale(1),
    },
    input: {
        flex: 1,
        backgroundColor: '#F4F4F8',
        borderRadius: moderateScale(20),
        paddingHorizontal: moderateScale(16),
        paddingVertical: verticalScale(9),
        fontSize: moderateScale(14),
        color: '#111',
        maxHeight: verticalScale(100),
    },
    sendButton: {
        width: moderateScale(38),
        height: moderateScale(38),
        borderRadius: moderateScale(19),
        backgroundColor: AppColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(1),
    },
    sendButtonDisabled: {
        backgroundColor: '#D0D0D0',
    },
});

export default ChatDetailScreen;
