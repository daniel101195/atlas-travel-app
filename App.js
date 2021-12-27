import Navigation from './src/navigation';
import React, { useEffect } from 'react';
import { GlobalProvider } from './src/context';
import { updateLocaleDayJs } from '~/utils/time';

const App = () => {

  useEffect(() => {
    updateLocaleDayJs();
  }, [])

  return (
    <GlobalProvider>
      {Navigation()}
    </GlobalProvider>
  )
}

export default App