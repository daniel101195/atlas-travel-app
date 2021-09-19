import React from 'react';
import getIconType from './helper';

const Icon = ({ type, ...props }) => {
  const IconComponent = getIconType(type);

  return (
    <IconComponent {...props} />
  )
}

export default React.memo(Icon)