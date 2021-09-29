import React from 'react';
import FastImage from 'react-native-fast-image';
import { memoDeepEqual } from '../../utils/helpers';

const ImageBackground = ({ source = '', resizeMode = FastImage.resizeMode.cover,
  headers = {}, priority = FastImage.priority.normal, style = {} }) => {

  return (
    <FastImage
      style={{ ...style }}
      resizeMode={resizeMode}
      source={{
        uri: source,
        headers,
        priority
      }} />
  )
}

export default memoDeepEqual(ImageBackground)