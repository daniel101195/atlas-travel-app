import React, { useCallback } from 'react';
import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from '~/utils/colors';
import { icon_hamburger } from '~/utils/images';
import { CustomText, Icon, BaseScreen, Image, BottomSheet, RadioButton } from '~/components';
import { Spacing } from '~/metrics';
import useDiscoverHooks from './hooks';
import { LocalizeString } from '~/localize';
import { memoDeepEqual } from '~/utils/helpers';
import { scaleSize } from '~/utils/spacing';
import PagerView from 'react-native-pager-view';

const Explore = (props) => {
  const { isLoading, isShowBottomSheet, isSelected, startValue, currentTab, pagerRef,
    onChangeBottomSheet, onChangeSelected, onToggleDrawer, onChangeTab } = useDiscoverHooks(props, LocalizeString);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <View style={{ flexBasis: 100 }}>
            <Image tintColor={colors.mediumBlack} source={icon_hamburger} style={styles.icHambuger} onPress={onToggleDrawer} />
          </View>
          <CustomText h5 customStyle={styles.txtFooter} semiBold>{LocalizeString.titleExplore}</CustomText>
          <View style={styles.containerIcons}>
            <Icon type='ionicon' name='notifications-outline' size={24} color={colors.mediumBlack} style={{ marginEnd: Spacing.M }} />
            <Icon type='ionicon' name='ios-search' size={24} color={colors.mediumBlack} />
          </View>
        </View>
        {renderTabs()}
      </View>
    )
  }, [currentTab])

  const renderTabs = useCallback(() => {
    return (
      <View>
        <View style={styles.containerTabs}>
          <TouchableOpacity style={styles.tabItem} onPress={() => onChangeTab(0)}>
            <CustomText customStyle={styles.txtTab(currentTab === 0)}>{LocalizeString.titleExplore}</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => onChangeTab(1)}>
            <CustomText customStyle={styles.txtTab(currentTab === 1)}>{LocalizeString.titleActivities}</CustomText>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            ...styles.indicator,
            transform: [
              {
                translateX: startValue,
              }
            ],
          }} />
      </View>
    )
  }, [currentTab])

  const renderContent = useCallback(() => {
    return (
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}>
        <View key="0" style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1, alignSelf: 'stretch' }}
            contentContainerStyle={{ paddingBottom: Spacing.M }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4]}
            renderItem={renderItem}
            ListHeaderComponent={() => <View style={{ flex: 1, height: 150, backgroundColor: 'blue', marginBottom: Spacing.S }} />}
            ItemSeparatorComponent={() => <View style={{ marginVertical: Spacing.S }} />}
            keyExtractor={(item) => item.toString()} />
        </View>
        <View key="1" style={{ flex: 1, backgroundColor: "green" }}>

        </View>
      </PagerView>
    )
  }, [pagerRef])

  const renderItem = ({ item, index }) => {
    if (item === 1 || item === 4) {
      return <View style={{ flex: 0.5, height: 100, backgroundColor: 'green', marginEnd: item === 1 ? Spacing.XS : scaleSize(0) }}>

      </View>
    }
    if (item === 2 || item === 3) {
      return <View style={{ flex: 0.5, height: 200, backgroundColor: 'red', marginEnd: Spacing.XS }}>

      </View>
    }
  }

  return (
    <BaseScreen
      isLoading={isLoading}
      isGradient={false}
      header={renderHeader()}>
      <Animated.View style={styles.containerContent}>
        {renderContent()}
      </Animated.View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerIcons: {
    flexDirection: 'row',
    flexBasis: 100,
    justifyContent: 'flex-end'
  },
  containerTabs: {
    height: scaleSize(42),
    flexDirection: 'row'
  },
  containerHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.S,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerContent: {
    flex: 1,
    backgroundColor: colors.grayLight,
    paddingHorizontal: Spacing.M,
    paddingTop: Spacing.XL * 2
  },
  header: {
    paddingTop: Spacing.S,
    paddingHorizontal: Spacing.L,
  },
  line: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    height: 2,
  },
  txtFooter: {
    textAlign: 'center',
    color: colors.mediumBlack,
    flexBasis: 100,
  },
  icHambuger: {
    width: 24,
    height: 24,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    height: 2,
    backgroundColor: 'blue',
    width: '50%'
  },
  txtTab: (isFocused) => ({
    fontWeight: isFocused ? 'bold' : 'normal',
    color: colors.mediumBlack
  }),
  pagerView: {
    flex: 1,
  }
})

export default memoDeepEqual(Explore)