import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { Radius, Spacing } from '../../metrics';
import colors from '../../utils/colors';
import { memoDeepEqual } from '../../utils/helpers';

const LoadingView = ({ isVisible = true, size, color, type = 'ThreeBounce' }) => {

  return (
    isVisible ? <View style={styles.container}>
      <Spinner
        isVisible={true}
        size={size}
        type={type}
        color={color} />
    </View> : null
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  spinner: {
    backgroundColor: colors.bgIcon,
    padding: Spacing.M,
    borderRadius: Radius.M
  }
})

export default memoDeepEqual(LoadingView)