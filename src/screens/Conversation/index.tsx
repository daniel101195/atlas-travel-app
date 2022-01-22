import React, { ReactElement } from "react";
import { memoDeepEqual } from "~/utils/helpers";
import { ConversationProps, ScreenProps } from '~/index';
import { FlatList, StyleSheet, View } from "react-native";
import { useConversationHooks } from './hooks';
import { MessageInput } from '~/components';

const Conversation: React.FC<ConversationProps> = (props: ScreenProps): ReactElement => {
  const { convers, onSendMessage } = useConversationHooks(props);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={convers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          if (item.sender === 'viet@gmail.com') {
            return (
              <View>

              </View>
            )
          } else {
            return (
              <View>

              </View>
            )
          }
        }}
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

export default memoDeepEqual(Conversation)