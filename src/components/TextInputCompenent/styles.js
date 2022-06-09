import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';

export const styles = StyleSheet.create({
  textinput: {
    borderRadius: 5,
    paddingLeft: wp('3'),
    marginTop: hp('1'),
    color: 'white',
  },
  inputtext: {
    marginTop: hp('2'),
    fontSize: hp('2'),
  },
});
