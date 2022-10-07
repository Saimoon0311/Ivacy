import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SkypeIndicator} from 'react-native-indicators';
import { globalStyles } from '../../config/globalStyles';

export const ArrowButtonComponenetDup = props => {
  let width = props?.width ? props.width : wp('25');
  let height = props?.height ? props.height : hp('5');
  let mgRight = props.mgRight ? props.mgRight : wp('0');
  let right = props?.right ? props.right : wp('-13');
  return (

  
    <TouchableOpacity
      onPress={() => props?.onPress()}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: width,
        height: height,
        alignItems: 'center',
        backgroundColor: props?.backgroundColor ?? 'white',
        borderRadius: 5,
        marginRight: mgRight,
        borderWidth:props?.borderWidth ?? 0,
        borderColor:props?.borderColor ?? 'transparent',
    ...globalStyles.globalTextStyles3,
  
        
      }}>
     
     {props?.loading ==true &&   <SkypeIndicator
      color={props?.loaderColor??color.white}
      size={hp('3')}
      style={{
        alignSelf:'center',
      }}
      />}

{props?.loading !=true &&
<View style={{flexDirection:'row'}}>
<Text
        style={{
          color: props?.color ?? color.textPrimaryColor,
          fontSize: hp('2'),
          fontWeight: props?.fontWeight??'bold',
        }}>
        {props?.text}
      </Text>
     
    <Ionicons
        name="ios-arrow-forward-outline"
        size={hp('2')}
        color={props?.iconColor??color.textPrimaryColor}
        style={{alignSelf:'center'}}
      /></View>}
    </TouchableOpacity>
  );
};
