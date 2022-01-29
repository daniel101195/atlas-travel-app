import { useContext, useEffect, useRef } from "react";
import { ScreenProps } from '~/index';
import { renderHeaderLeft } from '~/utils/helpers';
import {
  onGetConversations, onSendMessage as onSendMessageAPI,
  updateLastMessage, updateLastSeen
} from '~/api';
import { GlobalContext } from '~/context';
import { updateConversations } from '~/context/actions';
import firestore from '@react-native-firebase/firestore';
import { ITEM_TYPES } from '~/utils/constants';
import { nanoid } from 'nanoid/non-secure';

const useConversationHooks = (props: ScreenProps) => {
  let unsubscribe = null;
  const ref = useRef(null);
  const { state: { conversations, userInfo }, dispatch } = useContext(GlobalContext);
  const { participants, id: roomId, imageUrl, roomName, lastSeenBy } = props.route.params?.roomInfo;
  const participant = participants?.filter(user => user?.email !== userInfo?.email)?.[0];
  const roomImage = imageUrl || participant?.avatar;

  const setHeader = () => {
    props?.navigation?.setOptions?.({
      headerTransparent: false,
      headerTitle: null,
      headerTintColor: 'white',
      headerLeft: () => renderHeaderLeft({
        imageUrl: roomImage,
        onPressBack: () => { 
          props?.navigation?.canGoBack?.() && props?.navigation?.goBack?.()
        },
        roomName: roomName || participant?.displayName
      })
    });
  }

  const onSendMessage = (message: string): void => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const messageData = {
      id: nanoid(),
      content: message,
      sender: userInfo?.email,
      createdAt: timestamp,
      updatedAt: timestamp,
      type: ITEM_TYPES.TEXT
    };
    onSendMessageAPI({ roomId: roomId, message: messageData });
    dispatch(updateConversations([...conversations, messageData]));
    updateLastMessage({ roomId, lastMessage: message, lastSender: userInfo?.email });
    updateLastSeen({ roomId, lastSeen: [userInfo?.email] });
  }

  const onLoadMessages = (): void => {
    unsubscribe = onGetConversations({ roomId, dispatch });
  }

  const onUpdateLastSeen = (): void => {
    const newLastSeen = [...lastSeenBy, userInfo?.email]
    updateLastSeen({ roomId, lastSeen: newLastSeen });
  }

  const onContentSizeChange = (): void => {
    ref?.current?.scrollToEnd?.()
  }

  //---------------------- side effects ----------------------

  useEffect(() => {
    setHeader();
    onLoadMessages();
    onUpdateLastSeen();
    return () => {
      dispatch(updateConversations([]));
    }
  }, [])

  useEffect(() => {
    return () => unsubscribe();
  }, [unsubscribe])

  return {
    ref,
    conversations,
    userInfo,
    onSendMessage,
    onContentSizeChange
  }
}

export { useConversationHooks }