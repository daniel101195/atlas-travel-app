import React, { ReactElement, useCallback } from "react";
import { ConversationScreenProps, ScreenProps } from '~/index';
import { StyleSheet, View, SectionList } from "react-native";
import { useConversationHooks } from './hooks';
import BubbleConversation from "./BubbleConversation";
import HeaderSection from "./HeaderSection";
import { MessageInput } from '~/components';
import { Spacing } from "~/metrics";

const Conversation: React.FC<ConversationScreenProps> = (props: ScreenProps): ReactElement => {
  const { userInfo: { email }, ref, conversations,
    onSendMessage, onContentSizeChange, onGroupConversation } = useConversationHooks(props);

  const renderItem = useCallback(({ item }) => {
    return (
      <BubbleConversation item={item} email={email} />
    )
  }, [])

  const renderSectionHeader = useCallback(({ section: { title } }) => {
    return (
      <HeaderSection title={title}/>
    )
  }, [])
  
  return (
    <View style={styles.container}>
      {conversations.length > 0 ? <SectionList
        ref={ref}
        sections={onGroupConversation()}
        style={styles.containerConversation}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item?.updatedAt + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader} /> : <View style={styles.container} />}
      <MessageInput onSend={onSendMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerConversation: {
    marginBottom: Spacing.S
  },
  containerContent: {
    paddingTop: Spacing.S
  }
})

export default React.memo(Conversation)