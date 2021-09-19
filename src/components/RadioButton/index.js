import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Spacing } from '../../metrics';

const DEFAULT_SIZE_MULTIPLIER = 0.7
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2

const RadioButton = ({ size, innerColor, outerColor, isSelected, onPress, text = '', containerStyle = {}, textStyle = {} }) => {
  const outerStyle = {
    borderColor: outerColor,
    width: size + size * DEFAULT_SIZE_MULTIPLIER,
    height: size + size * DEFAULT_SIZE_MULTIPLIER,
    borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
    borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER
  }

  const innerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: innerColor, 
  }

  return (
    <TouchableOpacity style={{ ...styles.container, ...containerStyle }} onPress={onPress}>
      <View style={{ ...styles.radio, ...outerStyle }}>
        {isSelected && <View style={innerStyle} {...this.props} />}
      </View>
      <Text style={{ ...styles.textStyle }}>{text}</Text>
    </TouchableOpacity>
  )
}

RadioButton.propTypes = {
  text: PropTypes.string.isRequired,
  content: PropTypes.array,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  styles: PropTypes.object,
  isReady: PropTypes.bool,
  innerColor: PropTypes.string,
  outerColor: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object
}

RadioButton.defaultProps = {
  size: 16,
  innerColor: 'dodgerblue',
  outerColor: 'dodgerblue',
  isSelected: false,
  onPress: () => null
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginEnd: Spacing.S
  },
  textStyle: {
    fontSize: 20
  },
})

export default React.memo(RadioButton)