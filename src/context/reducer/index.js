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
    case actionType.LOAD_MORE_CONVERSATIONS: {
      return {
        ...state,
        conversations: action.conversations
      }
    }
    case actionType.UPDATE_CONVERSARTIONS: {
      if (state.conversations.length === 0) {
        return {
          ...state,
          conversations: action.conversations
        }
      } else {
        const lastMessage = action.conversations?.[action.conversations.length - 1];
        const lastMessage2 = state.conversations?.[state.conversations.length - 1];
        return {
          ...state,
          conversations: lastMessage?.id !== lastMessage2?.id ?
            state.conversations.concat(lastMessage) :
            state.conversations
        }
      }
    }
    case actionType.ADD_NEW_MESSAGE: {
      const index = state.conversations.findIndex(element => element.id === action.newMessage.id);
      if (index !== -1) {
        state.conversations[index] = action.newMessage;
        return {
          ...state,
          conversations: [...state.conversations]
        }
      }
      return {
        ...state,
        conversations: state.conversations.concat(action.newMessage)
      }
    }
    case actionType.CLEAR_CONVERSARTIONS: {
      return {
        ...state,
        conversations: []
      }
    }
    case actionType.UPDATE_FCM_TOKEN: {
      return {
        ...state,
        userInfo: { ...state.userInfo, fcmToken: action.token }
      }
    }
    default: return state
  }
}

export default globalReducer
