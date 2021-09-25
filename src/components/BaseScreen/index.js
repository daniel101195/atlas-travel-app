import React, { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LoadingView } from '../../components';
import { getSccreenHeight, getSccreenWidth, memoDeepEqual } from '../../utils/helpers';
import colors from '../../utils/colors';

const BaseScreen = ({ children, footer, header, isLoading = false, containerStyle = {},
  urlImageBg, isGradient = true, containerChldrenStyle = {}, bottomSheet }) => {

  const renderFooter = useCallback(() => {
    if (!footer) return;
    return (
      <View style={styles.containerFooter}>
        {footer()}
      </View>
    )
  }, [footer])

  return (
    <ImageBackground style={styles.container}
      source={urlImageBg}
      imageStyle={styles.imageBg}>
      <StatusBar barStyle='light-content' />
      {isGradient && <LinearGradient colors={colors.bgGradient} style={styles.container} />}
      <SafeAreaView style={{ ...styles.containerContent, ...containerStyle }}>
        {!!header && <View style={styles.containerHeader}>
          {header}
        </View>}
        <View style={{ ...styles.containerBody(!!footer), ...containerChldrenStyle }}>
          {children}
        </View>
        {renderFooter()}
      </SafeAreaView>
      <LoadingView color={colors.primaryPink} size={64} isVisible={isLoading} />
      {!!bottomSheet && bottomSheet()}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    position: 'absolute',
    zIndex: 1,
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
    flex: 0.1,
    zIndex: 2
  },
  containerHeader: {
    zIndex: 2
  },
  imageBg: {
    flex: 1,
    width: getSccreenWidth(),
    height: getSccreenHeight(),
    position: 'absolute',
    zIndex: 1
  },
})

export default memoDeepEqual(BaseScreen)