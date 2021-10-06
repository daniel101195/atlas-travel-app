import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { logo, login_bg } from '~/utils/images';
import colors from '~/utils/colors';
import { Spacing, Radius, FontSize } from '~/metrics';
import Buttons from './Buttons';
import { BaseScreen } from '~/components';
import useDashboardHooks from './hooks';
import { LocalizeString } from '~/localize';
import { memoDeepEqual } from '~/utils/helpers';

const Dashboard = (props) => {
  const { onNavigateLogin, onNavigateSignUp, onChangeLanguage } = useDashboardHooks(props);

  return (
    <BaseScreen urlImageBg={login_bg}>
      <View style={styles.containerContent}>
        <View style={{ ...styles.containerLogo, ...styles.containerShadow }}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>{LocalizeString.titleApp.toUpperCase()}</Text>
        <Text style={styles.subTitle}>{LocalizeString.titleAppDesc}</Text>
        <Buttons onLogin={onNavigateLogin} onSignUp={onNavigateSignUp} />
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: {
    backgroundColor: colors.bgIcon,
    borderRadius: Radius.XL - Radius.S,
    padding: Spacing.L
  },
  containerContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    paddingTop: 120,
    alignItems: 'center'
  },
  containerShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    resizeMode: 'cover'
  },
  logo: {
    width: 64,
    height: 64
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: FontSize.H4,
    marginTop: Spacing.XL,
    color: colors.white,
    letterSpacing: 4
  },
  subTitle: {
    fontFamily: 'Parisienne-Regular',
    fontSize: FontSize.H3 * 2,
    marginTop: Spacing.XXS,
    color: colors.white,
    letterSpacing: 4,
    flex: 0.9
  }
})

export default memoDeepEqual(Dashboard)