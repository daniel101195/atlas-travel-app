import React, { ReactElement, useCallback } from "react";
import { ConversationScreenProps, ScreenProps } from '~/index';
import { FlatList, StyleSheet, View } from "react-native";
import { useConversationHooks } from './hooks';
import BubbleConversation from "./BubbleConversation";
import { MessageInput } from '~/components';
import { Spacing } from "~/metrics";

const Conversation: React.FC<ConversationScreenProps> = (props: ScreenProps): ReactElement => {
  const { conversations, userInfo: { email }, ref, onSendMessage, onContentSizeChange } = useConversationHooks(props);  

  const renderItem = useCallback(({ item }) => {
    return (
      <BubbleConversation item={item} email={email} />
    )
  }, [email])

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        onContentSizeChange={onContentSizeChange}
        style={{ marginBottom: Spacing.S }}
        showsVerticalScrollIndicator={false}
        data={conversations}
        keyExtractor={(item) => item?.id?.toString?.()}
        renderItem={renderItem}
      />
      <MessageInput onSend={onSendMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default React.memo(Conversation)