import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FontSize, Radius, Spacing } from '../../../metrics';
import colors from "~/utils/colors"

const Buttons = ({ onLogin, onSignUp }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bgLogin} onPress={onLogin}>
        <Text style={styles.txtLogin}>Login</Text>
      </TouchableOpacity>
      <View style={styles.containerSeparator}>
        <View style={styles.line}/>
        <Text style={styles.txtOr}>OR</Text>
        <View style={styles.line}/>
      </View>
      <TouchableOpacity style={styles.bgSignup} onPress={onSignUp}>
        <Text style={{ ...styles.txtLogin, color: colors.bgIcon }}>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.M
  },
  containerSeparator: {
    flexDirection: 'row',
    marginVertical: Spacing.XL,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.L
  },
  bgLogin: {
    height: 42,
    backgroundColor: colors.bgIcon,
    borderRadius: Radius.XL,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgSignup: {
    height: 42,
    borderWidth: 2,
    borderColor: 'rgba(238, 238, 238, 0.5)',
    borderRadius: Radius.XL,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtLogin: {
    color: colors.primaryPink,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600'
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 2,
    flex: 0.5
  },
  txtOr: {
    marginHorizontal: Spacing.M,
    fontSize: FontSize.M,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    color: colors.bgIcon
  }
})

export default Buttons