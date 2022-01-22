import React, { ReactElement, useCallback } from "react";
import { memoDeepEqual } from "~/utils/helpers";
import { MessagingProps } from '~/index';
import { BaseScreen, Header, FloatingButton, Popup, CustomText, Input, Icon, Button } from '~/components';
import { FlatList, StyleSheet, View } from "react-native";
import { useMessagingHooks } from './hooks';
import { ScreenProps } from '~/index';
import { LocalizeString } from "~/localize";
import colors from "~/utils/colors";
import { Radius, Spacing } from "~/metrics";
import { scaleSize } from "~/utils/spacing";
import ItemMessage from './Item';

const Messaging: React.FC<MessagingProps> = (props: ScreenProps): ReactElement => {
  const { currenttUser, messages, isShowPopup, email, onChangeEmail, 
    onCreateRoom, onToggleDrawer, onNavigateConversation, onChangVisiblePopup } = useMessagingHooks(props);

  const renderListMessaging = useCallback((): ReactElement => {
    return (
      <FlatList
        data={messages}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) =>
          <ItemMessage
            onNavigateConversation={onNavigateConversation}
            item={item}
            email={currenttUser?.email} />}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }, [messages])

  const renderFloatingButton = useCallback(() => {
    return (
      <FloatingButton onPress={onChangVisiblePopup} />
    )
  }, [])

  const renderPopup = useCallback(() => {
    if (!isShowPopup) return null;
    return (
      <Popup onPress={() => onChangVisiblePopup(false)}>
        <View style={styles.containerCreateRoom}>
          <View style={{ flexDirection: 'row' }}>
            <CustomText h4 customStyle={styles.headerPopup}>
              {LocalizeString.titleCreateRoom?.toUpperCase?.()}</CustomText>
            <Icon
              type='material-community'
              name='close'
              size={scaleSize(24)}
              color={colors.grayMedium}
              onPress={() => onChangVisiblePopup(false)} />
          </View>
          <Input autoFocus placeholder={LocalizeString.titleEmail} onChangeText={onChangeEmail} />
          <Button containerStyle={styles.btnCreateRoom} title={LocalizeString.titleCreate} onPress={onCreateRoom} />
        </View>
      </Popup>
    )
  }, [isShowPopup, email])

  return (
    <BaseScreen
      isShowFloating={true}
      isGradient={false}
      renderPopup={renderPopup}
      header={<Header
        onToggleDrawer={onToggleDrawer}
        isDarkStyle={true}
        isShowLine={true}
        title={LocalizeString.titleMessage} />
      }>
      {renderListMessaging()}
      {renderFloatingButton()}
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
  containerCreateRoom: {
    backgroundColor: colors.white,
    borderRadius: Radius.M,
    marginHorizontal: Spacing.M,
    padding: Spacing.M,
    alignItems: 'center'
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
  },
  headerPopup: {
    flex: 1,
    textAlign: 'center',
    marginEnd: -scaleSize(24)
  },
  btnCreateRoom: {
    marginTop: Spacing.L * 3,
  }
})

export default memoDeepEqual(Messaging)