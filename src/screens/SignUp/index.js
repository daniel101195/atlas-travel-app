import React, { useCallback } from 'react';
import { StyleSheet, View } from "react-native";
import { BaseScreen, CustomText, Input, Checkbox, Button } from '../../components';
import { Radius, Spacing } from '../../metrics';
import colors from '../../utils/colors';
import { sign_up_bg } from '../../utils/images';
import { LocalizeString } from '../../localize';
import useSignUpHooks from './hooks';
import { upperFirstChar } from '../../utils/string';
import { Controller, useForm } from "react-hook-form";
import { memoDeepEqual, lowercaseLetter } from '../../utils/helpers';

const fontSizeTitle = 28;

const SignUp = (props) => {
  const { inputs, control, handleSubmit, errors, isLoading,
    onChangeAgree, onNavigateSignIn, onSubmit, onGetDefaultValue } = useSignUpHooks(props, useForm);

  const renderInputs = useCallback(() => {
    return (
      inputs.map((item, index) => {
        const labelString = item === inputs[2] ?
          "title" + upperFirstChar(item) :
          "title" + item;
        return (
          <Controller
            key={index.toString()}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                keyId={index.toString()}
                isSecure={item === inputs[1] || item === inputs[2]}
                containerStyle={styles.input}
                label={LocalizeString[labelString]}
                errorMessage={errors?.[item]?.message}
                onChangeText={value => {
                  index === 3 ? onChange(lowercaseLetter(value)) : onChange(value);
                }} />
            )}
            name={item}
            defaultValue={() => onGetDefaultValue(item)}
          />
        )
      })
    )
  }, [inputs])

  const renderAgreeTerms = useCallback(() => {
    return (
      <View style={{ alignSelf: "stretch" }}>
        <View style={styles.containerCheckbox}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox isChecked={value} onChangeChecked={() => {
                onChangeAgree(onChange);
              }} />
            )}
            name='Terms'
            defaultValue={false}
          />
          <View style={styles.containerTextAgree}>
            <CustomText customStyle={styles.titleAgree}>{LocalizeString.titleAgree}</CustomText>
            <CustomText
              semiBold
              onPress={() => { }}>{LocalizeString.titleTermStuff}</CustomText>
          </View>
        </View>
        {errors?.Terms?.message &&
          <CustomText customStyle={styles.errorMessage}>{errors.Terms.message}</CustomText>}
      </View>
    )
  }, [inputs])

  const renderButtonSignup = useCallback(() =>
    <View style={styles.containerButton}>
      <Button title={LocalizeString.titleSignUp} onPress={handleSubmit(onSubmit)} />
    </View>, [inputs])

  const renderHeaderTitle = useCallback(() =>
    <CustomText semiBold customStyle={styles.joinUs}>{LocalizeString.titleJoinUs}</CustomText>, [inputs])

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.footer}>
        <View style={styles.line} />
        <View style={styles.containerFooter}>
          <CustomText customStyle={{ ...styles.txtFooter, marginEnd: Spacing.XS, color: colors.grayLight }}>{LocalizeString.titleAlreadyMember}</CustomText>
          <CustomText
            bold
            onPress={onNavigateSignIn}
            customStyle={styles.txtFooter}>{LocalizeString.titleSignIn}</CustomText>
        </View>
      </View>
    )
  }, [inputs])

  return (
    <BaseScreen
      footer={renderFooter}
      urlImageBg={sign_up_bg}
      isLoading={isLoading}
      containerChldrenStyle={{ justifyContent: 'center' }}>
      <View style={styles.containerChild}>
        {renderHeaderTitle()}
        {renderInputs()}
        {renderAgreeTerms()}
        {renderButtonSignup()}
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  containerChild: {
    backgroundColor: colors.bgIcon,
    flex: 0.8,
    borderRadius: Radius.M,
    paddingHorizontal: Spacing.L,
    marginHorizontal: Spacing.L,
    paddingBottom: Spacing.S,
    paddingTop: Spacing.L,
    alignItems: 'center',
    marginTop: Spacing.L * 2
  },
  containerCheckbox: {
    alignSelf: 'flex-start',
    marginVertical: Spacing.M,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerTextAgree: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3 / 4 * Spacing.S
  },
  containerButton: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: 'flex-end'
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  joinUs: {
    fontSize: fontSizeTitle,
    marginBottom: Spacing.M
  },
  input: {
    marginVertical: Spacing.S
  },
  titleAgree: {
    marginStart: Spacing.M,
    marginEnd: Spacing.XS
  },
  footer: {
    paddingHorizontal: Spacing.L,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 2,
  },
  txtFooter: {
    textAlign: 'center',
    marginTop: Spacing.L,
    color: colors.bgIcon
  },
  errorMessage: {
    color: colors.red,
    marginVertical: Spacing.XS
  },
})

export default memoDeepEqual(SignUp)