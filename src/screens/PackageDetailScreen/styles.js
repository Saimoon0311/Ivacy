import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import { globalStyles } from '../../config/globalStyles';

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
    marginBottom: hp('3.5'),
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
    marginTop: hp('1'),
    ...globalStyles.globalTextStyles3,

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
    height: hp('6'),
    width: wp('96'),
    backgroundColor: color.textThirdColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp('1.5'),
    elevation: 5,
    borderRadius: 5,
  },
  bookNowTxt: {
    fontSize: hp('2'),
    color: color.white,
    fontWeight: 'bold',
    ...globalStyles.globalTextStyles3,

  },
  dateStyle: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: color.textImagebackgroundColor,
    color: 'black',
    textAlign: 'center',
    height: hp('4'),
    textAlignVertical: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1'),
    fontSize: hp('2'),
    overflow: 'hidden',
    padding: Platform.OS == 'ios' ? 7 : 0,
    // padding: 9,
  },
  toStyle: {
    textAlign: 'center',
    fontSize: hp('2'),
    color: 'black',
    marginBottom: hp('1'),
    fontWeight: 'bold',
  },
  boxText: {
    backgroundColor: 'white',
    margin: 3,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    marginLeft: wp('2'),
    borderWidth:1,
    color: 'black',
  },
  hotTextTouc: {
    backgroundColor: color.boxColor,
    // width: wp('15'),
    height: hp('3'),
    marginLeft: wp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    // padding: 10,
  },
});
