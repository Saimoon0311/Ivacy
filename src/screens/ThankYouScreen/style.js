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
  imageContainer:{
    alignSelf:'center',
    paddingTop:hp('2'),
    marginBottom:hp('1.0'),
  },
  image:{
    width: wp('31'),
    height: hp('20'),
  },
  thankuConatainer:{
    width: wp('90'),
    height: hp('30'),
    alignSelf:
    'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.ThankYouColor,
    borderRadius:10
  },
  thankyouTxt:{
    alignItems:'center',
    fontSize:hp('5'),
    fontWeight:'bold',
    color:color.white
  },
  choseusTxt:{
    alignItems:'center',
    fontSize:hp('2.5'),
    fontWeight:'bold',
    color:color.white
  },
  orderDetContainer:{
    marginTop:hp('2'),
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
  },
  orderDetxt:{
    color:color.ThankYouColor,
    alignItems:'center',
    fontSize:hp('3.0'),
    fontWeight:'bold',
  }
});
