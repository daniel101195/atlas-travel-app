import React, { useCallback, useEffect, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '~/utils/dimensions';
import { AlertPopupProps } from '~/index';

const AlertPopup: React.FC<AlertPopupProps> = ({ onPress = () => { }, children }) => {
  const [animation, _] = useState(new Animated.Value(0));
  const backdrop = {
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
          outputRange: [0.05 * DEVICE_HEIGHT, 0],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  const animatedPopup = useCallback(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [animation])

  useEffect(() => {
    animatedPopup();
  }, [])

  return (
    <Animated.View style={{ ...styles.container, ...backdrop }}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View style={{ ...styles.containerBackground, ...slideUp }}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default React.memo(AlertPopup)