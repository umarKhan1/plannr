import { useMemo, useState } from 'react';
import { useUserStore } from '../../../core/store/useUserStore';

// Tab filter values
export const MESSAGE_TABS = {
    ALL: 'ALL',
    EVENTS: 'EVENTS',
    DIRECT: 'DIRECT',
};

export const useMessagesList = () => {
    const conversations = useUserStore(state => state.conversations);
    const [activeTab, setActiveTab] = useState(MESSAGE_TABS.ALL);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        let list = conversations;

        // Tab filter
        if (activeTab === MESSAGE_TABS.EVENTS) {
            list = list.filter(c => c.type === 'event');
        } else if (activeTab === MESSAGE_TABS.DIRECT) {
            list = list.filter(c => c.type === 'individual');
        }

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                c =>
                    c.name.toLowerCase().includes(q) ||
                    c.lastMessage.toLowerCase().includes(q)
            );
        }

        return list;
    }, [conversations, activeTab, searchQuery]);

    const totalUnread = useMemo(
        () => conversations.reduce((sum, c) => sum + c.unreadCount, 0),
        [conversations]
    );

    return {
        conversations: filtered,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        totalUnread,
    };
};
