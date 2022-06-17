import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {StyleSheet} from 'react-native';
import { color } from '../components/color';

export const globalStyles = StyleSheet.create({
  globalTextStyles: {
    fontWeight: 'bold',
    color:color.textColor ,
    marginVertical:hp('1.5')
  },
});
