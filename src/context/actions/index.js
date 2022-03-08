import * as actionType from '../actionTypes';

export const changeLanguage = (lang) => ({
  type: actionType.CHANGE_LANGUAGE,
  lang
})

export const updateUserInfo = (userInfo) => ({
  type: actionType.UPDATE_USER_INFO,
  userInfo
})

export const updateMessages = (messages) => ({
  type: actionType.UPDATE_MESSAGES,
  messages
})

export const updateConversations = (conversations) => ({
  type: actionType.UPDATE_CONVERSARTIONS,
  conversations
})

export const loadMoreConversation = (conversations) => ({
  type: actionType.LOAD_MORE_CONVERSATIONS,
  conversations
})

export const clearConversation = () => ({
  type: actionType.CLEAR_CONVERSARTIONS
})

export const addNewMessage = (newMessage) => ({
  type: actionType.ADD_NEW_MESSAGE,
  newMessage
})

export const updateFCMToken = (token) => ({
  type: actionType.UPDATE_FCM_TOKEN,
  token
})