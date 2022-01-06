import { isEqual } from 'lodash';
import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Icon from '~/components/Icon';
import { scaleSize } from './spacing';
import colors from './colors';
import { CustomText, Image } from '~/components';

const renderSuccessMessage = (message = '', type = 'success') => {
  showMessage({
    message,
    type,
  });
}

const renderErrorMessage = (message = '', type = 'danger') => {
  showMessage({
    message,
    type,
  });
}

const memoDeepEqual = component => {
  return memo(component, (prevProps, nextProps) => isEqual(prevProps, nextProps));
};

const lowercaseLetter = (string = '') => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const renderHeaderLeft = ({ imageUrl = '', roomName = '', onPressBack = () => null}) => {
  return (
    <View style={styles.containerHeaderLeft}>
      <Icon type='material' name='chevron-left' size={scaleSize(24)}
        color={colors.grayMedium} onPress={onPressBack} />
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <CustomText h5 bold customStyle={{ color: colors.mediumBlack }}>{roomName}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: scaleSize(16),
    marginBottom: scaleSize(4)
  },
  avatar: {
    width: scaleSize(32),
    height: scaleSize(32),
    marginStart: scaleSize(4),
    marginEnd: scaleSize(16)
  }
})

export {
  renderErrorMessage,
  renderSuccessMessage,
  lowercaseLetter,
  memoDeepEqual,
  renderHeaderLeft
}