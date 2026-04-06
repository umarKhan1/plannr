import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';

const MessageSearchBar = ({ value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <Feather name="search" size={16} color="#999" style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder="Search conversations..."
                placeholderTextColor="#AAAAAA"
                returnKeyType="search"
                clearButtonMode="while-editing"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F8',
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(14),
        marginHorizontal: moderateScale(20),
        marginBottom: verticalScale(16),
        height: verticalScale(44),
    },
    icon: {
        marginRight: moderateScale(8),
    },
    input: {
        flex: 1,
        fontSize: moderateScale(14),
        color: '#111',
        fontWeight: '500',
    },
});

export default MessageSearchBar;
