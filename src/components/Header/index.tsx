import React, { useCallback } from "react";
import { HeaderProps } from '~/index';
import { CustomText, Icon, Image } from '..';
import { StyleSheet, View } from "react-native";
import { Spacing, scaleSize } from '../../metrics';
import { icon_hamburger } from '../../utils/images';
import colors from "~/utils/colors";
import { isEmpty } from "lodash-es";
import { isIphoneX, STATUS_BAR_HEIGHT } from "~/utils/dimensions";

const Header: React.FC<HeaderProps> = ({ onToggleDrawer = () => null, title = '', navigation,
  haveRightIcons = true, isDarkStyle = false, childTab = {}, isShowLine = false, isBasicHeader }) => {

  const renderCloseIcon = useCallback(() => {
    const { canGoBack, goBack } = navigation || {};
    return (
      canGoBack && typeof goBack === 'function' ?
        <View style={styles.containerIconBack}>
          <Icon name="close" size={scaleSize(24)} color={colors.bgIcon} onPress={goBack} type='material-community' />
        </View> : null
    )
  }, [navigation])

  const renderTitle = useCallback(() => {
    return (
      <CustomText h4 customStyle={styles.txtHeader}>{title}</CustomText>
    )
  }, [title])

  if (isBasicHeader) {
    return (
      <View style={styles.containerScreenHeader}>
        {renderCloseIcon()}
        {renderTitle()}
      </View>
    )
  }

  if (isDarkStyle) {
    return (
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <View style={{ flexBasis: 100 }}>
            <Image tintColor={colors.mediumBlack} source={icon_hamburger} style={styles.icHambuger} onPress={onToggleDrawer} />
          </View>
          <CustomText h5 customStyle={{ ...styles.txtFooter, color: colors.mediumBlack }} semiBold>{title}</CustomText>
          <View style={styles.containerIcons}>
            <Icon type='ionicon' name='notifications-outline' size={24} color={colors.mediumBlack} style={{ marginEnd: Spacing.M }} />
            <Icon type='ionicon' name='ios-search' size={24} color={colors.mediumBlack} />
          </View>
        </View>
        {isShowLine && <View style={{ ...styles.line, backgroundColor: colors.grayLight }} />}
        {!isEmpty(childTab) && childTab}
      </View>
    )
  }
  return (
    <View style={styles.header}>
      <View style={styles.containerHeader}>
        <View style={{ flexBasis: 100 }}>
          <Image source={icon_hamburger} style={styles.icHambuger} onPress={onToggleDrawer} />
        </View>
        <CustomText h5 customStyle={styles.txtFooter} semiBold>{title}</CustomText>
        {haveRightIcons && <View style={styles.containerIcons}>
          <Icon type='ionicon' name='notifications-outline' size={24} color={colors.noti_icon} style={{ marginEnd: Spacing.M }} />
          <Icon type='ionicon' name='ios-search' size={24} color={colors.noti_icon} />
        </View>}
      </View>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerContent: {
    flex: 1
  },
  containerHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.L,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerIcons: {
    flexDirection: 'row',
    flexBasis: 100,
    justifyContent: 'flex-end'
  },
  containerScreenHeader: {
    zIndex: 4,
    position: 'absolute',
    flexDirection: 'row',
    top: isIphoneX() ? STATUS_BAR_HEIGHT : scaleSize(0),
    right: 0,
    left: 0
  },
  containerIconBack: {
    marginStart: Spacing.M,
    flex: 0.47,
    alignSelf: 'baseline'
  },
  header: {
    paddingTop: Spacing.S,
    paddingHorizontal: Spacing.L,
  },
  icHambuger: {
    width: 24,
    height: 24,
  },
  txtFooter: {
    textAlign: 'center',
    color: colors.white,
    flexBasis: 100,
  },
  line: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 2,
  },
  txtHeader: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: Spacing.XXS,
    color: colors.white
  }
})

export default React.memo(Header)