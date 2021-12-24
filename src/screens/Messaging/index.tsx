import React, { ReactElement, useCallback } from "react";
import { memoDeepEqual } from "~/utils/helpers";
import { MessagingProps } from '~/index';
import { CustomText, BaseScreen, Image, Header } from '../../components';
import { FlatList, StyleSheet, View } from "react-native";
import { useMessagingHooks } from './hooks';
import { ScreenProps } from '~/index';
import { LocalizeString } from "~/localize";
import colors from "~/utils/colors";
import { Spacing } from "~/metrics";

const Messaging: React.FC<MessagingProps> = (props: ScreenProps): ReactElement => {
  const { messages, onToggleDrawer, onLoadMessaging } = useMessagingHooks(props);

  const renderItemMessage = ({ item, index }) => {
    console.log('===>item: ', item);
    
    return (
      <View style={styles.containerItem}>
        <CustomText h3 customStyle={{ color: colors.white }}>{item?.roomName}</CustomText>
      </View>
    )
  }

  const renderListMessaging = useCallback((): ReactElement => {
    return (
      <FlatList
        data={messages}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItemMessage}
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }, [messages])

  return (
    <BaseScreen
      isShowFloating={true}
      onPressFloating={onLoadMessaging}
      header={<Header
        onToggleDrawer={onToggleDrawer}
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
    paddingHorizontal: Spacing.L
  },
  containerItem: {
    marginVertical: Spacing.L
  }
})

export default memoDeepEqual(Messaging)