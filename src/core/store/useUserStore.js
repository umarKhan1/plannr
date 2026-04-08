import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../auth/AuthService';
import { ProfileService } from '../profile/ProfileService';

// Mock Conversations seeded for development — replace fetch with Supabase later
const MOCK_CONVERSATIONS = [
    // --- Event Group Chats ---
    {
        id: 'conv_event_1',
        type: 'event',
        eventId: '2',
        name: 'Friday Night Dance Party',
        avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=100&auto=format&fit=crop',
        lastMessage: 'Anyone grabbing drinks before? 🍻',
        lastMessageTime: '2m',
        unreadCount: 4,
        participants: 38,
    },
    {
        id: 'conv_event_2',
        type: 'event',
        eventId: '1',
        name: 'Going to a Rock Concert',
        avatar: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=100&auto=format&fit=crop',
        lastMessage: 'This is gonna be INSANE! 🎸',
        lastMessageTime: '1h',
        unreadCount: 12,
        participants: 95,
    },
    {
        id: 'conv_event_3',
        type: 'event',
        eventId: '3',
        name: 'Tech Innovators Summit',
        avatar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=100&auto=format&fit=crop',
        lastMessage: 'The keynote schedule is out!',
        lastMessageTime: '3h',
        unreadCount: 0,
        participants: 214,
    },
    {
        id: 'conv_event_4',
        type: 'event',
        eventId: '4',
        name: 'Global Music Awards',
        avatar: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=100&auto=format&fit=crop',
        lastMessage: 'Who are you rooting for tonight?',
        lastMessageTime: '1d',
        unreadCount: 2,
        participants: 512,
    },
    // --- Individual DMs ---
    {
        id: 'conv_dm_1',
        type: 'individual',
        eventId: null,
        name: 'Sarah Mitchell',
        avatar: 'https://i.pravatar.cc/150?img=47',
        lastMessage: 'Hey! Are you going to the dance party?',
        lastMessageTime: '5m',
        unreadCount: 1,
        participants: 2,
    },
    {
        id: 'conv_dm_2',
        type: 'individual',
        eventId: null,
        name: 'James Okonkwo',
        avatar: 'https://i.pravatar.cc/150?img=12',
        lastMessage: 'Saved you a spot 👌',
        lastMessageTime: '45m',
        unreadCount: 0,
        participants: 2,
    },
    {
        id: 'conv_dm_3',
        type: 'individual',
        eventId: null,
        name: 'Aisha Rahman',
        avatar: 'https://i.pravatar.cc/150?img=31',
        lastMessage: 'See you there! 😊',
        lastMessageTime: '2d',
        unreadCount: 0,
        participants: 2,
    },
];


// detailed comment: definition of the store helper function
// This is your "Global State Container" (like a Cubit/Bloc provided globally)
export const useUserStore = create(
    persist(
        (set, get) => ({
            // State variables (like state fields in a Cubit)
            user: null, // null means not logged in
            isAuthenticated: false,
            hasSeenOnboarding: false,
            currentSlideIndex: 0,
            userLocation: null, // Global location storage
            userCategories: [], // Global categories storage
            joinedEvents: [],   // Array of { eventId, locationData }
            conversations: MOCK_CONVERSATIONS, // Swap with Supabase fetch later
            chatMessages: {}, // { [conversationId]: [ {id, text, senderId, senderName, senderAvatar, timestamp} ] }

            // Auth UI State (Global)
            isLoading: false,
            error: null,

            // Actions
            initializeAuth: () => {
                AuthService.getSession().then((session) => {
                    if (session) {
                        set({ user: session.user, isAuthenticated: true });
                    }
                }).catch(err => console.error("Initial session fetch failed", err));

                AuthService.onAuthStateChange((_event, session) => {
                    if (session) {
                        set({ user: session.user, isAuthenticated: true });
                    } else {
                        set({ user: null, isAuthenticated: false });
                    }
                });
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const data = await AuthService.signIn(email, password);
                    set({ user: data.user, isAuthenticated: true, isLoading: false });
                    return true;
                } catch (e) {
                    set({ error: e.message, isLoading: false });
                    return false;
                }
            },

            signUp: async (fullName, phoneNumber, email, password) => {
                set({ isLoading: true, error: null });

                try {
                    const data = await AuthService.signUp(email, password, fullName, phoneNumber);
                    set({ user: data.user, isAuthenticated: !!data.user, isLoading: false });
                    return true;
                } catch (e) {
                    set({ error: e.message, isLoading: false });
                    return false;
                }
            },

            logout: async () => {
                await AuthService.signOut();
                set({ user: null, isAuthenticated: false });
            },
            completeOnboarding: () => set({ hasSeenOnboarding: true }),
            setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

            // Updated sync actions to persist data to Supabase
            setUserLocation: (location) => set({ userLocation: location }),

            syncUserLocation: async (location) => {
                set({ userLocation: location });
                const user = get().user;
                if (user) {
                    try {
                        await ProfileService.updateProfile(user.id, {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            address: location.address || null,
                        });
                    } catch (err) {
                        console.error("Failed to sync location with database", err);
                    }
                }
            },

            setUserCategories: (categories) => set({ userCategories: categories }),

            syncUserCategories: async (categories) => {
                set({ userCategories: categories });
                const user = get().user;
                if (user) {
                    try {
                        await ProfileService.updateProfile(user.id, {
                            interests: categories,
                        });
                    } catch (err) {
                        console.error("Failed to sync categories with database", err);
                    }
                }
            },

            // Event Management
            joinEvent: (eventId, locationData) => set((state) => {
                // Prevent duplicate joins
                if (state.joinedEvents.some(e => e.eventId === eventId)) {
                    return state;
                }
                return {
                    joinedEvents: [...state.joinedEvents, { eventId, locationData }]
                };
            }),
            hasJoinedEvent: (eventId) => {
                return get().joinedEvents.some(e => e.eventId === eventId);
            },

            // Favorites Management
            favoriteEvents: [],
            toggleFavorite: (eventId) => set((state) => {
                const isFavorite = state.favoriteEvents.includes(eventId);
                if (isFavorite) {
                    return { favoriteEvents: state.favoriteEvents.filter(id => id !== eventId) };
                } else {
                    return { favoriteEvents: [...state.favoriteEvents, eventId] };
                }
            }),
            hasFavorited: (eventId) => {
                return get().favoriteEvents.includes(eventId);
            },

            // Chat Messages Management
            sendMessage: (conversationId, text) => set((state) => {
                const newMsg = {
                    id: `msg_${Date.now()}`,
                    text,
                    senderId: 'me',
                    senderName: state.user?.name || 'Omar',
                    senderAvatar: 'https://i.pravatar.cc/150?img=32',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMine: true,
                };
                const existing = state.chatMessages[conversationId] || [];
                // Update last message in conversation list too
                const updatedConversations = state.conversations.map(c =>
                    c.id === conversationId
                        ? { ...c, lastMessage: text, lastMessageTime: 'now', unreadCount: 0 }
                        : c
                );
                return {
                    chatMessages: { ...state.chatMessages, [conversationId]: [...existing, newMsg] },
                    conversations: updatedConversations,
                };
            }),
            initConversationMessages: (conversationId, messages) => set((state) => {
                if (state.chatMessages[conversationId]) return state; // already loaded
                return { chatMessages: { ...state.chatMessages, [conversationId]: messages } };
            }),
        }),
        {
            name: 'logeexpress-user-storage',
            storage: createJSONStorage(() => AsyncStorage),
            // Only persist essential app state
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                hasSeenOnboarding: state.hasSeenOnboarding,
                userLocation: state.userLocation,
                userCategories: state.userCategories,
                joinedEvents: state.joinedEvents,
                favoriteEvents: state.favoriteEvents,
            }),
        }
    )
);
