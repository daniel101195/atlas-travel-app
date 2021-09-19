import { LocalizeString } from '../localize';

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

export { screens, stacks }
