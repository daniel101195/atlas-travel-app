import * as actionType from '../actionTypes';

export const changeLanguage = (lang) => ({
  type: actionType.CHANGE_LANGUAGE,
  lang
})

export const updateUserInfo = (userInfo) => ({
  type: actionType.UPDATE_USER_INFO,
  userInfo
})