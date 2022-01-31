import React from "react";
import { StyleSheet } from "react-native";
import { CustomText } from "~/components";

const HeaderSection = ({ title = '' }) => {
  return (
    <CustomText bold customStyle={styles.section}>{title}</CustomText>
  )
}

const styles = StyleSheet.create({
  section: {
    textAlign: 'center'
  }
})

export default React.memo(HeaderSection)