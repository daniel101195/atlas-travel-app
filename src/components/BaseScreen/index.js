import React, { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoadingView, ImageBackground, FloatingButton } from '~/components';
import colors from '~/utils/colors';
import { memoDeepEqual } from '~/utils/helpers';

const BaseScreen = ({ children, footer, header, isLoading = false, containerStyle = {}, onPressFloating = () => { },
  urlImageBg, isGradient = true, isShowFloating = false, containerChldrenStyle = {}, bottomSheet }) => {

  const renderFooter = useCallback(() => {
    if (!footer) return;
    return (
      <View style={styles.containerFooter}>
        {footer()}
      </View>
    )
  }, [footer])

  const renderFloatingButton = useCallback(() => {
    if (!isShowFloating) return null
    return (
      <FloatingButton onPress={onPressFloating} />
    )
  }, [isShowFloating])

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

  return (
    <View style={styles.container}>
      {renderBackground()}
      {renderGradient()}
      <View style={{ zIndex: 3, flex: 1, ...StyleSheet.absoluteFill }}>
        <SafeAreaView style={{ ...styles.containerContent, ...containerStyle }}>
          {header}
          <View style={{ ...styles.containerBody(!!footer), ...containerChldrenStyle }}>
            {children}
          </View>
          {renderFooter()}
          {renderFloatingButton()}
        </SafeAreaView>
        <LoadingView isVisible={isLoading} />
        {bottomSheet?.()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: haveFooter ? 0.9 : 1,
  }),
  containerFooter: {
    flex: 0.1
  },
})

export default memoDeepEqual(BaseScreen)