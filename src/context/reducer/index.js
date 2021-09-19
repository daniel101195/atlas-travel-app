import * as actionType from '../actionTypes';
import { initialState } from '../index';

const globalReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionType.CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.lang
      }
    case actionType.UPDATE_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo
      }
    }
    default: return state
  }
}

export default globalReducer
