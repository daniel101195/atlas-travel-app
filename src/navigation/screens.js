import { LocalizeString } from '../localize';
import SignOut from '../screens/SignOut';
import { icon_discover, icon_log_out } from '../utils/images';

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
  signOut: {
    name: LocalizeString.titleSignOut
  }
}

const stacks = {
  authen: { 
    name: 'Authentication'
  },
  home: { 
    name: 'Home'
  }
}

const sideMenu = [
  {
    name: LocalizeString.titleDiscover,
    icon: icon_discover
  },
  {
    name: LocalizeString.titleSignOut,
    icon: icon_log_out,
    onPress: (navigation, state) => SignOut(navigation, state).onSignOut()
  }
]

export { screens, stacks, sideMenu }
