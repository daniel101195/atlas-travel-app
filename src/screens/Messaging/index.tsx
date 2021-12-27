import React, { ReactElement, useCallback } from "react";
import { memoDeepEqual } from "~/utils/helpers";
import { MessagingProps } from '~/index';
import { BaseScreen, Header } from '../../components';
import { FlatList, StyleSheet } from "react-native";
import { useMessagingHooks } from './hooks';
import { ScreenProps } from '~/index';
import { LocalizeString } from "~/localize";
import colors from "~/utils/colors";
import { Spacing } from "~/metrics";
import { scaleSize } from "~/utils/spacing";
import ItemMessage from './Item';

const Messaging: React.FC<MessagingProps> = (props: ScreenProps): ReactElement => {
  const { currenttUser, messages, onToggleDrawer } = useMessagingHooks(props);

  const renderListMessaging = useCallback((): ReactElement => {
    return (
      <FlatList
        data={messages}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <ItemMessage item={item} email={currenttUser?.email}/>}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }, [messages])

  return (
    <BaseScreen
      isShowFloating={true}
      isGradient={false}
      onPressFloating={() => { }}
      header={<Header
        onToggleDrawer={onToggleDrawer}
        isDarkStyle={true}
        isShowLine={true}
        title={LocalizeString.titleMessage} />
      }>
      {renderListMessaging()}
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  containerContent: {
    flex: 1
  },
  contentContainer: {
    paddingHorizontal: Spacing.L,
    paddingTop: Spacing.M
  },
  containerItem: {
    marginBottom: Spacing.L,
    flexDirection: 'row'
  },
  containerIndicator: {
    width: scaleSize(14),
    height: scaleSize(14),
    borderRadius: scaleSize(7),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scaleSize(6),
    right: 0
  },
  roomImage: {
    width: scaleSize(46),
    height: scaleSize(46),
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

export default memoDeepEqual(Messaging)