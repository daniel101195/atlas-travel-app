import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Radius, Spacing } from '../../metrics';
import colors from '../../utils/colors';
import { memoDeepEqual } from '../../utils/helpers';

const screenHeight = Dimensions.get("window").height;

const BottomSheet = ({ children, isVisible = false, onChangeVisible, ratio = 0.5 }) => {
  const [animation, _] = useState(new Animated.Value(0));
  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };
  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [ratio * screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const handleOpen = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onChangeVisible());
  };

  useEffect(() => {
    isVisible && handleOpen();
  }, [isVisible])

  return (
    isVisible ? <TouchableWithoutFeedback onPress={handleClose}>
      <Animated.View style={{ ...styles.container, ...StyleSheet.absoluteFill, ...backdrop }}>
        <Animated.View style={{ ...styles.popup(ratio), ...slideUp }}>
          {children}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback> : null
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    justifyContent: 'flex-end'
  },
  popup: (ratio) => ({
    backgroundColor: colors.white,
    flex: ratio,
    borderTopLeftRadius: Radius.M,
    borderTopRightRadius: Radius.M,
    padding: Spacing.L
  })
})

export default memoDeepEqual(BottomSheet)