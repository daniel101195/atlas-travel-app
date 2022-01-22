import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Animated,
  Pressable,
} from 'react-native';
import colors from '../../utils/colors';
import { memoDeepEqual } from '../../utils/helpers';
import { FontSize, Spacing } from '../../metrics';
import { Icon, CustomText } from '../index';

const FloatingLabelInput = ({ value = '', label = '', containerStyle = {}, keyId, textStyle = {},
  onChangeText = () => { }, isSecure = false, iconName = '', iconType = '', errorMessage = '', inputRef,
  iconColor = colors.grayMedium, onPressIcon = () => { }, onReleaseIcon = () => { }, ...props }) => {

  const isEmpty = value === '';
  const [animatedIsFocused, _] = useState(new Animated.Value(isEmpty ? 0 : 1));
  const [isFocused, setFocused] = useState(false);
  const animatedLabelStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 4],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [FontSize.H5, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.grayLight, colors.grayMedium],
    }),
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || !isEmpty) ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [isFocused, isEmpty])

  return (
    <View key={keyId} style={{ ...defaultStyles.container, ...containerStyle }}>
      <Animated.Text style={{ ...defaultStyles.labelStyle, ...animatedLabelStyle }}>
        {label}
      </Animated.Text>
      <View style={defaultStyles.containerInput}>
        <TextInput
          ref={inputRef}
          style={{ ...defaultStyles.textInput(isFocused, iconName !== ''), ...textStyle }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          blurOnSubmit
          defaultValue={value}
          secureTextEntry={isSecure}
          selectionColor={defaultStyles.selectionColor}
          {...props} />
        {iconName !== '' && <Pressable onPressIn={onPressIcon} onPressOut={onReleaseIcon}>
          <Icon
            name={iconName}
            type={iconType}
            size={24}
            color={iconColor}
            style={defaultStyles.icon} />
        </Pressable>}
      </View>
      {errorMessage !== '' && <CustomText customStyle={defaultStyles.errorMessage}>{errorMessage}</CustomText>}
    </View>
  )
}

const defaultStyles = {
  container: {
    paddingTop: Spacing.M
  },
  containerInput: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  labelStyle: {
    position: 'absolute',
    left: 0,
    fontFamily: 'Montserrat-Medium'
  },
  textInput: (isFocused, hasIcon) => ({
    height: 32,
    width: '100%',
    fontSize: FontSize.H5,
    color: colors.black,
    borderBottomWidth: isFocused ? 2 : 1,
    borderBottomColor: isFocused ? colors.primaryPink : colors.grayLight,
    paddingBottom: 4,
    fontFamily: 'Montserrat-Medium',
    paddingEnd: hasIcon ? 28 : 2
  }),
  icon: {
    position: 'absolute',
    zIndex: 1,
    end: Spacing.XS
  },
  errorMessage: {
    color: colors.red,
    marginVertical: Spacing.XS
  },
  selectionColor: colors.primaryPink,
}

export default memoDeepEqual(FloatingLabelInput)
