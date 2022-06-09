import {PROPERTY_TYPES} from '@babel/types';
import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';

export const TextInputCom = props => {
  let width = props?.width ? props.width : wp('90');
  let height = props?.height ? props.height : hp('6');
  return (
    <>
      <Text
        style={{
          ...styles.inputtext,
          color: props?.isFocused == true ? color.textSecondaryColor : 'white',
        }}>
        {props?.inputText}
      </Text>
      <TextInput
        style={{
          ...styles.textinput,
          width: width,
          height: height,
          borderColor:
            props?.isFocused == true
              ? color.textSecondaryColor
              : color.themeColorDark,
          borderWidth: props?.isFocused == true ? 2 : 1,
        }}
        placeholder={props?.placeholder}
        placeholderTextColor={color.themeColorDark}
        keyboardType={props?.keyboardType}
        editable={props?.editable}
        onChangeText={props?.onChangeText}
        value={props?.value}
        onFocus={props?.onFocus}
        onBlur={props?.onBlur}
        autoCapitalize={props?.autoCapitalize}
      />
    </>
  );
};
