import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { renderErrorMessage, renderSuccessMessage } from '../utils/helpers';
import { LocalizeString } from '../localize';
import { updateMessages, updateUserInfo } from '~/context/actions';
import { isEmpty } from 'lodash-es';
import { Platform } from 'react-native';

const ERRORS_FIREBASE = {
  'auth/user-not-found': LocalizeString.errorUserNotFound,
  'auth/wrong-password': LocalizeString.errorPasswordNotFound,
  'auth/email-already-in-use': LocalizeString.errorEmailAlreadyUsed,
  'auth/network-request-failed': LocalizeString.errorNetworkFailed,
  'auth/too-many-requests': LocalizeString.errorTooManyRequested,
  'unknown': LocalizeString.errorUnknown
}

const FIRESTORE_COLLECTIONS = {
  USERS: 'Users',
  MESSAGING: 'Messaging'
}

const STORAGE_PATH = {
  avatars: '/avatars'
}

const onAuthStateChanged = (callback = () => { }) => {
  return auth().onAuthStateChanged(callback);
}

const onSignIn = async ({ username = '', password = '' }) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then((result) => {
        result?.user && resolve(true);
      })
      .catch(error => {
        console.log('===>onSignIn: ', error, ERRORS_FIREBASE[error.code]);
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

const onGetUserInfo = async ({ email = '' }) => {
  const user = await firestore()
    .collection(FIRESTORE_COLLECTIONS.USERS)
    .doc(email)
    .get();
  return user.data();
}

const onSetUserInfo = ({ userInfo = {} }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(userInfo?.email)
      .set(userInfo)
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        console.log('===>onSetUserInfo: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      })
  })
}

const onUpdateUserInfo = ({ userInfo = {}, email }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.USERS)
      .doc(email)
      .update(userInfo)
      .then(() => {
        renderSuccessMessage(LocalizeString.titleUpdatedInfoSuccess);
        resolve(true);
      })
      .catch(error => {
        console.log('===>onUpdateUserInfo: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      })
  })
}

const onListentUserInfoChanged = (email, dispatch) => {
  if (!email) return;
  firestore()
    .collection(FIRESTORE_COLLECTIONS.USERS)
    .doc(email?.toString?.())
    .onSnapshot(documentSnapshot => {
      if (!documentSnapshot?.empty) {
        dispatch(updateUserInfo(documentSnapshot?.data?.()));
      }
    });
}

const onListenRoomChanged = (userEmail, dispatch) => {
  firestore()
    .collection(FIRESTORE_COLLECTIONS.MESSAGING)
    .where('participants', 'array-contains', userEmail)
    .onSnapshot(documentSnapshot => {
      if (!documentSnapshot?.empty) {
        const messages = [];
        documentSnapshot?.forEach?.(doc => messages.push({ ...doc.data(), id: doc.id }));
        dispatch(updateMessages(messages));
      }
    });
}

const onCheckRoomExist = ({ userEmail = '', participants = '' }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.MESSAGING)
      .where('participants', 'array-contains', userEmail)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot?.empty) {
          documentSnapshot?.forEach?.(doc => {
            const array = doc.data().participants;
            if (!isEmpty(array) && array?.includes?.(participants)) {
              resolve(true)
            }
          });
          resolve(false);
        }
      });
  });
}

const onCreateNewRoom = ({ data = {}, roomId = null }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.MESSAGING)
      .doc(roomId)
      .set(data)
      .then(() => {
        renderSuccessMessage(LocalizeString.titleCreateRoomSuccess);
        resolve(true);
      })
      .catch(error => {
        console.log('===>onCreateNewRoom: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      })
  });
}

const onUploadAvatar = async ({ image = {}, userName = '' }) => {
  if (isEmpty(image)) return;

  const { uri, type } = image;
  const fileType = type?.substr(type.indexOf('/') + 1, type.length - 1);
  const filename = `${userName?.toLowerCase?.()}_avatar.${fileType}`;
  const reference = storage().ref(`${STORAGE_PATH.avatars}/${filename}`);
  const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  await reference.putFile(uploadUri);
  renderSuccessMessage(LocalizeString.titleUploadAvatarSuccess);
  return filename;
}

const onGetAvatarUrl = async ({ imageName = '' }) => {
  if (isEmpty(imageName)) return;
  const reference = storage().ref(`${STORAGE_PATH.avatars}/${imageName}`);
  const url = await reference.getDownloadURL();
  return url;
}

export {
  FIRESTORE_COLLECTIONS, onSignIn, onSignUp, onUpdateUserProfile, onSignOut, onListenRoomChanged,
  onAuthStateChanged, onSetUserInfo, onGetUserInfo, onCheckRoomExist, onCreateNewRoom, onUploadAvatar,
  onGetAvatarUrl, onUpdateUserInfo, onListentUserInfoChanged
}