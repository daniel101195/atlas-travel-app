import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '~/components';
import colors from '~/utils/colors';
import { scaleSize } from '~/utils/spacing';
import { FloatingButtonProps } from '~/index';
import { Spacing } from '~/metrics';

const FloatingButton: React.FC<FloatingButtonProps> = ({ customStyle = {}, onPress = () => null }) => {
  return (
    <TouchableOpacity style={{ ...styles.container, ...customStyle }} onPress={onPress}>
      <Icon type='material-community' name='pencil' size={scaleSize(32)} color={colors.gray} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: Spacing.L,
    bottom: scaleSize(32),
    width: scaleSize(56),
    height: scaleSize(56),
    borderRadius: scaleSize(28),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default React.memo(FloatingButton)