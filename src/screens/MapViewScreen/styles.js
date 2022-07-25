import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    height: hp('15'),
    width: wp('100'),
    // backgroundColor: 'red',
    backgroundColor: 'rgba(255, 255, 255  ,0.5)',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    paddingTop: Platform.OS == 'ios' ? hp('2') : 0,
  },
  parentCardTopTag: {
    width: wp('45%'),
    // height: hp('4.5'),
    alignSelf: 'center',
    borderRadius: hp('0.8'),
    backgroundColor: color.orderBoxColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1'),
    marginLeft: wp('3'),
    padding: 5,
  },
  parentCardTopTagText: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: 'white',
  },
});
