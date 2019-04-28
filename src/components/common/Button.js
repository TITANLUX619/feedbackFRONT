import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ customOnPress, children }) => {
  const { textStyle, buttonStyle } = styles;


  return (
    <TouchableOpacity onPress={customOnPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#df5151',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#df5151',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
