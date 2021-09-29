import { useCallback, useRef, useState, useContext, useEffect } from "react";
import { Spacing } from '../../metrics';
import { Animated } from "react-native";

const useExploreHooks = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [isShowBottomSheet, setShowBottomSheet] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
  const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;
  const scrollIndicatorSize =
    completeScrollBarWidth > visibleScrollBarWidth
      ? (visibleScrollBarWidth * (visibleScrollBarWidth / 2)) / completeScrollBarWidth
      : visibleScrollBarWidth;
  const difference =
    visibleScrollBarWidth > scrollIndicatorSize
      ? visibleScrollBarWidth - scrollIndicatorSize - Spacing.M * 2
      : 1;
  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarWidth / completeScrollBarWidth
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp'
  });

  const onChangeLoading = useCallback((value) => {
    setLoading(value)
  }, [isLoading])

  const onChangeBottomSheet = useCallback(() => {
    setShowBottomSheet(!isShowBottomSheet);
  }, [isShowBottomSheet])

  const onToggleDrawer = () => {
    props?.navigation?.toggleDrawer?.();
  }

  const onSetScrollBarWidth = useCallback((width) => {
    setVisibleScrollBarWidth(width);
  }, [visibleScrollBarWidth])

  const onSetCompleteBarWidth = useCallback((width, height) => {
    setCompleteScrollBarWidth(width);
  }, [completeScrollBarWidth])

  const onChangeSelected = useCallback(() => {
    setSelected(!isSelected)
  }, [isSelected])

  //----------------------------- Side Effects -----------------------------

  return {
    isLoading,
    scrollIndicatorPosition,
    scrollIndicatorSize,
    scrollIndicator,
    isShowBottomSheet,
    isSelected,
    onToggleDrawer,
    onSetScrollBarWidth,
    onSetCompleteBarWidth,
    onChangeBottomSheet,
    onChangeSelected
  }
}

export default useExploreHooks