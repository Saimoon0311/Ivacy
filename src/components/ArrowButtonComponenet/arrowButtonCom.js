import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SkypeIndicator} from 'react-native-indicators';

export const ArrowButtonCom = props => {
  let width = props?.width ? props.width : wp('25');
  let height = props?.height ? props.height : hp('5');
  let mgRight = props.mgRight ? props.mgRight : wp('0');
  let right = props?.right ? props.right : wp('-13');
  return props?.loading ? (
    <SkypeIndicator
      color={color.white}
      size={hp('4')}
      style={{
        right: right,
        marginTop: hp('2'),
      }}
    />
  ) : (
    <TouchableOpacity
      onPress={() => props?.onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: mgRight,
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
