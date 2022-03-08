import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useCallback, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText, Image, Button } from '~/components';
import { screens, stacks, sideMenu, sideMenuFooter } from './screens';
import Dashboard from '~/screens/Dashboard';
import SignIn from '~/screens/SignIn';
import SignUp from '~/screens/SignUp';
import Email from '~/screens/Email';
import Discover from '~/screens/Discover';
import Explore from '~/screens/Explore';
import colors from '~/utils/colors';
import { Radius, Spacing, scaleSize } from '~/metrics';
import { STATUS_BAR_HEIGHT } from '../utils/dimensions';
import FlashMessage from "react-native-flash-message";
import { LocalizeString } from '~/localize';
import { GlobalContext } from '~/context';
import LinearGradient from 'react-native-linear-gradient';
import Messaging from '~/screens/Messaging';
import Conversation from '~/screens/Conversation';
import {
  onUploadAvatar, onGetImageUrl, onUpdateUserInfo,
  onListentUserInfoChanged, getFCMToken, subscribeCloudMessage
} from '~/api';
import { onGetImageFromLibrary } from '~/utils/media';
import { isEmpty } from 'lodash';
import { screenOptions } from './helper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
        <Stack.Screen
          name={stacks.conversation.name}
          component={ConversationStack}
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screens.dashboard.name}
        component={Dashboard}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name={screens.signIn.name}
        component={SignIn}
        options={screenOptions} />
      <Stack.Screen
        name={screens.signUp.name}
        component={SignUp}
        options={screenOptions} />
      <Stack.Screen
        name={screens.email.name}
        component={Email}
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
  )
}

const ConversationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.conversation.name}
        component={Conversation}
        options={screenOptions}
      />
    </Stack.Navigator>
  )
}

const onChangeAvatar = async (email, displayName) => {
  const image = await onGetImageFromLibrary({ fileQuality: 0.7 });
  if (isEmpty(image)) return;
  const imageName = await onUploadAvatar({ image, userName: displayName });
  const url = await onGetImageUrl({ imageName });
  onUpdateUserInfo({ userInfo: { avatar: url }, email });
}

const MainDrawerNavigation = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();

  const updateFCMToken = (email) => {
    if (isEmpty(email)) return;
    getFCMToken().then(token => {
      !isEmpty(token) && state.fcmToken !== token &&
        onUpdateUserInfo({ userInfo: { fcmToken: token }, email, shouldShowMessage: false });
    });
  }

  useEffect(() => {
    const userEmail = state?.userInfo?.email;
    const unsubscribe = subscribeCloudMessage();
    onListentUserInfoChanged(userEmail, dispatch);
    updateFCMToken(userEmail);
    return unsubscribe;
  }, [])

  const renderHeader = useCallback(() => {
    const { avatar, email = '', displayName = '' } = state?.userInfo || {};
    return (
      <View style={styles.containerHeader}>
        <Image
          source={{ uri: avatar || 'https://hungrygen.com/wp-content/uploads/2019/11/placeholder-male-square.png' }}
          style={styles.avatar} resizeMode='cover' />
        <View style={styles.containerText}>
          <CustomText bold h3 customStyle={{ color: colors.black }}>{displayName}</CustomText>
          <CustomText>{email}</CustomText>
          <Button onPress={() => onChangeAvatar(email, displayName)} buttonStyle={styles.btnEdit} title={LocalizeString.titleEditAvatar} />
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
      <Drawer.Screen name={screens.messaging.name} component={Messaging} options={{
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
    width: scaleSize(64),
    height: scaleSize(64),
    borderRadius: scaleSize(32),
    marginBottom: Spacing.S
  },
  headerTitle: {
    fontFamily: 'Montserrat-Medium',
    letterSpacing: Spacing.XXS,
    color: colors.white
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