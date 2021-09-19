import React from 'react';
import { Switch } from 'react-native';

const Toggle = ({ onValueChange, value, trackColor, ...props }) => {

  return (
    <Switch onValueChange={onValueChange} value={value} trackColor={trackColor} {...props} />
  )
}

export default React.memo(Toggle)