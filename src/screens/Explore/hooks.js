import { useCallback, useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Spacing } from "~/metrics";
import { getSccreenWidth } from "~/utils/helpers";
import { scaleSize } from "~/utils/spacing";

const useExploreHooks = (props) => {
  const pagerRef = useRef();
  const [startValue, ] = useState(new Animated.Value(0));
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isShowBottomSheet, setShowBottomSheet] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
  const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

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

  const onChangeTab = (index) => {
    setCurrentTab(index);
  }

  const onAnimationTab = () => {
    Animated.timing(startValue, {
      toValue: currentTab === 0 ? scaleSize(0) : (getSccreenWidth() / 2) - Spacing.L,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }

  const onTransitionTab = () => {
    pagerRef?.current?.setPage(currentTab);
  }

  //----------------------------- Side Effects -----------------------------

  useEffect(() => {
    onAnimationTab();
    onTransitionTab();
  }, [currentTab])

  return {
    pagerRef,
    startValue,
    isLoading,
    isShowBottomSheet,
    isSelected,
    currentTab,
    onToggleDrawer,
    onSetScrollBarWidth,
    onSetCompleteBarWidth,
    onChangeBottomSheet,
    onChangeSelected,
    onChangeTab
  }
}

export default useExploreHooks