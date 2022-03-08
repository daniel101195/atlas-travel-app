import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Keyboard, StatusBar, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient';
import { LoadingView, ImageBackground, Header } from '~/components';
import { DEVICE_HEIGHT, STATUS_BAR_HEIGHT } from '~/utils/dimensions';
import colors from '~/utils/colors';
import { memoDeepEqual } from '~/utils/helpers';
import { scaleSize } from '~/metrics';

const isNotAndroid = Platform.OS !== 'android';
const CONTENT_HEIGHT = DEVICE_HEIGHT - STATUS_BAR_HEIGHT;

const BaseScreen = ({ children, footer, isShowHeader = false, isLoading = false, containerStyle = {}, isAwareKeyboard = false,
  urlImageBg, isGradient = true, containerChldrenStyle = {}, bottomSheet, renderPopup, customScrollView = {}, navigation = {},
  headerTitle = '', isBasicHeader = false, isDarkStyle = false, isShowLine = true }) => {

  const [isScrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', () => {
        setScrollEnabled(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', () => {
        setScrollEnabled(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove?.();
      keyboardDidShowListener.remove?.();
    };
  }, []);

  const renderBackground = useCallback(() => {
    if (!urlImageBg) return null
    return (
      <ImageBackground style={styles.containerBackground} source={urlImageBg} />
    )
  }, [urlImageBg])

  const renderGradient = useCallback(() => {
    if (!isGradient) return null
    return (
      <LinearGradient colors={colors.bgGradient} style={styles.containerGradient} />
    )
  }, [isGradient])

  const renderLoadingView = useCallback(() => {
    if (!isLoading) return null;
    return (
      <LoadingView isVisible={isLoading} />
    )
  }, [isLoading])

  const renderContent = useCallback(() => {
    return (
      isAwareKeyboard ? <KeyboardAwareScrollView
        contentContainerStyle={{ ...styles.containerScrollView, ...customScrollView }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isScrollEnabled}
        keyboardShouldPersistTaps='handled'
        enableOnAndroid={true}>
        <View style={{ height: CONTENT_HEIGHT }}>
          {children}
        </View>
      </KeyboardAwareScrollView> :
        <SafeAreaView style={{ ...styles.containerContent, ...containerStyle }}>
          <View style={{ ...styles.containerBody(!!footer), ...containerChldrenStyle }}>
            {children}
          </View>
        </SafeAreaView>
    )
  }, [children, footer, isAwareKeyboard, isScrollEnabled])

  const renderHeader = useCallback(() => {
    if (!isShowHeader) return null
    return (
      <Header navigation={navigation} title={headerTitle} isShowLine={isShowLine}
        isBasicHeader={isBasicHeader} isDarkStyle={isDarkStyle} />
    )
  }, [isShowHeader, navigation, headerTitle, isBasicHeader, isDarkStyle, isShowLine])

  const renderStatusBar = useCallback(() => {
    if (isNotAndroid) return null
    return (
      <StatusBar barStyle={isDarkStyle ? 'dark-content' : 'light-content'} translucent backgroundColor="transparent" />
    )
  }, [isNotAndroid, isDarkStyle])

  return (
    <View style={styles.container}>
      {renderStatusBar()}
      {renderBackground()}
      {renderGradient()}
      <View style={styles.containerSurface}>
        {renderHeader?.()}
        {renderContent?.()}
        {renderLoadingView?.()}
        {bottomSheet?.()}
        {renderPopup?.()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerGradient: {
    flex: 1,
    zIndex: 1,
  },
  containerBackground: {
    flex: 1,
    zIndex: 2,
    ...StyleSheet.absoluteFill
  },
  containerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  containerChild: {
    flex: 1,
    justifyContent: 'center',
  },
  containerBody: (haveFooter) => ({
    flex: 1,
  }),
  containerFooter: {
    flex: 0.1
  },
  containerSurface: {
    flex: 1,
    zIndex: 3,
    ...StyleSheet.absoluteFill,
    top: isNotAndroid ? scaleSize(0) : STATUS_BAR_HEIGHT
  },
  containerScrollView: {
    flexGrow: 1,
    height: CONTENT_HEIGHT
  }
})

export default memoDeepEqual(BaseScreen)