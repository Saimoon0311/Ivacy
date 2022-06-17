import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    width: wp('109'),
    height: hp('100'),
  },
  backgroundImage: {width: wp('100'), height: hp('110')},
  loginView: {
    width: wp('90'),
    alignSelf: 'center',
    // backgroundColor: 'yellow',
  },
  mainHeading: {
    fontSize: hp('3.5'),
    fontWeight: 'bold',
    color: color.textSecondaryColor,
    marginLeft: wp('4'),
    marginBottom: hp('1'),
  },
  forgotTextView: {
    alignSelf: 'flex-end',
    marginTop: hp('2'),
  },
  signupText: {
    fontSize: hp('2'),
    color: color.textSecondaryColor,
    fontWeight: 'bold',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
  newUserText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  innerView: {
    // height: hp('28'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    marginTop: hp('6'),
  },
  pickerStyle: {
    width: Platform.OS == 'ios' ? wp('95') : wp('90'),
    height: hp(Platform?.OS == 'ios' ? '20' : '6'),
    color: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: Platform.OS == 'ios' ? hp('1') : hp('2'),
    borderRadius: 5,
    borderWidth: Platform.OS == 'ios' ? 0 : 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
});
