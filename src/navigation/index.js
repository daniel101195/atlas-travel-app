import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText, Image, Button } from '../components';
import { screens, stacks, sideMenu, sideMenuFooter } from './screens';
import Dashboard from '../screens/Dashboard';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Email from '../screens/Email';
import Discover from '../screens/Discover';
import Explore from '../screens/Explore';
import colors from '../utils/colors';
import { Radius, Spacing } from '../metrics';
import { scaleSize } from '../utils/spacing';
import { STATUS_BAR_HEIGHT, isIphoneX } from '../utils/dimensions';
import { Icon } from '../components';
import FlashMessage from "react-native-flash-message";
import { LocalizeString } from '../localize';
import { GlobalContext } from '../context';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = ({ navigation }, otherOpts) => ({
  headerTitleStyle: styles.headerTitle,
  headerTransparent: true,
  headerLeft: () => renderCloseIcon(navigation),
  headerTitleAlign: 'center',
  ...otherOpts
})

const renderCloseIcon = ({ canGoBack, goBack }) => {
  return (
    canGoBack ?
      <TouchableOpacity onPress={goBack} style={styles.iconBack}>
        <Icon name="close" size={24} color={colors.bgIcon} />
      </TouchableOpacity> : null
  )
}

const MainStackNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name={stacks.authen.name}
          component={AuthenticationStackNavigation}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name={stacks.home.name}
          component={MainDrawerNavigation}
          options={{
            headerShown: false
          }} />
      </Stack.Navigator>
      <FlashMessage position='top' />
    </View>
  )
}

const AuthenticationStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.dashboard.name}
        component={Dashboard}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name={screens.signIn.name}
        component={SignIn}
        options={(navigation) => screenOptions(navigation)} />
      <Stack.Screen
        name={screens.signUp.name}
        component={SignUp}
        options={(navigation) => screenOptions(navigation)} />
      <Stack.Screen
        name={screens.email.name}
        component={Email}
        options={(navigation) => screenOptions(navigation, { headerShown: false })} />
    </Stack.Navigator>
  )
}

const MainDrawerNavigation = () => {
  const { state } = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();

  const renderHeader = useCallback(() => {
    const { photoURL, email, displayName } = state?.userInfo || {};
    return (
      <View style={styles.containerHeader}>
        <Image source={{ uri: photoURL }} style={styles.avatar} />
        <View style={styles.containerText}>
          <CustomText bold h3 customStyle={{ color: colors.black }}>{displayName}</CustomText>
          <CustomText>{email}</CustomText>
          <Button onPress={() => { }} buttonStyle={styles.btnEdit} title={LocalizeString.titleEdit} />
        </View>
      </View>
    )
  }, [state])

  const renderSeparator = useCallback(() => {
    return (
      <View style={styles.separator} />
    )
  }, [])

  const renderBody = useCallback(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';
    return (
      <View style={{ marginTop: Spacing.M, flex: 0.7 }}>
        {sideMenu.map((item, index) => {
          const isFocused = routeName === item.name;
          const gradient = isFocused ? colors.bgGradient : colors.bgTransparent;
          return (
            <TouchableOpacity key={index.toString()} onPress={() => item?.onPress(navigation, state)}>
              <LinearGradient
                colors={gradient}
                style={styles.containerDrawerItem(isFocused)}>
                <Image tintColor={isFocused ? colors.white : colors.grayLight} source={item.icon} style={styles.iconMenu} />
                <CustomText h5 customStyle={{ color: isFocused ? colors.white : colors.gray }}>{item.name}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }, [route, sideMenu])

  const renderFooter = useCallback(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || '';
    return (
      <View style={{ marginTop: Spacing.M, flex: 0.3 }}>
        {sideMenuFooter.map((item, index) => {
          const isFocused = routeName === item.name;
          const gradient = isFocused ? colors.bgGradient : colors.bgTransparent;
          return (
            <TouchableOpacity key={index.toString()} onPress={() => item?.onPress(navigation, state)}>
              <LinearGradient
                colors={gradient}
                style={styles.containerDrawerItem(isFocused)}>
                <Image tintColor={isFocused ? colors.white : colors.grayLight} source={item.icon} style={styles.iconMenu} />
                <CustomText h5 customStyle={{ color: isFocused ? colors.white : colors.gray }}>{item.name}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }, [sideMenuFooter, route])

  const content = (props) => {
    return (
      <View style={{ flex: 1 }} {...props}>
        {renderHeader()}
        {renderBody()}
        {renderSeparator()}
        {renderFooter()}
      </View>
    )
  }

  return (
    <Drawer.Navigator initialRouteName={screens.discover.name} drawerContent={content}>
      <Drawer.Screen name={screens.discover.name} component={Discover} options={{
        headerShown: false
      }} />
      <Drawer.Screen name={screens.explore.name} component={Explore} options={{
        headerShown: false
      }} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      {MainStackNavigation()}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    paddingTop: STATUS_BAR_HEIGHT * 2.5,
    alignItems: 'center',
    backgroundColor: colors.bgHeader,
    marginTop: - STATUS_BAR_HEIGHT
  },
  containerText: {
    marginTop: Spacing.S,
    alignItems: 'center'
  },
  containerDrawerItem: (isFocused = false) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.XS,
    marginHorizontal: Spacing.M,
    paddingStart: Spacing.S,
    height: scaleSize(48),
    borderRadius: Radius.S
  }),
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: Spacing.S
  },
  headerTitle: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: Spacing.XXS,
    color: colors.white,
    alignSelf: 'center'
  },
  iconBack: {
    marginStart: Spacing.M
  },
  separator: {
    height: Spacing.XS,
    marginBottom: Spacing.S,
    marginHorizontal: Spacing.XL * 2,
    borderRadius: Radius.M,
    backgroundColor: colors.grayVeryLight
  },
  btnEdit: {
    height: scaleSize(32),
    paddingHorizontal: Spacing.S,
    marginTop: Spacing.L,
    marginBottom: Spacing.XL
  },
  iconMenu: {
    width: scaleSize(24),
    height: scaleSize(24),
    marginEnd: Spacing.M,
  }
})

export default App