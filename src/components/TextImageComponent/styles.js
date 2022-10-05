import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalStyles } from '../../config/globalStyles';
import {color} from '../color';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: color.textImagebackgroundColor,
    width: wp('85'),
    height: hp('6'),
    marginBottom: hp('1.5'),
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    marginHorizontal: wp('3'),
  },
  text: {
    fontSize: hp('2.3'),
    fontWeight: '600',
    color: color.textColor,
    ...globalStyles.globalTextStyles3
  },
});
