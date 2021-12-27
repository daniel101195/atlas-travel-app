import React, { useCallback } from 'react';
import { Animated, FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import colors from '../../utils/colors';
import { CustomText, BaseScreen, BottomSheet, RadioButton, Header } from '../../components';
import { Radius, Spacing } from '../../metrics';
import useDiscoverHooks from './hooks';
import { LocalizeString } from '../../localize';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { memoDeepEqual } from '~/utils/helpers';

const Discover = (props) => {
  const { isLoading, scrollIndicatorPosition, scrollIndicatorSize, scrollIndicator,
    isShowBottomSheet, isSelected, onChangeBottomSheet, onChangeSelected,
    onToggleDrawer, onSetScrollBarWidth, onSetCompleteBarWidth } = useDiscoverHooks(props, LocalizeString);

  const renderList = () => {
    return (
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          horizontal
          onContentSizeChange={onSetCompleteBarWidth}
          onLayout={({ nativeEvent: { layout: { width } } }) => onSetScrollBarWidth(width)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollIndicator } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ height: 200, width: 400, backgroundColor: "#CCC", marginHorizontal: 6 }} />
          )} />
        <View style={styles.containerIndicator}>
          <Animated.View style={{ ...styles.indicator, width: scrollIndicatorSize, transform: [{ translateX: scrollIndicatorPosition }] }} />
        </View>
      </View>
    )
  }

  const renderContent = useCallback(() => {
    return (
      <View>
        <CustomText h2 customStyle={styles.txtPickCategory}>{LocalizeString.titleIntroducePickCategory}</CustomText>
        <TouchableOpacity onPress={onChangeBottomSheet}>
          <CustomText h2 customStyle={{ ...styles.txtPickCategory, color: Colors.white }}>{LocalizeString.titleCategory}</CustomText>
        </TouchableOpacity>
      </View>
    )
  }, [props])

  const renderBottomSheet = useCallback(() => {
    return (
      <BottomSheet isVisible={isShowBottomSheet} onChangeVisible={onChangeBottomSheet}>
        {['Outdoor', 'Indoor', 'Adventure'].map((item, index) => (
          <RadioButton
            key={index.toString()}
            onPress={onChangeSelected}
            isSelected={isSelected}
            text={item}
            textStyle={{  }}
            containerStyle={{ marginVertical: Spacing.S }} />
        ))}
      </BottomSheet>
    )
  }, [isShowBottomSheet, isSelected])

  return (
    <BaseScreen
      isLoading={isLoading}
      header={<Header title={LocalizeString.titleDiscover} onToggleDrawer={onToggleDrawer} />}
      bottomSheet={renderBottomSheet}>
      <View style={styles.containerContent}>
        {renderContent()}
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerIndicator: {
    marginTop: Spacing.M,
    backgroundColor: "#CCC",
    height: 6,
    borderRadius: Radius.M,
    marginHorizontal: Spacing.M
  },
  containerIcons: {
    flexDirection: 'row',
    flexBasis: 100,
    justifyContent: 'flex-end'
  },
  containerHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.L,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerContent: {
    paddingHorizontal: Spacing.M,
    paddingTop: Spacing.XL * 2
  },
  header: {
    paddingTop: Spacing.S,
    paddingHorizontal: Spacing.L,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 2,
  },
  txtFooter: {
    textAlign: 'center',
    color: colors.white,
    flexBasis: 100,
  },
  txtPickCategory: {
    color: colors.noti_icon,
    marginVertical: Spacing.S
  },
  icHambuger: {
    width: 24,
    height: 24,
  },
  indicator: {
    height: 6,
    width: 100,
    borderRadius: Radius.M,
    backgroundColor: "#AAA",
  }
})

export default memoDeepEqual(Discover)