import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import { FontSize, Spacing } from '../../metrics';
import { scaleFont } from '../../utils/spacing';
import colors from '../../utils/colors';
import { memoDeepEqual } from '../../utils/helpers';

const CustomText = ({ children, h1, h2, h3, h4, h5, bold,
  semiBold, italic, customStyle, containerStyle, onPress }) => {

  const getFontSize = () => {
    if (h1) return scaleFont(FontSize.H1);
    if (h2) return scaleFont(FontSize.H2);
    if (h3) return scaleFont(FontSize.H3);
    if (h4) return scaleFont(FontSize.H4);
    if (h5) return scaleFont(FontSize.H5);
    return scaleFont(FontSize.M);
  }

  const getFont = () => {
    if (bold) return 'Montserrat-Bold';
    if (italic) return 'Montserrat-Italic';
    if (semiBold) return 'Montserrat-SemiBold';
    return 'Montserrat-Medium';
  }

  return (
    onPress ? <Pressable onPress={onPress} style={{ ...styles.containerUnderline, ...containerStyle }}>
      <Text style={{ fontFamily: getFont(), fontSize: getFontSize(), color: colors.grayMedium, ...customStyle }}>
        {children}</Text>
    </Pressable> : <Text style={{ fontFamily: getFont(), fontSize: getFontSize(), color: colors.grayMedium, ...customStyle }}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  containerUnderline: {
    borderColor: colors.grayLight,
    borderBottomWidth: 2,
    paddingBottom: Spacing.XS,
  }
})

export default memoDeepEqual(CustomText)