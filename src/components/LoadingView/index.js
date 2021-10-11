import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Radius, Spacing } from '~/metrics';
import colors from '~/utils/colors';
import { memoDeepEqual } from '~/utils/helpers';

const LoadingView = ({ isVisible = true }) => {

  return (
    isVisible ? <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.white} />
    </View> : null
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
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