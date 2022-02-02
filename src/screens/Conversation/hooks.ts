import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing } from 'react-native';
import { ScreenProps, GroupConversationProps } from '~/index';
import { renderHeaderLeft } from '~/utils/helpers';
import {
  onGetConversations, onSendMessage as onSendMessageAPI,
  updateLastMessage, updateLastSeen, onLoadMoreConversation
} from '~/api';
import { GlobalContext } from '~/context';
import { loadMoreConversation, updateConversations } from '~/context/actions';
import firestore from '@react-native-firebase/firestore';
import { ITEM_TYPES } from '~/utils/constants';
import { nanoid } from 'nanoid/non-secure';
import { formatDate } from '~/utils/time';
import colors from "~/utils/colors";
import { cloneDeep } from "lodash-es";
import { scaleSize } from "~/metrics";

let MAX_HEIGHT = 0;

const useConversationHooks = (props: ScreenProps) => {
  let unsubscribe = null;
  const ref = useRef(null);
  const animationFlex = useRef(new Animated.Value(0)).current;
  const [loadMore, setLoadMore] = useState(false);
  const [isEndReached, setEndReached] = useState(true);

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
    updateLastMessage({ roomId, lastMessage: message, lastSender: userInfo?.email, updatedAt: timestamp });
    updateLastSeen({ roomId, lastSeen: [userInfo?.email] });
  }

  const onLoadMessages = (): void => {
    unsubscribe = onGetConversations({ roomId, dispatch });
  }

  const onUpdateLastSeen = (): void => {
    const newLastSeen = [...lastSeenBy, userInfo?.email];
    updateLastSeen({ roomId, lastSeen: newLastSeen });
  }

  const onContentSizeChange = (): void => {
    isEndReached && onScrollToBottom();
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

  const onScrollToBottom = () => {
    ref?.current?.getScrollResponder()?.scrollToEnd?.();
  }

  const onScrollEndDrag = (event): void => {
    const { contentOffset: { y: scrollOffset }} = event?.nativeEvent || {};
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
      unsubscribe();
      dispatch(updateConversations([]));
    }
  }, [])

  useEffect(() => {
    onAnimatedIconBottom();
  }, [isEndReached])

  return {
    ref,
    conversations,
    userInfo,
    loadMore,
    isEndReached,
    animationFlex,
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