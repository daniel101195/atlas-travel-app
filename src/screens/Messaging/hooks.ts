import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '~/context';
import { ScreenProps, MessageProps } from '~/index';
import firestore from '@react-native-firebase/firestore';
import { onCheckRoomExist, onCreateNewRoom, onListenRoomChanged } from '~/api';
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
    redirect_comp(stacks.conversation.name, props?.navigation, screens.conversation.name, {
      roomId: item.id
    });
  }

  const onChangVisiblePopup = (value: Boolean = true): void => {
    setShowPopup(value);
  }

  const onPrepareData = (): Object => {
    const timestamp = firestore.FieldValue.serverTimestamp();
    const { email: curentEmail } = currenttUser || {};
    const data = {
      createdAt: timestamp,
      updatedAt: timestamp,
      lastMessage: 'What is last message ?',
      lastSeenBy: curentEmail,
      lastSender: curentEmail,
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/atlastravel-4c66e.appspot.com/o/avatars%2Favatar_2.png?alt=media&token=c3d665d1-5f44-46b1-aac3-49eb95dc5037',
      roomName: 'Example Room Name 1',
      participants: [curentEmail, email?.toLowerCase?.()]
    }
    return data;
  }

  const onCreateRoom = async (): Promise<void> => {
    if (isEmpty(email)) return;
    const isExisted = await onCheckRoomExist({
      userEmail: currenttUser?.email,
      participants: email.toLowerCase()
    });
    isExisted ? alert('Existed123!!!') : onCreateNewRoom({ data: onPrepareData() });
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