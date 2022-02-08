import React, { ReactElement, useCallback } from "react";
import { ConversationScreenProps, ScreenProps } from '~/index';
import { StyleSheet, View, Animated, FlatList } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useConversationHooks } from './hooks';
import BubbleConversation from "./BubbleConversation";
import { Icon, MessageInput } from '~/components';
import { scaleSize, Spacing } from "~/metrics";

const Conversation: React.FC<ConversationScreenProps> = (props: ScreenProps): ReactElement => {
  const { userInfo: { email }, ref, conversations, loadMore, isEndReached, animationFlex,
    onSendMessage, onContentSizeChange, onGroupConversation, onScrollToBottom,
    onLoadMore, onScroll, onEndReached, onScrollEndDrag } = useConversationHooks(props);

  const renderItem = useCallback(({ item }): ReactElement => {
    return (
      <BubbleConversation item={item} email={email} />
    )
  }, [])

  const renderIconScrollDown = useCallback((): ReactElement => {
    return (
      <View style={styles.containerScroll}>
        <Animated.View
          style={{
            ...styles.containerScrollBottom,
            transform: [
              {
                translateY: animationFlex.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, scaleSize(40)],
                  extrapolate: "clamp",
                })
              },
            ],
            opacity: animationFlex.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
              extrapolate: "clamp",
            })
          }}>
          <TouchableOpacity onPress={onScrollToBottom}>
            <Icon name='arrow-circle-down' type='material' size={scaleSize(32)} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }, [isEndReached, ref, animationFlex])

  const renderInput = useCallback((): ReactElement => {
    return (
      <MessageInput onSend={onSendMessage} />
    )
  }, [conversations])

  return (
    <View style={styles.container}>
      {conversations.length > 0 ?
        // <SectionList
        //   ref={ref}
        //   style={styles.containerConversation}
        //   onEndReachedThreshold={0}
        //   scrollEventThrottle={500}
        //   refreshing={loadMore}
        //   contentContainerStyle={styles.containerContent}
        //   showsVerticalScrollIndicator={false}
        //   stickySectionHeadersEnabled={false}
        //   keyExtractor={(item, index) => item?.updatedAt + index}
        //   onScrollEndDrag={onScrollEndDrag}
        //   onScroll={onScroll}
        //   sections={onGroupConversation()}
        //   onContentSizeChange={onContentSizeChange}
        //   onEndReached={onEndReached}
        //   onRefresh={onLoadMore}
        //   renderItem={renderItem}
        //   renderSectionHeader={renderSectionHeader} />
        <FlatList
          ref={ref}
          data={onGroupConversation()}
          style={styles.containerConversation}
          onEndReachedThreshold={0}
          scrollEventThrottle={500}
          refreshing={loadMore}
          contentContainerStyle={styles.containerContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.id}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={onScroll}
          onContentSizeChange={onContentSizeChange}
          onEndReached={onEndReached}
          onRefresh={onLoadMore}
          renderItem={renderItem} />
        : <View style={styles.container} />}
      {renderIconScrollDown()}
      {renderInput()}
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
  },
  containerScroll: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "transparent"
  },
  containerScrollBottom: {
    paddingBottom: Spacing.S,
    position: 'absolute',
    zIndex: 999,
    bottom: Spacing.M
  }
})

export default React.memo(Conversation)