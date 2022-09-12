import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TextInputCom = props => {
  let width = props?.width ? props.width : wp('90');
  let height = props?.height ? props.height : hp('6');
  return (
    <>
      <Text
        style={{
          ...styles.inputtext,
          color:
            props?.isFocused == true
              ? color.textSecondaryColor
              : props?.value != ''
              ? color.white
              : color.themeColorDark,
        }}>
        {props?.inputText}
      </Text>
      <View
        style={{
          ...styles.inputView,
          width: width,
          borderColor:
            props?.isFocused == true
              ? color.textSecondaryColor
              : props?.value != ''
              ? color.white
              : color.themeColorDark,
          borderWidth: props?.isFocused == true ? 2 : 1,
          height: height,
        }}>
        <TextInput
          style={{
            color: 'white',
            fontSize: hp('2'),
            width: wp('76'),
          }}
          placeholder={props?.placeholder}
          placeholderTextColor={color.themeColorDark}
          keyboardType={props?.keyboardType}
          secureTextEntry={props?.secureTextEntry}
          editable={props?.editable}
          onChangeText={props?.onChangeText}
          value={props?.value}
          onFocus={props?.onFocus}
          onBlur={props?.onBlur}
          autoCapitalize={props?.autoCapitalize}
        />
        <Ionicons
          onPress={props?.eyeIconPress}
          name={props?.eyeIconName}
          color={
            props?.isFocused == true
              ? color.textSecondaryColor
              : color.themeColorDark
          }
          style={{marginLeft: 'auto', marginRight: wp('3')}}
          size={hp('2')}
        />
      </View>
      </>
  );
};
