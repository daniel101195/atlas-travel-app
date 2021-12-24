import { isEmpty } from 'lodash-es';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';
import { memoDeepEqual } from '../../utils/helpers';

const ImageBackground = ({ source = '', resizeMode = FastImage.resizeMode.cover,
  headers = {}, priority = FastImage.priority.normal, style = {} }) => {

  return (
    <FastImage
      style={{ ...style }}
      resizeMode={resizeMode}
      source={{
        uri: isEmpty(source?.uri) ? Image.resolveAssetSource(source)?.uri : source.uri,
        headers,
        priority
      }} />
  )
}

export default memoDeepEqual(ImageBackground)