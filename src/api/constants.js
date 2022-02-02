import { LocalizeString } from '~/localize';

export const ERRORS_FIREBASE = {
  'auth/user-not-found': LocalizeString.errorUserNotFound,
  'auth/wrong-password': LocalizeString.errorPasswordNotFound,
  'auth/email-already-in-use': LocalizeString.errorEmailAlreadyUsed,
  'auth/network-request-failed': LocalizeString.errorNetworkFailed,
  'auth/too-many-requests': LocalizeString.errorTooManyRequested,
  'unknown': LocalizeString.errorUnknown
}

export const FIRESTORE_COLLECTIONS = {
  USERS: 'Users',
  MESSAGING: 'Messaging',
  CONVERSATION: 'Conversation',
  MESSAGES: 'Messages'
}

export const STORAGE_PATH = {
  avatars: '/avatars'
}

export const QUERY_CONFIG = {
  LIMIT: 25
}