import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import TicketToggle from '../components/TicketToggle';
import EventTicketCard from '../components/EventTicketCard';
import EmptyTicketState from '../components/EmptyTicketState';
import TicketShimmer from '../components/TicketShimmer';
import { useTicketsList } from '../../hooks/useTicketsList';
import { moderateScale } from '../../../../core/utils/responsive';
import { useNavigation } from '@react-navigation/native';

const TicketsScreen = () => {
    const [activeTab, setActiveTab] = useState('UPCOMING');
    const { tickets, isLoading } = useTicketsList(activeTab);
    const navigation = useNavigation();

    const handleJoinEvent = (event) => {
        // Later: route to Chat group screen
        console.log('Navigating to chat group for event:', event.title);
        // navigation.navigate('ChatGroupScreen', { eventId: event.id });
    };

    const handleViewTicket = (event) => {
        navigation.navigate('TicketDetails', { event });
    };

    const renderHeader = () => (
        <TicketToggle activeTab={activeTab} setActiveTab={setActiveTab} />
    );

    const renderEmpty = () => {
        if (isLoading) return null;
        return <EmptyTicketState type={activeTab} />;
    };

    const renderItem = ({ item }) => (
        <EventTicketCard 
            event={item} 
            isPast={activeTab === 'PAST'} 
            onPressJoin={() => handleJoinEvent(item)} 
            onPressViewTicket={() => handleViewTicket(item)}
        />
    );

    const renderShimmer = () => (
        <>
            <TicketShimmer />
            <TicketShimmer />
            <TicketShimmer />
        </>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={isLoading ? [] : tickets}
                    keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <>
                            {renderHeader()}
                            {isLoading && renderShimmer()}
                        </>
                    }
                    ListEmptyComponent={renderEmpty}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listContent: {
        paddingHorizontal: moderateScale(20),
        paddingBottom: moderateScale(100), // padding for the bottom navigator
        flexGrow: 1,
    }
});

export default TicketsScreen;
