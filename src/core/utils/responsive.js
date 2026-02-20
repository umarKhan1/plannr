import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
// (Ref: iPhone 11 Pro / X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scale function usually for width
 * @param {number} size 
 */
const horizontalScale = (size) => (width / guidelineBaseWidth) * size;

/**
 * Scale function for height
 * @param {number} size 
 */
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

/**
 * Scale with a moderate factor (good for padding/font size)
 * @param {number} size 
 * @param {number} factor default 0.5
 */
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

/**
 * Responsive Font Size
 * Accounts for user's accessibility settings (Text Size)
 */
const responsiveFontSize = (size) => {
    const newSize = horizontalScale(size);
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export {
    horizontalScale,
    verticalScale,
    moderateScale,
    responsiveFontSize,
    width as SCREEN_WIDTH,
    height as SCREEN_HEIGHT
};
