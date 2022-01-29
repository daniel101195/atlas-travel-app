import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '~/context';
import { ScreenProps, MessageProps, UserProps } from '~/index';
import firestore from '@react-native-firebase/firestore';
import { onCheckRoomExist, onCreateNewRoom, onListenRoomChanged, onGetUserInfo, onCreateConversation } from '~/api';
import { redirect_comp } from '~/navigation/helper';
import { screens, stacks } from '~/navigation/screens';
import { isEmpty, isEqual } from 'lodash';

const useMessagingHooks = (props: ScreenProps) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [currenttUser,] = useState(state?.userInfo || {});
  const [isShowPopup, setShowPopup] = useState<Boolean>(false);

  const onToggleDrawer = (): void => {
    props?.navigation?.toggleDrawer?.();
  }

  const onNavigateConversation = (item: MessageProps): void => {
    redirect_comp(stacks.conversation.name, props?.navigation,
      screens.conversation.name, { roomInfo: item });
  }

  const onChangVisiblePopup = (value: Boolean = true): void => {
    setShowPopup(value);
  }

  const onPrepareData = (userInfo: UserProps): Object => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const { email: curentEmail, avatar, displayName } = currenttUser || {};
    const data = {
      createdAt: timestamp,
      updatedAt: timestamp,
      lastMessage: 'No last message ...',
      lastSeenBy: [curentEmail],
      lastSender: curentEmail,
      imageUrl: '',
      roomName: '',
      members: [curentEmail, email?.toLowerCase?.()],
      participants: [{
        email: curentEmail,
        avatar: avatar || 'https://firebasestorage.googleapis.com/v0/b/atlastravel-4c66e.appspot.com/o/avatars%2Favatar_2.png?alt=media&token=c3d665d1-5f44-46b1-aac3-49eb95dc5037',
        displayName
      },
      {
        email: email?.toLowerCase?.(),
        avatar: userInfo?.avatar || 'https://firebasestorage.googleapis.com/v0/b/atlastravel-4c66e.appspot.com/o/avatars%2Favatar_2.png?alt=media&token=c3d665d1-5f44-46b1-aac3-49eb95dc5037',
        displayName: userInfo?.displayName
      }]
    }
    return data;
  }

  const onCreateRoom = async (): Promise<void> => {
    if (isEmpty(email)) return;
    const isRoomExisted = await onCheckRoomExist({
      userEmail: currenttUser?.email?.toLowerCase(),
      participants: email.toLowerCase()
    });
    if (isRoomExisted) return alert('Room existed !');
    const userInfo = await onGetUserInfo({ email: email?.toLowerCase?.() }) as UserProps;
    if (isEmpty(userInfo)) return alert('User not existed !');
    const roomId = await onCreateNewRoom(onPrepareData(userInfo));
    const createdConver = await onCreateConversation({ id: roomId });
    !!createdConver && onChangVisiblePopup(false);
  }

  const onChangeEmail = (value: string): void => {
    if (isEmpty(value)) return;
    value !== email && setEmail(value);
  }

  //----------------------- Side Effects -----------------------

  useEffect(() => {
    onListenRoomChanged(currenttUser?.email, dispatch);
  }, [])

  useEffect(() => {
    !isEqual(state?.messages, messages) && setMessages(state?.messages);
  }, [state?.messages])

  return {
    currenttUser,
    messages,
    isShowPopup,
    email,
    onChangeEmail,
    onToggleDrawer,
    onNavigateConversation,
    onChangVisiblePopup,
    onCreateRoom
  }
}

export { useMessagingHooks }