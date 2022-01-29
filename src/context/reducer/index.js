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
    case actionType.UPDATE_MESSAGES: {
      return {
        ...state,
        messages: action.messages
      }
    }
    case actionType.UPDATE_CONVERSARTIONS: {
      if (!!action.conversations && !!state.conversations &&
        action.conversations?.length > 0 && state.conversations.length > 0) {

        const lastId = action.conversations[action.conversations.length - 1].id;
        const id = state.conversations[state.conversations.length - 1].id;
        return {
          ...state,
          conversations: lastId === id && !!id ?
            state.conversations :
            action.conversations
        }
      } else {
        return {
          ...state,
          conversations: action.conversations
        }
      }
    }
    default: return state
  }
}

export default globalReducer
