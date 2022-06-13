import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';

export const styles = StyleSheet.create({
  button:{
    flexDirection:'row',
    backgroundColor: color.background2,
     width:wp('85'),
    height:hp('6'), 
    marginBottom:hp('1.5'),
    alignItems:'center'
  },
  image:{

    marginHorizontal:wp('3')
  
  },
  text:{
    fontSize:hp('2.6'),
    fontWeight:'600',
    color:color.textColor
  }
 
});
