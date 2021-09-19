import React from 'react';
import { StyleSheet, View, Image } from "react-native";
import { BaseScreen, Button, CustomText } from '../../components';
import { ComponentSize, Radius, Spacing } from '../../metrics';
import colors from '../../utils/colors';
import { icon_send_email } from '../../utils/images';
import { LocalizeString } from '../../localize';
import useEmailHooks from './hooks';

const Email = (props) => {
  const { onConfirm } = useEmailHooks(props);

  renderHeader = () => {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.containerImage}>
          <Image source={icon_send_email} style={styles.image} resizeMode='contain' />
        </View>
      </View>
    )
  }

  renderBody = () => {
    return (
      <View style={styles.containerBody}>
        <CustomText h3 semiBold>{LocalizeString.titleSentEmail}</CustomText>
        <CustomText h5 customStyle={styles.txtBody}>{LocalizeString.titleSentEmailDesc}</CustomText>
      </View>
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.containerFooter}>
        <Button title={LocalizeString.titleGotIt} containerStyle={styles.btnGotIt} onPress={onConfirm}/>
      </View>
    )
  }

  return (
    <BaseScreen isGradient={false} containerStyle={styles.container} containerChldrenStyle={styles.containerChild}>
      <View style={styles.containerChildren}>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </View>
    </BaseScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  containerChild: { 
    justifyContent: 'center' 
  },
  containerBody: {
    flex: 1,
    marginTop: Spacing.XL,
    alignItems: 'center'
  },
  containerFooter: {
    marginTop: Spacing.M,
    marginBottom: - (ComponentSize.buttonHeight / 2),
  },
  containerChildren: {
    backgroundColor: colors.white,
    flex: 0.35,
    borderRadius: Radius.M,
    marginHorizontal: Spacing.L,
    paddingHorizontal: Spacing.M,
    paddingTop: Spacing.L,
    alignItems: 'center',
  },
  containerImage: {
    borderRadius: Radius.L * 3,
    borderWidth: 4,
    borderColor: 'rgba(94, 104, 112, 0.5)',
    padding: Spacing.S,
    marginTop: Spacing.XL,
  },
  image: {
    width: 64,
    height: 64
  },
  iconBack: {
    flex: 0.5
  },
  txtBody: {
    marginTop: Spacing.M
  },
  btnGotIt: {
    width: 120,
  }
})

export default Email