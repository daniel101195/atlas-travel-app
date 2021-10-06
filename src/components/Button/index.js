import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Radius, ComponentSize } from '../../metrics';
import colors from '~/utils/colors';
import { CustomText } from '../index';
import { memoDeepEqual } from '../../utils/helpers';

const Button = ({ onPress = () => {}, title = '', titleStyle = {}, containerStyle = {}, buttonStyle = {} }) => {

  return (
    <TouchableOpacity style={{ ...styles.container, ...containerStyle }} onPress={onPress}>
      <LinearGradient colors={colors.bgGradient} style={{ ...styles.btnLogin, ...buttonStyle }}>
        <CustomText customStyle={{ ...styles.title, ...titleStyle }} semiBold>{title}</CustomText>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  btnLogin: {
    height: ComponentSize.buttonHeight,
    borderRadius: Radius.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    color: colors.bgIcon 
  }
})

export default memoDeepEqual(Button)