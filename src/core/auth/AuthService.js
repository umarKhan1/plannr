import { supabase } from '../supabase/client';

/**
 * AuthService (Domain/Data Layer)
 * 
 * Handles all authentication interactions with Supabase.
 * This pattern keeps our business logic separate from the 
 * underlying data provider, making it easier to maintain and test.
 */
export const AuthService = {
    /**
     * Signs up a new user and metadata for profile creation.
     * @param {string} email 
     * @param {string} password 
     * @param {string} fullName 
     * @param {string} phoneNumber 
     */
    signUp: async (email, password, fullName, phoneNumber) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone_number: phoneNumber,
                },
            },
        });

        if (error) throw error;
        return data;
    },

    /**
     * Authenticates a user with email and password.
     */
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    /**
     * Signs out the current user.
     */
    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Retrieves the current active session.
     */
    getSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    /**
     * Subscribes to authentication state changes.
     * @param {Function} callback 
     */
    onAuthStateChange: (callback) => {
        return supabase.auth.onAuthStateChange(callback);
    }
};
