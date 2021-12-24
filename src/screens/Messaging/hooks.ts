import { useEffect, useState } from 'react';
import { ScreenProps } from '~/index';
import { onGetUserMessaging } from '../../api';

const useMessagingHooks = (props: ScreenProps) => {
  const [messages, setMessages] = useState();

  const onToggleDrawer = (): void => {
    props?.navigation?.toggleDrawer?.();
  }

  const onLoadMessaging = async (): Promise<void> => {
    const result = await onGetUserMessaging();
    setMessages(result);
  }

  //----------------------- Side Effects -----------------------

  useEffect(() => {
    onLoadMessaging();
  }, [])

  return {
    messages,
    onToggleDrawer,
    onLoadMessaging
  }
}

export { useMessagingHooks }