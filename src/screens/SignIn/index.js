import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from '~/utils/colors';
import { login_bg_2 } from '~/utils/images';
import { Input, CustomText, Toggle, BaseScreen, Button } from '~/components';
import { Radius, scaleSize, Spacing } from '~/metrics';
import useLoginHooks from './hooks';
import { LocalizeString } from '~/localize';
import { memoDeepEqual } from '~/utils/helpers'

const SignIn = (props) => {
  const { isRemember, isLoading, isShowPass, errorMessage, loginData,
    onShowPass, onHidePass, onSubmit, onChangePassword, onChangeUsername,
    onChangeRememberLogin, onNavigateSignUp } = useLoginHooks(props);

  const renderButtonLogin = useCallback(() => {
    return (
      <Button
        onPress={onSubmit}
        title={LocalizeString.titleLogin}
        containerStyle={{ marginTop: scaleSize(32) }}
      />
    )
  }, [loginData, errorMessage, isRemember])

  const renderInputs = useCallback(() => {
    const iconEmail = errorMessage === '' ?
      'check' : errorMessage && errorMessage !== '' ? 'close' : '';

    return (
      <View style={styles.containerInput}>
        <Input
          label={LocalizeString.titleEmail}
          onChangeText={onChangeUsername}
          value={loginData?.username}
          iconName={iconEmail}
          containerStyle={{ marginVertical: Spacing.L }}
          iconColor={colors.primaryPink}
          iconType='material-community' />
        <Input
          label={LocalizeString.titlePassword}
          containerStyle={styles.password}
          onChangeText={onChangePassword}
          onPressIcon={onShowPass}
          onReleaseIcon={onHidePass}
          iconName={isShowPass ? 'eye-slash' : 'eye'}
          iconType='font-awesome'
          isSecure={!isShowPass}
          value={loginData?.password} />
        {renderRemenberLogin()}
      </View>
    )
  }, [loginData, errorMessage, isShowPass, isRemember])

  const renderRemenberLogin = useCallback(() => {
    return (
      <View style={styles.rememberLogIn}>
        <CustomText>{LocalizeString.titleRemeberLogin}</CustomText>
        <Toggle onValueChange={onChangeRememberLogin} value={isRemember} trackColor={{
          false: colors.grayLight,
          true: colors.primaryPink
        }} />
      </View>
    )
  }, [isRemember, loginData])

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.footer}>
        <View style={styles.line} />
        <View style={styles.containerFooter}>
          <CustomText customStyle={{ ...styles.txtFooter, marginEnd: Spacing.XS, color: colors.grayLight }}>{LocalizeString.titleNotUser}</CustomText>
          <CustomText
            bold
            onPress={onNavigateSignUp}
            customStyle={styles.txtFooter}>{LocalizeString.titleRegister}</CustomText>
        </View>
      </View>
    )
  }, [])

  return (
    <BaseScreen
      urlImageBg={login_bg_2}
      navigation={props.navigation}
      headerTitle={LocalizeString.titleSignIn}
      isBasicHeader={true}
      isShowHeader={true}
      isAwareKeyboard={true}
      isLoading={isLoading}>
      <View style={styles.containerContent}>
        <View style={styles.containerChild}>
          {renderInputs()}
          {renderButtonLogin()}
        </View>
      </View>
      {renderFooter()}
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 0.96,
    justifyContent: 'center',
    paddingHorizontal: Spacing.L,
  },
  containerInput: {
    justifyContent: 'center'
  },
  containerChild: {
    backgroundColor: colors.bgIcon,
    borderRadius: Radius.M,
    paddingHorizontal: Spacing.L,
    paddingTop: Spacing.XL * 2,
    paddingBottom: Spacing.XL
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footer: {
    paddingHorizontal: Spacing.L,
  },
  rememberLogIn: {
    flexDirection: 'row',
    marginTop: Spacing.M,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  password: {
    marginVertical: Spacing.S
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 2,
  },
  txtFooter: {
    textAlign: 'center',
    marginTop: Spacing.L,
    color: colors.bgIcon
  }
})

export default memoDeepEqual(SignIn)