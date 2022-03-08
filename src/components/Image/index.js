import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { memoDeepEqual } from '../../utils/helpers';

const Image = ({ style = {}, source = '', headers = {}, isLocal = true, onPress, tintColor = '',
  priority = FastImage.priority.normal, resizeMode = FastImage.resizeMode.contain }) => (

  onPress && typeof onPress === 'function' ?
    <TouchableOpacity onPress={onPress}>
      <FastImage
        style={{ ...style }}
        tintColor={tintColor}
        source={isLocal ? source : {
          uri: source,
          headers,
          priority
        }}
        resizeMode={resizeMode}
      />
    </TouchableOpacity> :
    <View>
      {source ? <FastImage
        style={{ ...style }}
        tintColor={tintColor}
        source={isLocal ? source : {
          uri: source,
          headers,
          priority
        }}
        resizeMode={resizeMode}
      /> : <ActivityIndicator style={style} size='small' color='white'/>}
    </View>
)

export default memoDeepEqual(Image)