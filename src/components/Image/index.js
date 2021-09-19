import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const Image = ({ style = {}, source = '', headers = {}, isLocal = true, onPress,
  priority = FastImage.priority.normal, resizeMode = FastImage.resizeMode.contain }) => (

  onPress && typeof onPress === 'function' ?
    <TouchableOpacity onPress={onPress}>
      <FastImage
        style={{ ...style }}
        source={isLocal ? source : {
          uri: source,
          headers,
          priority
        }}
        resizeMode={resizeMode}
      />
    </TouchableOpacity> : <FastImage
      style={{ ...style }}
      source={isLocal ? source : {
        uri: source,
        headers,
        priority
      }}
      resizeMode={resizeMode}
    />
)

export default React.memo(Image)