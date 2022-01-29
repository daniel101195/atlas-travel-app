import React from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText, Image } from '~/components';
import { Radius, Spacing } from "~/metrics";
import { ItemMessageProps } from '~/index';
import { scaleSize } from "~/utils/spacing";
import colors from "~/utils/colors";
import { timeSince } from '~/utils/time';

const ItemMessage: React.FC<ItemMessageProps> = ({ email = '', item = {}, onNavigateConversation }) => {
  const timeago = timeSince(new Date(item?.updatedAt?.seconds * 1000))
  const isSeen = item?.lastSeenBy?.includes?.(email);
  const participants = item?.participants?.filter(user => user?.email !== email)?.[0];
  const roomName = item?.roomName || participants?.displayName;

  return (
    <TouchableOpacity style={styles.containerItem} onPress={() => onNavigateConversation(item)}>
      <View style={styles.containerLeft}>
        <Image isLocal={false} source={item?.imageUrl || participants?.avatar} style={styles.roomImage} resizeMode={'cover'}/>
        {!isSeen && <View style={styles.containerIndicator}>
          <View style={styles.unreadIndicator} />
        </View>}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.containerHeader}>
          <CustomText numLine={1} semiBold h4 customStyle={{ ...styles.roomTitle, marginEnd: Spacing.XS }}>{roomName}</CustomText>
          <CustomText customStyle={{ ...styles.roomTitle, flex: 0.4 }} numLine={1}>{timeago}</CustomText>
        </View>
        <CustomText customStyle={styles.lastMessage}>{item?.lastMessage}</CustomText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    marginBottom: Spacing.L,
    flexDirection: 'row'
  },
  containerLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: Spacing.M
  },
  containerHeader: {
    justifyContent: "space-between",
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  containerIndicator: {
    width: scaleSize(14),
    height: scaleSize(14),
    borderRadius: scaleSize(7),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scaleSize(1),
    right: -scaleSize(5)
  },
  roomImage: {
    width: scaleSize(46),
    height: scaleSize(46),
    borderRadius: Radius.M
  },
  roomTitle: {
    color: colors.mediumBlack,
    marginBottom: Spacing.XXS
  },
  lastMessage: {
    color: colors.grayMedium,
    marginEnd: Spacing.L
  },
  unreadIndicator: {
    width: scaleSize(10),
    height: scaleSize(10),
    borderRadius: scaleSize(5),
    backgroundColor: colors.red,
  }
})

export default React.memo(ItemMessage)