import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing } from 'react-native';
import { ScreenProps, ConversationProps, ImageProps } from '~/index';
import { renderHeaderLeft } from '~/utils/helpers';
import {
  onGetConversations, onSendMessage as onSendMessageAPI, onGetImageUrl,
  updateLastMessage, updateLastSeen, onLoadMoreConversation, onUploadImageConversation
} from '~/api';
import { GlobalContext } from '~/context';
import { loadMoreConversation, clearConversation, addNewMessage } from '~/context/actions';
import firestore from '@react-native-firebase/firestore';
import { nanoid } from 'nanoid/non-secure';
import colors from "~/utils/colors";
import { scaleSize } from "~/metrics";
import { cloneDeep } from "lodash";
import { STORAGE_PATH } from "~/api/constants";
import { MESSAGE_TYPE } from '~/utils/constants';
import { LocalizeString } from "~/localize";

let MAX_HEIGHT = 0;
let unsubscribe;
const INTERVAL_MESSAGE = 300000;

const useConversationHooks = (props?: ScreenProps) => {
  const ref = useRef(null);
  const animationFlex = useRef(new Animated.Value(0)).current;
  const [loadMore, setLoadMore] = useState(false);
  const [isEndReached, setEndReached] = useState(true);

  const { state: { conversations, userInfo }, dispatch } = useContext(GlobalContext);
  const { participants, id: roomId, imageUrl, roomName } = props?.route?.params?.roomInfo;
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

  const onSendMessage = async (message: string | ImageProps, messageType: string): Promise<void> => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const messageData = {
      id: nanoid(),
      sender: userInfo?.email,
      createdAt: timestamp,
      updatedAt: timestamp,
      content: null,
      type: messageType
    };
    if (messageType === MESSAGE_TYPE.TEXT) {
      messageData.content = message;
    } else if (messageType === MESSAGE_TYPE.IMAGE) {
      dispatch(addNewMessage({ ...messageData, timeStamp: new Date() }));
      const imageName = await onUploadImageConversation({
        image: message,
        roomName: roomId.toString() + '_' + Date.now().toString()
      });
      messageData.content = await onGetImageUrl({ imageName, path: STORAGE_PATH.conversations });
    }
    if (!messageData.content) return;
    dispatch(addNewMessage({ ...messageData }));
    onSendMessageAPI({ roomId, message: messageData });
    updateLastMessage({
      roomId,
      lastMessage: messageType === MESSAGE_TYPE.TEXT ? message : userInfo?.displayName + ' ' + LocalizeString.titleLastImage,
      lastSender: userInfo?.email,
      updatedAt: timestamp
    });
    updateLastSeen({ roomId, lastSeen: [userInfo?.email] });
  }

  const onLoadMessages = (): void => {
    unsubscribe = onGetConversations({ roomId, dispatch });
  }

  const onUpdateLastSeen = (): void => {
    updateLastSeen({ roomId, lastSeen: [participant?.email, userInfo?.email] });
  }

  const onContentSizeChange = (): void => {
    isEndReached && onScrollToBottom();
  }

  // Using this func for Section List
  // const onGroupConversation_2 = (key: string = 'createdAt'): Array<GroupConversationProps> => {
  //   const cloneConversation = cloneDeep(conversations);
  //   const arr = [];

  //   cloneConversation.forEach(element => {
  //     element.createdAt = formatDate(element?.createdAt?.toDate?.());
  //   });

  //   const obj = cloneConversation.reduce(function (rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});

  //   for (const property in obj) {
  //     arr.push({ title: property, data: obj[property] });
  //   }
  //   return arr;
  // };

  const onGroupConversation = (): Array<ConversationProps> => {
    const cloneArray = cloneDeep(conversations);
    for (let index = 0; index < cloneArray.length; index++) {
      if (index > 0) {
        const element = cloneArray[index];
        const prevElement = cloneArray[index - 1];
        if (element && prevElement) {
          element.timestamp = element?.createdAt?.toDate?.();
          prevElement.timestamp = prevElement?.createdAt?.toDate?.();
          element.isShowTimestamp = Date.parse(element.timestamp) - Date.parse(prevElement.timestamp) >= INTERVAL_MESSAGE;
        }
      }
    }
    return cloneArray;
  };

  const onLoadMore = (): void => {
    setLoadMore(true);
    const createdAt = conversations?.[0]?.createdAt;
    onLoadMoreConversation({ roomId, createdAt }).then((data) => {
      dispatch(loadMoreConversation([...data, ...conversations]));
      setLoadMore(false);
    });
  }

  const onEndReached = (): void => {
    !isEndReached && setEndReached(true);
  }

  const onScroll = (event): void => {
    const { contentSize: { height }, layoutMeasurement: { height: H } } = event?.nativeEvent || {};
    MAX_HEIGHT = height - H;
  }

  const onScrollToBottom = (): void => {
    setTimeout(() => {
      ref.current?.scrollToEnd?.();
    }, 50);
  }

  const onScrollEndDrag = (event): void => {
    const { contentOffset: { y: scrollOffset } } = event?.nativeEvent || {};
    +MAX_HEIGHT - +scrollOffset > scaleSize(56) && isEndReached && setEndReached(false);
  }

  const onAnimatedIconBottom = (): void => {
    Animated.timing(animationFlex, {
      toValue: isEndReached ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }

  //---------------------- side effects ----------------------

  useEffect(() => {
    onLoadMessages();
    setHeader();
    return () => {
      unsubscribe?.();
      dispatch(clearConversation());
    }
  }, [])

  useEffect(() => {
    onAnimatedIconBottom();
  }, [isEndReached])

  useEffect(() => {
    if (conversations?.length > 0 && !!userInfo) {
      const lastSender = conversations?.[conversations.length - 1]?.sender;
      lastSender !== userInfo?.email && onUpdateLastSeen();
    }
  }, [conversations, userInfo])

  return {
    ref,
    conversations,
    userInfo,
    loadMore,
    isEndReached,
    animationFlex,
    roomId,
    onSendMessage,
    onContentSizeChange,
    onGroupConversation,
    onLoadMore,
    onEndReached,
    onScroll,
    onScrollToBottom,
    onScrollEndDrag
  }
}

export { useConversationHooks }