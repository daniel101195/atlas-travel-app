import { Platform, Dimensions, StatusBar } from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT =
    Platform.OS !== 'ios' &&
    Dimensions.get('screen').height !== Dimensions.get('window').height &&
    StatusBar.currentHeight > 24
        ? Dimensions.get('screen').height - StatusBar.currentHeight
        : Dimensions.get('window').height;

export const isIphoneX = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            (dimen.height === 812 || dimen.width === 812) ||
            (dimen.height === 844 || dimen.width === 844) ||
            (dimen.height === 896 || dimen.width === 896) ||
            (dimen.height === 926 || dimen.width === 926))
    );
};
export const isAndroid = Platform.OS === 'android';
export const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

export const BOTTOM_BAR_HEIGHT = Platform.OS === 'ios' ? (isIphoneX() ? 20 : 0) : 0;
