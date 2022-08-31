import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: hp('1'),
  },
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: color.bottomBarColor,
    width: wp('17'),
    height: hp('8'),
    borderRadius: 60,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  bokText: {
    fontSize: hp('2'),
    color: color.textColor,
    fontWeight: 'bold',
  },
  dottedContaier: {
    width: wp('95'),
    borderStyle: 'dotted',
    borderColor: color.textColor,
    borderWidth: 1,
    borderRadius: 1,
    marginVertical: hp('1.5'),
    paddingVertical: hp('1.5'),
  },
  expireText: {
    fontSize: hp('2'),
    color: color.black,
  },
  timeText: {
    fontSize: hp('2'),
    color: color.badgeColor,
  },
  indicateText: {
    marginTop: hp('0.7'),
    fontSize: hp('1.8'),
    color: color.textColor,
    textAlign: 'center',
  },
  secondContainer: {
    flex: 1,
    marginTop: hp('1'),
    backgroundColor: 'white',
  },

  priceContainer: {
    backgroundColor: color.LightGreen,
    width: wp('100'),
    height: hp('8'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalTxt: {
    color: color.darkGreen,
    fontSize: hp('2.5'),
    paddingHorizontal: wp('5'),
  },
  inputName: {
    fontSize: hp('2.0'),
    color: 'black',
    width: wp('77'),
    // backgroundColor:'red'
  },
  txtInput: {
    flexDirection: 'row',

    backgroundColor: color.txtInputbackColor,
    width: wp('88'),
    height: hp('5.5'),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: hp('1'),
  },
  thirdContainer: {
    flex: 1,
    marginVertical: hp('1'),
    paddingBottom: hp('2'),
    backgroundColor: 'white',
    alignItems: 'center',
  },
  confirmTxt: {
    fontSize: hp('2.0'),
    color: color.darkGreen,
    fontWeight: 'bold',
    marginTop: hp('1.5'),
    alignSelf: 'flex-start',
    marginLeft: wp('4'),
  },
  ConfirmInput: {
    borderColor: color.textImagebackgroundColor,
    borderWidth: 1,
    flexDirection: 'row',

    backgroundColor: color.txtInputbackColor,
    width: wp('88'),
    height: hp('5.5'),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: hp('1'),
  },
  confirmButton: {
    backgroundColor: color.ThankYouColor,
    width: wp('88'),
    height: hp('5.5'),
    marginVertical: hp('1.5'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
