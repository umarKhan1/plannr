import { StyleSheet, Platform } from 'react-native';
import { moderateScale } from '../../core/utils/responsive';

export const Typography = StyleSheet.create({
    h1: {
        fontSize: moderateScale(28),
        fontWeight: 'bold',
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    h2: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    h3: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    h4: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    body1: {
        fontSize: moderateScale(14),
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    body2: {
        fontSize: moderateScale(12),
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    },
    caption: {
        fontSize: moderateScale(10),
        ...Platform.select({
            ios: { fontFamily: 'System' },
            android: { fontFamily: 'Roboto' }
        })
    }
});
