import React, { ReactElement, useCallback } from "react";
import { StyleSheet, View, Animated, } from "react-native";
import { BubbleConversationProps } from '~/index';
import { CustomText, Image } from '~/components';
import { Radius, scaleSize, Spacing } from "~/metrics";
import LinearGradient from 'react-native-linear-gradient';
import colors from "~/utils/colors";
import { MESSAGE_TYPE } from '~/utils/constants';
import { formatDate } from '~/utils/time';
import { FONT_14 } from "~/utils/spacing";
import HeaderSection from "../HeaderSection";

const BubbleConversation: React.FC<BubbleConversationProps> = ({ email = '', item }) => {
  const { isShowTimestamp, createdAt, sender, type, content, timeStamp } = item || {};
  const isSender = email === sender;
  const animatedValue = new Animated.Value(0);

  const renderContent = useCallback((): ReactElement => {
    if (type === MESSAGE_TYPE.IMAGE) {
      return (
        <Image style={styles.image} source={content} isLocal={false} resizeMode='cover' />
      )
    }
    return (
      <CustomText customStyle={isSender ? styles.textSender : styles.textReceiver}>{content}</CustomText>
    )
  }, [type, content, isSender, animatedValue])

  const renderSenderBubble = useCallback((): ReactElement => {
    const isImage = type === MESSAGE_TYPE.IMAGE;
    return (
      <View style={{ ...styles.containerSender, padding: isImage ? scaleSize(0) : Spacing.M }}>
        {renderContent()}
      </View>
    )
  }, [content, type, isSender])

  const renderReceiverBubble = useCallback((): ReactElement => {
    const isImage = type === MESSAGE_TYPE.IMAGE;
    return (
      <LinearGradient
        colors={colors.bgGradient}
        style={{
          ...styles.containerReceiver,
          padding: isImage ? scaleSize(0) : Spacing.M
        }}>
        {renderContent()}
      </LinearGradient>
    )
  }, [content, type, isSender])

  const renderHeader = useCallback((): ReactElement => {
    if (!isShowTimestamp && !timeStamp) return null;
    return (
      <HeaderSection title={timeStamp ? formatDate(timeStamp) : formatDate(createdAt.toDate?.())} />
    )
  }, [isShowTimestamp, createdAt, timeStamp])

  return (
    <View>
      {renderHeader()}
      {isSender ? renderSenderBubble() : renderReceiverBubble()}
    </View>
  )
}

const styles = StyleSheet.create({
  containerSender: {
    marginHorizontal: Spacing.M,
    backgroundColor: colors.bgSenderBubble,
    borderRadius: Radius.S,
    alignSelf: 'flex-end',
    marginVertical: Spacing.S
  },
  containerReceiver: {
    marginHorizontal: Spacing.M,
    padding: Spacing.M,
    borderRadius: Radius.S,
    alignSelf: 'baseline',
    marginVertical: Spacing.S
  },
  image: {
    width: scaleSize(120),
    height: scaleSize(120),
    borderRadius: Radius.S
  },
  textReceiver: {
    color: colors.white,
    fontSize: FONT_14
  },
  textSender: {
    fontSize: FONT_14,
    textAlign: 'center'
  },
  txtUpdatedAt: {
    fontSize: scaleSize(9),
    marginTop: Spacing.S
  }
})

export default React.memo(BubbleConversation)