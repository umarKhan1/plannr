import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const { width } = Dimensions.get('window');

const TicketDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { event } = route.params || {};

    if (!event) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{textAlign: 'center', marginTop: 20}}>No event details found.</Text>
            </SafeAreaView>
        );
    }

    const locationName = typeof event.location === 'string' ? event.location : (event.location?.name || 'Dhaka');
    const dateFormatted = event.dateRange?.split(',')[0] || event.date || 'Jan 09, 2022';

    const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=LOGE-${event.id || '1234567'}&scale=3`;

    const downloadPdf = async () => {
        try {
            const html = `
                <html>
                    <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; background-color: #f6f6f6; height: 100vh; margin: 0;">
                        <div style="width: 350px; background: white; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); overflow: hidden;">
                            <img src="${event.image}" style="width: 100%; height: 200px; object-fit: cover;" />
                            <div style="padding: 20px;">
                                <h1 style="margin: 0 0 5px 0; font-size: 22px;">${event.title}</h1>
                                <p style="margin: 0; color: #555; font-size: 14px;">${locationName}</p>
                                <hr style="margin: 20px 0; border: none; border-top: 2px dashed #eee;" />
                                
                                <table style="width: 100%; text-align: left;">
                                    <tr>
                                        <th style="color: #888; font-weight: normal; font-size: 12px; padding-bottom: 5px;">Name</th>
                                        <th style="color: #888; font-weight: normal; font-size: 12px; padding-bottom: 5px;">Date</th>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold; padding-bottom: 20px;">John Pantau</td>
                                        <td style="font-weight: bold; padding-bottom: 20px;">${dateFormatted}</td>
                                    </tr>
                                    <tr>
                                        <th style="color: #888; font-weight: normal; font-size: 12px; padding-bottom: 5px;">Seat</th>
                                        <th style="color: #888; font-weight: normal; font-size: 12px; padding-bottom: 5px;">Row</th>
                                    </tr>
                                    <tr>
                                        <td style="font-weight: bold;">2 Seat</td>
                                        <td style="font-weight: bold;">Row 4</td>
                                    </tr>
                                </table>
                            </div>
                            <div style="background: #fafafa; padding: 20px; text-align: center; border-top: 2px dashed #eee;">
                                <p style="color: #888; font-size: 12px; margin: 0 0 10px 0;">Barcode Booking</p>
                                <img src="${barcodeUrl}" style="width: 100%; height: 60px;" />
                            </div>
                        </div>
                    </body>
                </html>
            `;
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Error creating PDF:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                    <Feather name="arrow-left" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Ticket</Text>
                <TouchableOpacity onPress={downloadPdf} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                    <Feather name="download" size={24} color="#111" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* The Main Ticket Wrapper */}
                <View style={styles.ticketCard}>
                    
                    {/* Top Section */}
                    <View style={styles.topSection}>
                        <Image source={{uri: event.image}} style={styles.eventImage} contentFit="cover" />
                        <LinearGradient 
                            colors={['transparent', 'rgba(255,255,255,0.7)', '#FFFFFF']} 
                            style={styles.gradientOverlay}
                        />
                        <View style={styles.imageTextContainer}>
                            <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                            <Text style={styles.eventSubtitle} numberOfLines={1}>{locationName}</Text>
                        </View>
                    </View>

                    {/* Middle Details Grid */}
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Name</Text>
                            <Text style={styles.detailValue}>John Pantau</Text> 
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{dateFormatted}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Seat</Text>
                            <Text style={styles.detailValue}>2 Seat</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Row</Text>
                            <Text style={styles.detailValue}>Row 4</Text>
                        </View>
                    </View>

                    {/* Divider with Cutouts */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.cutoutLeft} />
                        <View style={styles.dashedLine} />
                        <View style={styles.cutoutRight} />
                    </View>

                    {/* Bottom Barcode Section */}
                    <View style={styles.barcodeSection}>
                        <Text style={styles.barcodeLabel}>Barcode Booking</Text>
                        <View style={styles.barcodeWrapper}>
                            <Image source={{uri: barcodeUrl}} style={styles.barcodeImage} contentFit="fill" />
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

// Reusable screen background color matching Logeexpress light theme backdrop
const SCREEN_BACKGROUND = '#F6F6F6';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SCREEN_BACKGROUND,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20),
        paddingVertical: verticalScale(15),
    },
    headerTitle: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        color: '#111',
    },
    scrollContent: {
        paddingHorizontal: moderateScale(24),
        paddingVertical: verticalScale(20),
        paddingBottom: verticalScale(40),
    },
    ticketCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(24),
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
        overflow: 'hidden',
    },
    topSection: {
        height: verticalScale(220),
        position: 'relative',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: 0,
        padding: moderateScale(20),
        width: '100%',
    },
    eventTitle: {
        fontSize: moderateScale(22),
        fontWeight: '800',
        color: '#111',
        marginBottom: verticalScale(4),
    },
    eventSubtitle: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#555',
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: moderateScale(20),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(10),
    },
    detailItem: {
        width: '50%',
        marginBottom: verticalScale(20),
    },
    detailLabel: {
        fontSize: moderateScale(12),
        color: '#888',
        marginBottom: verticalScale(4),
        fontWeight: '500',
    },
    detailValue: {
        fontSize: moderateScale(15),
        color: '#111',
        fontWeight: '700',
    },
    dividerContainer: {
        height: verticalScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    },
    cutoutLeft: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(15),
        backgroundColor: SCREEN_BACKGROUND,
        position: 'absolute',
        left: -moderateScale(15),
        zIndex: 2,
    },
    dashedLine: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        marginHorizontal: moderateScale(20), // gives some padding from cutout
        height: 1,
    },
    cutoutRight: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(15),
        backgroundColor: SCREEN_BACKGROUND,
        position: 'absolute',
        right: -moderateScale(15),
        zIndex: 2,
    },
    barcodeSection: {
        alignItems: 'center',
        paddingVertical: verticalScale(24),
        paddingHorizontal: moderateScale(20),
    },
    barcodeLabel: {
        fontSize: moderateScale(13),
        color: '#888',
        marginBottom: verticalScale(16),
        fontWeight: '500',
    },
    barcodeWrapper: {
        width: '100%',
        height: verticalScale(80),
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodeImage: {
        width: '100%',
        height: '100%',
    }
});

export default TicketDetailsScreen;
