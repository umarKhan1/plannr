import { create } from 'zustand';

// detailed comment: definition of the store helper function
// This is your "Global State Container" (like a Cubit/Bloc provided globally)
export const useUserStore = create((set) => ({
    // State variables (like state fields in a Cubit)
    user: null, // null means not logged in
    isAuthenticated: false,
    hasSeenOnboarding: false,
    currentSlideIndex: 0,
    userLocation: null, // Global location storage
    userCategories: [], // Global categories storage

    // Auth UI State (Global)
    isLoading: false,
    error: null,

    // Actions
    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            // Simulate API Call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock Success
            const mockUser = { id: 1, name: 'Omar', email };
            set({ user: mockUser, isAuthenticated: true, isLoading: false });
            return true; // Return success status
        } catch (e) {
            set({ error: 'Login Failed', isLoading: false });
            return false;
        }
    },

    signUp: async (fullName, phoneNumber, email, password) => {
        set({ isLoading: true, error: null });

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockUser = { id: 2, name: fullName, email, phone: phoneNumber };
            set({ user: mockUser, isAuthenticated: true, isLoading: false });
            return true;
        } catch (e) {
            set({ error: 'Sign Up Failed', isLoading: false });
            return false;
        }
    },

    logout: () => set({ user: null, isAuthenticated: false }),
    completeOnboarding: () => set({ hasSeenOnboarding: true }),
    setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
    setUserLocation: (location) => set({ userLocation: location }),
    setUserCategories: (categories) => set({ userCategories: categories }),
}));
