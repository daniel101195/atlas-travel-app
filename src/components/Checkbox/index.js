import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Radius, Spacing } from '../../metrics';
import colors from '../../utils/colors';
import { Icon } from '../index';

const Checkbox = ({ isChecked = false, iconSize = 20, onChangeChecked = () => { },
  iconType = 'material-community', iconName = 'check' }) => {

  return (
    <TouchableOpacity
      style={{ ...styles.container(isChecked), ...styles.shadow }}
      onPress={onChangeChecked}>
      <Icon
        type={iconType}
        name={iconName}
        size={iconSize}
        color={isChecked ? colors.bgIcon : colors.grayMedium} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: (isChecked) => ({
    padding: Spacing.XXS,
    borderRadius: Radius.S,
    borderWidth: 1.5,
    borderColor: isChecked ? colors.primaryPink : colors.bgIcon,
    backgroundColor: isChecked ? colors.primaryPink : colors.bgIcon
  }),
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
})

export default React.memo(Checkbox)