import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: hp('100'),
    background: color.white,
  },
  mainContainer: {
    paddingHorizontal: wp('3'),
    paddingTop: hp('2'),
  },
  writTxt: {
    fontWeight: '700',
    color: color.black,
    fontSize: hp('3.5'),
    width: wp('45'),
  },
});
