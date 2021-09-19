import auth from '@react-native-firebase/auth';
import { renderErrorMessage, renderSuccessMessage } from '../utils/helpers';
import { LocalizeString } from '../localize';

const ERRORS_FIREBASE = {
  'auth/user-not-found': LocalizeString.errorUserNotFound,
  'auth/wrong-password': LocalizeString.errorPasswordNotFound,
  'auth/email-already-in-use': LocalizeString.errorEmailAlreadyUsed,
  'unknown': LocalizeString.errorUnknown
}

const onAuthStateChanged = (callback = () => {}) => {
  return auth().onAuthStateChanged(callback);
}

const onSignIn = async ({ username = '', password = '' }) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        console.log('===>onSignIn: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
        reject(error);
      });
  })
}

const onSignUp = async ({ username = '', password = '' }) => {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(username, password)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        console.log('===>onSignUp: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
        reject(error);
      });
  })
}

const onUpdateUserProfile = async ({ updateProfile = {} }) => {
  return new Promise((resolve, reject) => {
    auth().currentUser?.updateProfile(updateProfile)
      .then(() => {
        renderSuccessMessage(LocalizeString.titleRegisterSuccess);
        resolve(true);
      })
      .catch(error => {
        console.log('===>onUpdateUserProfile: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
        reject(error);
      });
  })
}

const onSignOut = () => {
  return new Promise((resolve, reject) => {
    auth().signOut()
      .then(() => {
        renderSuccessMessage(LocalizeString.titleSignOutSuccess);
        resolve(true);
      })
      .catch(error => {
        console.log('===>onUpdateUserProfile: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      });
  })
}

export { onSignIn, onSignUp, onUpdateUserProfile, onSignOut, onAuthStateChanged }