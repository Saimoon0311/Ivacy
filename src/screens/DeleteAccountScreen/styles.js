import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  destxtInputContainer: {
    width: wp('85'),
    height: hp('5'),
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: color.txtInputbackColor,
    marginTop: hp('2'),
    borderWidth: 1,
    paddingLeft: wp('3'),
    borderColor: color.textImagebackgroundColor,
    justifyContent: 'center',
  },
  btnContainer: {
    backgroundColor: 'red',
    width: wp('70'),
    height: hp('5'),
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: hp('2'),
  },
  btn: {
    textAlign: 'center',
    color: color.white,
    fontSize: hp('2'),
    fontWeight: '500',
  },
  containerStyle: {
    padding: 13,
    marginTop: hp('2'),
    backgroundColor: color.textImagebackgroundColor,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    width: wp('93'),
    alignSelf: 'center',
    marginBottom: hp('2'),
  },
  textContainer: {
    flexDirection: 'row',
    width: wp('85'),
    alignSelf: 'center',
    marginTop: hp('2'),
  },
  numberStyle: {
    fontSize: hp('2'),
    color: 'black',
    fontWeight: 'bold',
  },
  contentStyle: {
    fontSize: hp('2'),
    color: 'black',
    textAlign: 'justify',
    width: wp('80'),
  },
  checkStyle: {
    // borderRadius: 60,
    // borderRadius: Math.round(
    //   Dimensions.get('window').width + Dimensions.get('window').height,
    // ),
    // width: Dimensions.get('screen').width * 0.08,
    // height: Dimensions.get('screen').width * 0.08,
    width: wp('8'),
    height: hp('3.5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2'),
    alignContent: 'center',
  },
  checkBoxButtonContainer: {
    marginTop: hp('2'),
  },
  emailStyle: {fontSize: hp('2'), color: 'black', fontWeight: 'bold'},
});
