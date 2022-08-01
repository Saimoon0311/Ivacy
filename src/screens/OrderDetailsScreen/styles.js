import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },

  renderHeaderStyles: {
    width: wp('93'),
    height: hp('20'),
    shadowColor: '#000',
    backgroundColor: 'white',
    marginBottom: hp('1.5'),
    marginTop: hp('3'),
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    alignSelf: 'center',
  },
  renderHeaderinnerContainer: {
    marginLeft: wp('3'),
    marginTop: hp('2'),
  },
  orderDetailsContainer: {
    width: wp('20'),
    height: hp('3'),
    justifyContent: 'center',
    backgroundColor: color.boxColor,
    borderRadius: 3,
    marginBottom: hp('2'),
  },
  parentCardStyle: {
    width: wp('90'),
    backgroundColor: color.orderBoxColor,

    alignSelf: 'center',
    marginTop: hp('4'),
    borderRadius: hp('2'),
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    marginBottom: hp('1'),
    paddingBottom: hp('3'),
  },
  parentCardStyle1: {
    width: wp('90'),
    backgroundColor: '#8F77C3',
    // backgroundColor: color.orderBoxColor,

    alignSelf: 'center',
    marginTop: hp('4'),
    borderRadius: hp('2'),
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    paddingBottom: hp('2'),
    marginBottom: wp('4'),
  },

  childCardStyle: {
    width: wp('90%'),
    height: hp('30'),
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    marginBottom: hp('2'),
    borderRadius: hp('3'),
  },
  parentCardIconHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: wp('83'),
    marginTop: hp('1'),
    // paddingTop: hp('0.5'),
  },
  parentCarddTextStyle: {
    fontSize: hp('1.8'),
    color: color.white,
    // marginLeft: wp('3%'),
    // marginTop: hp('1.8'),
  },
  parentCardRow: {
    width: wp('75'),
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    // marginTop: hp('1.8'),
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    borderBottomWidth: hp('0.2'),
    borderBottomColor: '#C8C8C8',
    paddingBottom: hp('0.7'),
    // marginTop: hp('1.5'),
  },
  parentCardTopTag: {
    width: wp('30%'),
    // height: hp('4.5'),
    borderRadius: hp('0.8'),
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2'),
    marginLeft: wp('3'),
    padding: 5,
    marginBottom: hp('2'),
  },
  parentCardTopTagText: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: '#8561D3',
  },
  iconStyle: {
    marginBottom: hp('0.8'),
  },
  viewForTextWidth: {
    // backgroundColor: 'red',
    width: wp('35'),
    // flexDirection: 'row',
    // alignItems: 'flex-end',
  },
  noTextstyle: {
    fontSize: hp('2.5'),
    color: '#512500',
    textAlign: 'center',
    marginTop: hp('3'),
  },
  cancelViewContainer: {
    backgroundColor: color.themColorPrimary,
    marginTop: hp('2'),
    textAlign: 'center',
    // width: wp('30'),
    // height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: wp('2'),
    padding: 6,
  },
  returnViewContainer: {
    backgroundColor: color.themColorPrimary,
    marginTop: hp('2'),
    textAlign: 'center',
    // width: wp('30'),
    // height: hp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 'auto',
    marginLeft: wp('3'),
    padding: 6,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('1.5'),
  },
  CustomImageConatainer: {
    position: 'absolute',
    height: hp('100'),
    width: wp('100'),
    backgroundColor: color.mapColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
