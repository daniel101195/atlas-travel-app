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

const BubbleConversation: React.FC<BubbleConversationProps> = ({ email = '', item }) => {
  const isSender = email === item?.sender;

  const renderTimestamp = useCallback(() => {
    return (
      <CustomText customStyle={isSender ? styles.txtUpdatedAt : { ...styles.textReceiver, ...styles.txtUpdatedAt }}>
        {formatDate(item?.updatedAt?.toDate?.(), 'DD-MM-YY')}
      </CustomText>
    )
  }, [])

  const renderContent = useCallback((): ReactElement => {
    if (item?.type === ITEM_TYPES.IMAGE) {
      return (
        <Image style={styles.image} source={item?.content} />
      )
    }
    return (
      <CustomText customStyle={isSender ? styles.textSender : styles.textReceiver}>{item?.content}</CustomText>
    )
  }, [item?.type, item?.content])

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

  return (
    isSender ? renderSenderBubble() : renderReceiverBubble()
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