import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '~/context';
import { ScreenProps } from '~/index';
import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '~/api';
import { redirect_comp } from '~/navigation/helper';
import { screens, stacks } from '~/navigation/screens';

const useMessagingHooks = (props: ScreenProps) => {
  const { state } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);
  const [currenttUser, ] = useState(state?.userInfo || {});

  const onToggleDrawer = (): void => {
    props?.navigation?.toggleDrawer?.();
  }

  const onListenMessages = (): void => {
    firestore().collection(FIRESTORE_COLLECTIONS.MESSAGING)
      .where('participants', 'array-contains', currenttUser?.email)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.empty) {
          const messages = [];
          documentSnapshot.forEach(doc => messages.push(doc.data()));
          setMessages(messages);
        }
      });
  }

  const onNavigateConversation = (): void => {
    redirect_comp(stacks.conversation.name, props?.navigation, screens.conversation.name);
  }

  //----------------------- Side Effects -----------------------

  useEffect(() => {
    onListenMessages();
  }, [])

  return {
    currenttUser,
    messages,
    onToggleDrawer,
    onNavigateConversation
  }
}

export { useMessagingHooks }