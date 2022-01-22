import { useEffect, useState } from "react";
import { ScreenProps } from '~/index';
import { renderHeaderLeft } from '~/utils/helpers';

const data = [
  {
    id: '1',
    content: 'Message 111111111',
    sender: 'viet@gmail.com',
    createdAt: '',
    updatedAt: ''
  },
  {
    id: '2',
    content: 'Message 222222222222222222',
    sender: 'viet@gmail.com',
    createdAt: '',
    updatedAt: ''
  }
]

const useConversationHooks = (props: ScreenProps) => {
  console.log('===>props: ', props?.route?.params?.roomId);
  const [convers, setConvers] = useState(data);

  const setHeader = () => {
    props?.navigation?.setOptions?.({
      headerTransparent: false,
      headerTitle: null,
      headerTintColor: 'white',
      headerLeft: () => renderHeaderLeft({
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/atlastravel-4c66e.appspot.com/o/avatars%2Favatar_2.png?alt=media&token=c3d665d1-5f44-46b1-aac3-49eb95dc5037',
        onPressBack: () => props?.navigation?.canGoBack?.() && props?.navigation?.goBack?.(),
        roomName: 'Elya Griffin'
      })
    });
  }

  const onSendMessage = (message: String): void => {

  }

  //---------------------- side effects ----------------------

  useEffect(() => {
    setHeader();
  }, [])

  return {
    convers,
    onSendMessage
  }
}

export { useConversationHooks }