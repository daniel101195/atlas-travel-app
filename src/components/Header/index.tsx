import React from "react";
import { HeaderProps } from '~/index';
import { CustomText, Icon, Image } from '..';
import { StyleSheet, View } from "react-native";
import { Spacing } from '../../metrics';
import { icon_hamburger } from '../../utils/images';
import colors from "~/utils/colors";


const Header: React.FC<HeaderProps> = ({ onToggleDrawer = () => null, title = '', haveRightIcons = true }) => {
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
})

export default React.memo(Header)