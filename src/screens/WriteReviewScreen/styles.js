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
  btnContainer: {
    backgroundColor: color.boxColor,
    width: wp('90'),
    height: hp('7'),
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: hp('2'),
  },
  btn: {
    textAlign: 'center',
    color: color.white,
    fontSize: hp('2.7'),
    fontWeight: '500',
  },
  txtInputContainer: {
    width: wp('90'),
    height: hp('7'),
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: color.txtInputbackColor,
    marginTop: hp('4'),
    borderWidth: 1,
    paddingLeft: wp('3'),
    borderColor: color.textImagebackgroundColor,
  },
  destxtInputContainer: {
    width: wp('90'),
    height: hp('18'),
    alignSelf: 'center',
    borderRadius: 5,

    backgroundColor: color.txtInputbackColor,
    marginTop: hp('4'),
    borderWidth: 1,
    paddingLeft: wp('3'),
    borderColor: color.textImagebackgroundColor,
  },
});
