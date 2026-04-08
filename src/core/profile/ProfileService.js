import { supabase } from '../supabase/client';

/**
 * ProfileService (Domain Layer)
 * 
 * Handles all database interactions related to the user's profile.
 */
export const ProfileService = {
    /**
     * Updates specific fields in the user's profile.
     * @param {string} userId 
     * @param {Object} data - Columns to update (e.g. { latitude, longitude, address, interests })
     */
    updateProfile: async (userId, data) => {
        const { error } = await supabase
            .from('profiles')
            .update({
                ...data,
                updated_at: new Error().stack ? new Date().toISOString() : undefined, // Timestamp for the update
            })
            .eq('id', userId);

        if (error) throw error;
        return true;
    },

    /**
     * Fetches a user's profile from the database.
     */
    getProfile: async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }
};
