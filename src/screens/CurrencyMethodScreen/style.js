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
    alignSelf: 'center',
  },
  backgroundImage: {width: wp('100'), height: hp('100')},
  InnerContainer: {
    alignSelf: 'center',
    width: wp('80'),
    height: hp('100'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    backgroundColor: color.white,
    width: wp('39'),
    height: hp('25'),
    marginHorizontal: wp('1'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: color.textThirdColor,
  },
  text: {
    fontSize: hp('3.0'),
    color: color.white,
    fontWeight: 'bold',
  },
  image: {
    width: wp('37'),
    height: hp('15'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymenttextstyle: {
    width: wp('65'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: hp('20'),
  },
  text2: {
    fontSize: hp('3.0'),
    fontWeight: '700',
    color: color.blacktext,
    textAlign: 'center',
  },
  loadingView: {
    position: 'absolute',
    height: hp('100'),
    width: wp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42,42,42,0.6)',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  loadingText: {color: 'white', fontSize: hp('3'), fontWeight: 'bold'},
  ethText: {
    fontSize: hp('2'),
    color: 'white',
    marginTop: hp('-1'),
  },
  bottomSheetInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ethImg: {
    width: wp('10'),
    height: hp('5.5'),
  },
  sheetEthText: {
    fontSize: hp('2'),
    color: '#0A2463',
    fontWeight: 'bold',
  },
  ethValue: {marginLeft: 'auto', fontSize: hp('2')},
  nonRefundableText: {
    marginLeft: 'auto',
    fontSize: hp('2'),
    color: 'red',
  },
  proccedView: {
    backgroundColor: color.textThirdColor,
    width: wp('80'),
    height: hp('6'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  proccedText: {
    color: 'white',
    fontSize: hp('2'),
    fontWeight: 'bold',
  },
  webViewColor:{
    flex:1,
    // marginTop:Platform.OS == 'ios' && hp('5'),
    
  }
});
