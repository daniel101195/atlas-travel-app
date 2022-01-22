import React, { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoadingView, ImageBackground } from '~/components';
import colors from '~/utils/colors';
import { memoDeepEqual } from '~/utils/helpers';

const BaseScreen = ({ children, footer, header, isLoading = false, containerStyle = {},
  urlImageBg, isGradient = true, containerChldrenStyle = {}, bottomSheet, renderPopup }) => {

  const renderFooter = useCallback(() => {
    if (!footer) return null;
    return (
      <View style={styles.containerFooter}>
        {footer()}
      </View>
    )
  }, [footer])

  const renderHeader = useCallback(() => {
    if (!header) return null;
    return (
      header
    )
  }, [header])

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
      <SafeAreaView style={{ ...styles.containerContent, ...containerStyle }}>
        {renderHeader()}
        <View style={{ ...styles.containerBody(!!footer), ...containerChldrenStyle }}>
          {children}
        </View>
        {renderFooter()}
      </SafeAreaView>
    )
  }, [header, children, footer])

  return (
    <View style={styles.container}>
      {renderBackground()}
      {renderGradient()}
      <View style={{ zIndex: 3, flex: 1, ...StyleSheet.absoluteFill }}>
        {renderContent()}
        {renderLoadingView?.()}
        {bottomSheet?.()}
        {renderPopup?.()}
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