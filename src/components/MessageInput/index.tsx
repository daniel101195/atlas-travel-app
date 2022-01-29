import React, { useCallback, useRef, useState } from "react";
import { MessageInputProps } from '~/index';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from "~/utils/colors";
import Image from '../Image';
import { FONT_16, scaleSize } from "~/utils/spacing";
import { Radius, Spacing } from "~/metrics";
import { btn_send_message } from '~/utils/images';
import { LocalizeString } from '~/localize';

const MessageInput: React.FC<MessageInputProps> = ({ onSend = (value: string) => {} }) => {
  const [text, setText] = useState<string>('');
  const ref = useRef(null);

  const onChangeText = useCallback((value: string): void => {
    value !== text && setText(value);
  }, [text])

  const onSendMessage = useCallback(() => {
    onSend(text);
    ref?.current?.clear?.();
  }, [text, ref])

  return (
    <View style={{ ...styles.container, ...styles.shadow }}>
      <TextInput ref={ref} style={styles.input} placeholder={LocalizeString.titleTypeSomething} onChangeText={onChangeText}/>
      <TouchableOpacity onPress={onSendMessage}>
        <Image source={btn_send_message} style={styles.btnSend}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMessageInput,
    height: scaleSize(40),
    marginBottom: Spacing.L,
    marginHorizontal: Spacing.L,
    borderRadius: Radius.XL,
    paddingHorizontal: Spacing.M,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    width: scaleSize(268),
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
    marginTop: Spacing.XS
  }
})

export default React.memo(MessageInput)