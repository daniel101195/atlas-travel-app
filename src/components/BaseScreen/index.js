import React, { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoadingView, ImageBackground } from '~/components';
import { memoDeepEqual } from '~/utils/helpers';
import colors from '~/utils/colors';

const BaseScreen = ({ children, footer, header, isLoading = false, containerStyle = {},
  urlImageBg, isGradient = true, containerChldrenStyle = {}, bottomSheet, isLight = true }) => {

  const renderFooter = useCallback(() => {
    if (!footer) return;
    return (
      <View style={styles.containerFooter}>
        {footer()}
      </View>
    )
  }, [footer])

  return (
    <View style={styles.container}>
      {urlImageBg?.uri && <ImageBackground style={styles.containerBackground} source={urlImageBg.uri} />}
      {isGradient && <LinearGradient colors={colors.bgGradient} style={styles.containerGradient} />}
      <View style={{ zIndex: 3, flex: 1, ...StyleSheet.absoluteFill }}>
        <SafeAreaView style={{ ...styles.containerContent, ...containerStyle }}>
          {header}
          <View style={{ ...styles.containerBody(!!footer), ...containerChldrenStyle }}>
            {children}
          </View>
          {renderFooter()}
        </SafeAreaView>
        <LoadingView color={colors.primaryPink} size={64} isVisible={isLoading} />
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