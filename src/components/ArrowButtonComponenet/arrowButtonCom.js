import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const ArrowButtonCom = props => {
  let width = props?.width ? props.width : wp('25');
  let height = props?.height ? props.height : hp('5');
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: color.textPrimaryColor,
          fontSize: hp('2'),
          fontWeight: 'bold',
        }}>
        {props?.text}
      </Text>
      <Ionicons
        name="ios-arrow-forward-outline"
        size={hp('2')}
        color={color.textPrimaryColor}
      />
    </TouchableOpacity>
  );
};
