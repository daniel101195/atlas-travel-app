import React, { useCallback, useRef, useState } from "react";
import { MessageInputProps, ImageProps } from '~/index';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from "~/utils/colors";
import Image from '~/components/Image';
import { FONT_16, scaleSize } from "~/utils/spacing";
import { Radius, Spacing } from "~/metrics";
import { btn_send_message, icon_gallery } from '~/utils/images';
import { LocalizeString } from '~/localize';
import { isEmpty } from 'lodash';
import { MESSAGE_TYPE } from '~/utils/constants';
import { onGetImageFromLibrary } from "~/utils/media";

const MessageInput: React.FC<MessageInputProps> = ({ onSend = (value: string | ImageProps, messageType: string) => {} }) => {
  const [text, setText] = useState<string>('');
  const ref = useRef(null);

  const onChangeText = useCallback((value: string): void => {
    value !== text && setText(value);
  }, [text])

  const onSendMessage = useCallback(() => {
    if (isEmpty(text)) return;
    onSend(text, MESSAGE_TYPE.TEXT);
    ref?.current?.clear?.();
  }, [text, ref])

  const onChooseGallery = useCallback(async () => {
    const image  = await onGetImageFromLibrary({ fileQuality: 0.7 });
    !isEmpty(image) && onSend(image, MESSAGE_TYPE.IMAGE);
  }, [])

  return (
    <View style={{ ...styles.container, ...styles.shadow }}>
      <TextInput ref={ref} style={styles.input} placeholder={LocalizeString.titleTypeSomething} onChangeText={onChangeText} />
      <Image onPress={onChooseGallery} source={icon_gallery} style={styles.btnImage} />
      <Image onPress={onSendMessage} source={btn_send_message} style={styles.btnSend} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMessageInput,
    height: scaleSize(42),
    marginBottom: Spacing.L,
    marginHorizontal: Spacing.L,
    borderRadius: Radius.XL,
    paddingHorizontal: Spacing.M,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    width: scaleSize(250),
    fontSize: FONT_16,
    fontFamily: 'Montserrat-Medium'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnSend: {
    width: scaleSize(68),
    height: scaleSize(68),
    marginTop: Spacing.XS,
    marginEnd: Spacing.M
  },
  btnImage: {
    width: scaleSize(20),
    height: scaleSize(20)
  }
})

export default React.memo(MessageInput)