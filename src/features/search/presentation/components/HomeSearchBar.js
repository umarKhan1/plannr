import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { useNavigation } from '@react-navigation/native';

export function HomeSearchBar() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Search')}
        >
            <View style={styles.searchBox}>
                <Feather name="search" size={20} color="#BFBFBF" style={styles.searchIcon} />
                <Text style={styles.inputPlaceholder}>Search</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        marginTop: verticalScale(15),
        marginBottom: verticalScale(20),
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(15),
        borderWidth: 1,
        borderColor: '#EFEFEF', // subtle border required
        height: verticalScale(50),
        paddingHorizontal: moderateScale(15),
    },
    searchIcon: {
        marginRight: moderateScale(10),
    },
    inputPlaceholder: {
        flex: 1,
        fontSize: moderateScale(16),
        color: '#BFBFBF',
    },
});
