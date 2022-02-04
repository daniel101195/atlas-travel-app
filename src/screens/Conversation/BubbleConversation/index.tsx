import React, { ReactElement, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { BubbleConversationProps } from '~/index';
import { CustomText, Image } from '~/components';
import { Radius, scaleSize, Spacing } from "~/metrics";
import LinearGradient from 'react-native-linear-gradient';
import colors from "~/utils/colors";
import { ITEM_TYPES } from '~/utils/constants';
import { formatDate } from '~/utils/time';
import { FONT_14 } from "~/utils/spacing";
import HeaderSection from "../HeaderSection";

const BubbleConversation: React.FC<BubbleConversationProps> = ({ email = '', item }) => {
  const { isShowTimestamp, createdAt, sender, type, content } = item || {};
  const isSender = email === sender;

  const renderContent = useCallback((): ReactElement => {
    if (type === ITEM_TYPES.IMAGE) {
      return (
        <Image style={styles.image} source={content} />
      )
    }
    return (
      <CustomText customStyle={isSender ? styles.textSender : styles.textReceiver}>{content}</CustomText>
    )
  }, [type, content])

  const renderSenderBubble = useCallback((): ReactElement => {
    return (
      <View style={styles.containerSender}>
        {renderContent()}
      </View>
    )
  }, [item])

  const renderReceiverBubble = useCallback((): ReactElement => {
    return (
      <LinearGradient colors={colors.bgGradient} style={styles.containerReceiver}>
        {renderContent()}
      </LinearGradient>
    )
  }, [item])

  const renderHeader = useCallback((): ReactElement => {
    if (!isShowTimestamp) return null;
    return (
      <HeaderSection title={formatDate(createdAt.toDate?.())} />
    )
  }, [isShowTimestamp, createdAt])

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
    padding: Spacing.M,
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
    width: scaleSize(84),
    height: scaleSize(84),
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