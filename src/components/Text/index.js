import React from 'react';
import { Pressable, StyleSheet, Text } from "react-native";
import { FontSize, Spacing } from '../../metrics';
import colors from '../../utils/colors';

const CustomText = ({ children, h1, h2, h3, h4, h5, bold,
  semiBold, italic, customStyle, containerStyle, onPress }) => {

  const getFontSize = () => {
    if (h1) return FontSize.H1;
    if (h2) return FontSize.H2;
    if (h3) return FontSize.H3;
    if (h4) return FontSize.H4;
    if (h5) return FontSize.H5;
    return FontSize.M;
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

export default React.memo(CustomText)