import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText, Image } from '../components';
import { screens, stacks } from './screens';
import Dashboard from '../screens/Dashboard';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Email from '../screens/Email';
import Discover from '../screens/Discover';
import SignOut from '../screens/SignOut';
import colors from '../utils/colors';
import { Radius, Spacing } from '../metrics';
import { Icon } from '../components';
import FlashMessage from "react-native-flash-message";
import { LocalizeString } from '../localize';
import { GlobalContext } from '../context';

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

  const header = () =>  {
    const { avatar, email, username } = state?.userInfo || {};
    return (
      <View style={styles.containerHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar}/>
        <CustomText>{email}</CustomText>
      </View>
    )
  }

  const renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    )
  }

  const content = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        {header()}
        {renderSeparator()}
        <DrawerItem
          icon={() => <Icon name="exit-to-app" type='material-community' size={24} color={colors.grayMedium} />}
          label={screens.signOut.name}
          onPress={() => SignOut(props, state?.userInfo)}
        />
      </DrawerContentScrollView>
    )
  }

  return (
    <Drawer.Navigator initialRouteName={screens.discover.name} drawerContent={content}>
      <Drawer.Screen name={screens.discover.name} component={Discover} options={{
        title: LocalizeString.titleTraveling,
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
    paddingHorizontal: Spacing.L,
    marginBottom:  Spacing.L
  },
  avatar: {
    width:  56,
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
    height: Spacing.XXS,
    backgroundColor: colors.grayLight
  }
})

export default App