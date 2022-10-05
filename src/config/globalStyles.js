import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from '../components/color';

export const globalStyles = StyleSheet.create({
  globalTextStyles: {
    fontWeight: 'bold',

    color: color.black,
    marginVertical: hp('1.2'),
    // textDecorationLine: 'underline',
  },
  globalTextStyles2: {
    fontWeight: 'bold',
    color: color.white,
    fontSize: hp('3'),
  },  
  globalTextStyles3: {
    // color:color.black,
    fontFamily:'Poppins'
    },  
});
