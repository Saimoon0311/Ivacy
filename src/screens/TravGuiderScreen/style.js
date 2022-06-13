import React from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';

export const styles = StyleSheet.create({
  container: {
    width: wp('109'),
    height: hp('100'),
  },
  backgroundImage: {width: wp('100'), height: hp('100')},
  InnerContainer:{
    alignSelf:'center',
    width: wp('80'), 
    height: hp('100'),
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center', 
  },
  boxContainer:{ 
  backgroundColor:"white",
  width: wp('39'), 
  height: hp('25'),
  marginHorizontal:wp('1'),
  borderRadius:10,
  alignItems:'center',
  justifyContent:'space-evenly'

  
},
text:{
fontSize:hp('3.0'),
color:color.textThirdColor,
fontWeight:'bold',

},
image:{
  width: wp('15'), 
  height: hp('15'),
  alignItems:'center',justifyContent:'center'
},
 
  innerView: {
    height: hp('55'),
    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
});
