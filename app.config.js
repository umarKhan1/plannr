import 'dotenv/config';

export default {
    expo: {
        name: "logexpress",
        slug: "logexpress",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.anonymous.logexpress",
            infoPlist: {
                NSLocationWhenInUseUsageDescription: "This app needs your location to help you set the delivery or pickup address on the map.",
                NSLocationAlwaysAndWhenInUseUsageDescription: "This app needs your location to track delivery progress.",
                NSPhotoLibraryUsageDescription: "Logeexpress needs access to your photo library to send images in chat.",
                NSCameraUsageDescription: "Logeexpress needs access to your camera to take photos for chat."
            },
            config: {
                googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
            }
        },
        android: {
            package: "com.anonymous.logexpress",
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true,
            permissions: [
                "ACCESS_COARSE_LOCATION",
                "ACCESS_FINE_LOCATION"
            ],
            config: {
                googleMaps: {
                    apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
                }
            }
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        plugins: [
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
                }
            ],
            [
                "expo-image-picker",
                {
                    "photosPermission": "Logeexpress needs access to your photo library to send images in chat."
                }
            ],
            "react-native-bottom-tabs",
            "@react-native-community/datetimepicker"
        ]
    }
};
