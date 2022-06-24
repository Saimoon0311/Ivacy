import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: hp('100'),
  },
  slidercontainer: {
    width: wp('100'),
    height: hp('35'),
    backgroundColor: 'red',
  },
  flatListMainContainer: {
    width: wp('100'),
    height: hp('40'),
    marginBottom: hp('4'),
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pricetxt: {
    fontSize: hp('1.9'),
    color: color.textSecondaryColor,
    fontWeight: 'bold',
  },
  packtxt: {
    fontSize: hp('2.5'),
    color: color.textThirdColor,
    fontWeight: 'bold',
  },
  priceMainContainer: {
    marginTop: hp('2'),
    marginRight: wp('2'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxNowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('5'),
    width: wp('30'),
    backgroundColor: color.textThirdColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 5,
  },
  bookNowTxt: {
    fontSize: hp('2'),
    color: color.white,
    fontWeight: 'bold',
  },
});
