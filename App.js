import Navigation from './src/navigation';
import React, { useEffect } from 'react';
import { GlobalProvider } from './src/context';
import { updateLocaleDayJs } from '~/utils/time';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    updateLocaleDayJs();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('===>remoteMessage: ', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])

  return (
    <GlobalProvider>
      {Navigation()}
    </GlobalProvider>
  )
}

export default App