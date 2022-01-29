import React, { useReducer, createContext } from 'react';
import globalReducer from './reducer';

export const initialState = {
  lang: 'en',
  userInfo: null,
  messages: [],
  conversations: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}