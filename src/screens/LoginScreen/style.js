import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  loginView: {
    width: wp('90'),
    alignSelf: 'center',
    // backgroundColor: 'yellow',
  },
  mainHeading: {
    fontSize: hp('3.5'),
    fontWeight: 'bold',
    color: color.textSecondaryColor,
    // marginBottom: hp('1'),
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
    marginTop: hp('1'),
  },
  newUserText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  innerView: {
    height: hp('50'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  buttonstyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: color.textPrimaryColor,
  },
});
