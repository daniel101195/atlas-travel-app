import Navigation from './src/navigation';
import React from 'react';
import { GlobalProvider } from './src/context';

const App = () => {
  return (
    <GlobalProvider>
      {Navigation()}
    </GlobalProvider>
  )
}

export default App