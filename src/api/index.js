import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { renderErrorMessage, renderSuccessMessage } from '../utils/helpers';
import { LocalizeString } from '../localize';
import { updateMessages, updateUserInfo, updateConversations } from '~/context/actions';
import { isEmpty } from 'lodash';
import { Platform } from 'react-native';
import { ConversationProps } from '~/index';
import { ERRORS_FIREBASE, FIRESTORE_COLLECTIONS, STORAGE_PATH, QUERY_CONFIG } from './constants';

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
    .where('members', 'array-contains', userEmail)
    .onSnapshot(documentSnapshot => {
      const messages = [];
      documentSnapshot?.forEach?.(doc => messages.push({ ...doc.data(), id: doc.id }));
      dispatch(updateMessages(messages));
    });
}

const onCheckRoomExist = ({ userEmail = '', participants = '' }) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.MESSAGING)
      .where('members', 'array-contains', userEmail)
      .onSnapshot(documentSnapshot => {
        let isExist = false;
        documentSnapshot?.forEach?.(doc => {
          isExist = doc.data()?.members?.includes?.(participants);
        });
        resolve(isExist);
      });
  });
}

const onCreateNewRoom = (data = {}) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.MESSAGING)
      .add(data)
      .then((resp) => {
        renderSuccessMessage(LocalizeString.titleCreateRoomSuccess);
        resolve(resp.id);
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

const onCreateConversation = ({ id = '' }) => {
  if (isEmpty(id)) return false;
  return new Promise((resolve, reject) => {
    firestore()
      .collection(FIRESTORE_COLLECTIONS.CONVERSATION)
      .doc(id)
      .set({})
      .then(() => {
        resolve(true);
      })
      .catch(error => {
        console.log('===>onCreateConversation: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      })
  })
}

const onGetConversations = ({ roomId = '', dispatch }) => {
  if (isEmpty(roomId) || !dispatch) return [];
  const subscriber = firestore()
    .collection(FIRESTORE_COLLECTIONS.CONVERSATION)
    .doc(roomId)
    .collection(FIRESTORE_COLLECTIONS.MESSAGES)
    .orderBy('createdAt')
    .limitToLast(QUERY_CONFIG.LIMIT)
    .onSnapshot(snapshot => {
      const messages = [];
      snapshot?.docs?.forEach?.(documentSnapshot => {
        messages.push(documentSnapshot.data());
      });
      dispatch(updateConversations(messages));
    });
  return subscriber;
}

const onGetConversationsInitial = ({ roomId = '' }) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(roomId)) resolve([]);
    firestore()
      .collection(FIRESTORE_COLLECTIONS.CONVERSATION)
      .doc(roomId)
      .collection(FIRESTORE_COLLECTIONS.MESSAGES)
      .orderBy('createdAt')
      .limitToLast(QUERY_CONFIG.LIMIT)
      .get()
      .then((snapshot) => {
        const messages = [];
        snapshot?.docs?.forEach?.(documentSnapshot => {
          messages.push(documentSnapshot.data());
        });
        resolve(messages);
      })
      .catch(error => {
        console.log('===>onGetConversationsInitial: ', error);
        error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
      });
  })
}

const onLoadMoreConversation = ({ roomId = '', createdAt }) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(roomId) || isEmpty(createdAt)) resolve([]);
    firestore()
    .collection(FIRESTORE_COLLECTIONS.CONVERSATION)
    .doc(roomId)
    .collection(FIRESTORE_COLLECTIONS.MESSAGES)
    .orderBy('createdAt')
    .endBefore(createdAt)
    .limitToLast(QUERY_CONFIG.LIMIT)
    .get()
    .then((snapshot) => {
      const messages = [];
      snapshot?.docs?.forEach?.(documentSnapshot => {
        messages.push(documentSnapshot.data());
      });
      resolve(messages);
    })
    .catch(error => {
      console.log('===>onLoadMoreConversation: ', error);
      error?.code && renderErrorMessage(ERRORS_FIREBASE[error.code]);
    })
  })
}

const onSendMessage = ({ message = {}, roomId = '' }) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(message) || isEmpty(roomId)) resolve(false);
    firestore()
      .collection(FIRESTORE_COLLECTIONS.CONVERSATION)
      .doc(roomId)
      .collection(FIRESTORE_COLLECTIONS.MESSAGES)
      .add(message)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.log('===>onSendMessage: ', error);
      })
  })
}

const updateLastMessage = ({ roomId = '', lastMessage = '', lastSender = '', updatedAt }) => {
  firestore()
    .collection(FIRESTORE_COLLECTIONS.MESSAGING)
    .doc(roomId)
    .update({
      lastMessage: lastMessage,
      lastSender: lastSender,
      updatedAt
    })
    .catch((error) => {
      console.log('===>onSendMessage: ', error);
    })
}

const updateLastSeen = ({ roomId = '', lastSeen = [] }) => {
  firestore()
    .collection(FIRESTORE_COLLECTIONS.MESSAGING)
    .doc(roomId)
    .update({
      lastSeenBy: lastSeen
    })
    .catch((error) => {
      console.log('===>updateLastSeen: ', error);
    })
}

export {
  FIRESTORE_COLLECTIONS, onSignIn, onSignUp, onUpdateUserProfile, onSignOut, onListenRoomChanged,
  onAuthStateChanged, onSetUserInfo, onGetUserInfo, onCheckRoomExist, onCreateNewRoom, onUploadAvatar,
  onGetAvatarUrl, onUpdateUserInfo, onListentUserInfoChanged, onGetConversations, onSendMessage,
  onCreateConversation, updateLastMessage, updateLastSeen, onLoadMoreConversation, onGetConversationsInitial
}