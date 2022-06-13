import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';

export const styles = StyleSheet.create({
  headerView: {
    width: wp('100'),
    height: Platform.OS == 'ios' ? hp('10') : hp('7'),
    borderBottomColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS == 'ios' ? hp('3') : hp('0'),
    borderBottomWidth: 1,
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 20,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  backArrowView: {
    width: wp('25'),
    justifyContent: 'center',
    paddingLeft: wp('3'),
  },
  headerText: {
    width: wp('50'),
    textAlign: 'center',
    fontSize: hp('2'),
    color: color.textPrimaryColor,
    fontWeight: 'bold',
  },
  extraView: {
    width: wp('25'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
