import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  globalTextStyles: {
    fontWeight: 'bold',
    fontSize: hp('2.5'),
  },
});
