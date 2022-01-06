import { LocalizeString } from '../localize';
import SignOut from '../screens/SignOut';
import { redirect } from '../navigation/helper';
import { icon_discover, icon_log_out, icon_explore, icon_messaging } from '../utils/images';

const screens = {
  dashboard: {
    name: LocalizeString.titleDashBoard
  },
  signIn: {
    name: LocalizeString.titleSignIn
  },
  signUp: {
    name: LocalizeString.titleSignUp
  },
  email: {
    name: LocalizeString.titleEmail
  },
  discover: {
    name: LocalizeString.titleDiscover
  },
  explore: {
    name: LocalizeString.titleExplore
  },
  messaging: {
    name: LocalizeString.titleMessage
  },
  signOut: {
    name: LocalizeString.titleSignOut
  },
  conversation: {
    name: LocalizeString.titleConversation
  }
}

const stacks = {
  authen: { 
    name: 'Authentication'
  },
  home: { 
    name: 'Home'
  },
  conversation: {
    name: 'Conversation'
  }
}

const sideMenu = [
  {
    name: LocalizeString.titleDiscover,
    icon: icon_discover,
    onPress: (navigation) => redirect(navigation, screens.discover.name)
  },
  {
    name: LocalizeString.titleExplore,
    icon: icon_explore,
    onPress: (navigation) => redirect(navigation, screens.explore.name)
  },
  {
    name: LocalizeString.titleMessage,
    icon: icon_messaging,
    onPress: (navigation) => redirect(navigation, screens.messaging.name)
  },
]

const sideMenuFooter = [
  {
    name: LocalizeString.titleSignOut,
    icon: icon_log_out,
    onPress: (navigation, state) => SignOut(navigation, state).onSignOut()
  }
]

export { screens, stacks, sideMenu, sideMenuFooter }
