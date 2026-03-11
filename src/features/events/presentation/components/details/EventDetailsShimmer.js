import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ShimmerEffect from '../../../../../shared/components/ShimmerEffect';
import { moderateScale, verticalScale } from '../../../../../core/utils/responsive';

const { width } = Dimensions.get('window');

const EventDetailsShimmer = () => {
    return (
        <View style={styles.container}>
            {/* Hero Image Shimmer */}
            <ShimmerEffect width={width} height={verticalScale(300)} borderRadius={0} />

            {/* Overlapping Info Card Shimmer */}
            <View style={styles.infoCard}>
                <ShimmerEffect width="80%" height={28} style={{ marginBottom: 12 }} />
                <ShimmerEffect width="40%" height={16} style={{ marginBottom: 16 }} />

                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <ShimmerEffect width="50%" height={18} />
                    <View style={styles.row}>
                        {[1, 2, 3, 4].map((_, i) => (
                            <ShimmerEffect
                                key={i}
                                width={32}
                                height={32}
                                borderRadius={16}
                                style={{ marginLeft: i === 0 ? 0 : -10, borderWidth: 2, borderColor: '#fff' }}
                            />
                        ))}
                    </View>
                </View>
            </View>

            {/* About Section Shimmer */}
            <View style={styles.section}>
                <ShimmerEffect width={80} height={20} style={{ marginBottom: 16 }} />
                <ShimmerEffect width="100%" height={14} style={{ marginBottom: 8 }} />
                <ShimmerEffect width="100%" height={14} style={{ marginBottom: 8 }} />
                <ShimmerEffect width="75%" height={14} />
            </View>

            {/* Organizer Section Shimmer */}
            <View style={styles.section}>
                <ShimmerEffect width={180} height={20} style={{ marginBottom: 16 }} />
                <View style={styles.row}>
                    <ShimmerEffect width={44} height={44} borderRadius={22} style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                        <ShimmerEffect width={100} height={16} style={{ marginBottom: 6 }} />
                        <ShimmerEffect width={140} height={14} />
                    </View>
                    <ShimmerEffect width={44} height={44} borderRadius={12} />
                </View>
            </View>

            {/* Location Section Shimmer */}
            <View style={styles.section}>
                <ShimmerEffect width={90} height={20} style={{ marginBottom: 16 }} />
                <ShimmerEffect width="100%" height={verticalScale(160)} borderRadius={16} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(24),
        padding: moderateScale(24),
        marginTop: verticalScale(-30),
        marginHorizontal: moderateScale(20),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: verticalScale(24),
    },
    section: {
        paddingHorizontal: moderateScale(24),
        marginBottom: verticalScale(28),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default EventDetailsShimmer;
