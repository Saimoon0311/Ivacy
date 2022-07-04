import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    width: wp('100'),
    height: hp('100'),
    background: color.white,
  },
  mainContainer: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('2'),
    marginBottom: hp('5'),
  },
  topTxtContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  RevieTxt: {
    fontWeight: '800',
    fontSize: hp('3.5'),
    color: color.black,
  },
  writRevTxt: {
    fontWeight: '400',
    fontSize: hp('2'),
    color: color.textSecondaryColor,
  },
  writeRevContainer: {
    flexDirection: 'row',
    color: color.textSecondaryColor,
    alignItems: 'center',
  },
  ratingtxtContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    // width: wp('24'),
  },
  ratingtxt: {
    alignSelf: 'center',
    color: color.textSecondaryColor,
    fontSize: hp('9'),
    fontWeight: '600',
  },
  outOfTxt: {
    paddingLeft: wp('7'),
    color: color.textColor,
  },
  CommentContainer: {
    width: wp('90'),
    // height: hp('25'),
    alignSelf: 'center',
    backgroundColor: color.white,
    borderRadius: 10,
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 6,
    marginVertical: hp('1'),
  },
  topCommentTxt: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: hp('2'),
    marginHorizontal: wp('3'),
  },
  titleTxt: {
    fontWeight: '500',
    color: color.black,
    fontSize: hp('2'),
    width: wp('50'),
  },
  desc: {
    color: color.textColor,
    width: wp('85'),
    alignSelf: 'center',
    fontSize: hp('2'),
    marginBottom: hp('1'),
  },
});
