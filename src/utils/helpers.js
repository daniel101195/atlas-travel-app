import { isEqual } from 'lodash';
import { memo } from 'react';
import { Dimensions } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

const getSccreenWidth = () => {
  return Dimensions.get('window').width;
}

const getSccreenHeight = () => {
  return Dimensions.get('window').height;
}

const renderSuccessMessage = (message = '', type = 'success') => {
  showMessage({
    message,
    type,
  });
}

const renderErrorMessage = (message = '', type = 'danger') => {
  showMessage({
    message,
    type,
  });
}

const memoDeepEqual = component => {
  return memo(component, (prevProps, nextProps) => isEqual(prevProps, nextProps));
};

export { getSccreenWidth, getSccreenHeight, renderErrorMessage, renderSuccessMessage, memoDeepEqual }