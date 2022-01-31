import { useContext, useEffect, useRef } from "react";
import { ScreenProps, GroupConversationProps } from '~/index';
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
import { formatDate } from '~/utils/time';
import colors from "~/utils/colors";
import { cloneDeep } from "lodash-es";

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
      headerTintColor: colors.white,
      headerLeft: () => renderHeaderLeft({
        imageUrl: roomImage,
        onPressBack: () => props?.navigation?.canGoBack?.() && props?.navigation?.goBack?.(),
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
    onSendMessageAPI({ roomId, message: messageData });
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
    ref?.current?.getScrollResponder()?.scrollToEnd?.()
    const lastSender = conversations?.[conversations.length - 1]?.sender;
    lastSender !== userInfo?.email && onUpdateLastSeen();
  }

  const onGroupConversation = (key: string = 'createdAt'): Array<GroupConversationProps> => {
    const cloneConversation = cloneDeep(conversations);
    const arr = [];

    cloneConversation.forEach(element => {
      element.createdAt = formatDate(element?.createdAt?.toDate?.());
    });

    const obj = cloneConversation.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

    for (const property in obj) {
      arr.push({ title: property, data: obj[property] });
    }
    return arr;
  };

  //---------------------- side effects ----------------------

  useEffect(() => {
    onLoadMessages();
    setHeader();
    return () => {
      unsubscribe();
      dispatch(updateConversations([]));
    }
  }, [])

  return {
    ref,
    conversations,
    userInfo,
    onSendMessage,
    onContentSizeChange,
    onGroupConversation
  }
}

export { useConversationHooks }