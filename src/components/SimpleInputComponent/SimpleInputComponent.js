import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { color } from '../color';
import { globalStyles } from '../../config/globalStyles';

const SimpleInputComponent = (props) => {
  return (
    <View>
    <Text style={styles.txt}>{props?.text}</Text>    
    <TextInput style={{...styles.TxtInput,borderColor:
            props?.isFocused == true
              ? color.black
              : props?.value != ''
              ? color.black
              : color.black,
              color:'black',
          borderWidth: props?.isFocused == true ? 2 : 1,}} keyboardType={props?.keyboardType} onFocus={props?.onFocus} onBlur={props?.onBlur} value={props?.value} placeholderTextColor={color.textColor} placeholder={props?.placeholder} onChangeText={props?.onChangeText}/>
    </View>
  )
}

export default SimpleInputComponent

const styles = StyleSheet.create({
    
    txt:{
    marginBottom:hp('1'),
    color:color.black,
    fontSize:hp('1.8'),
    fontWeight:'400',
    ...globalStyles.globalTextStyles3
    },
    TxtInput:{
        borderWidth:1,
        width:wp('90'),
        height:hp('5'),
        borderRadius:5,
        marginBottom:hp('2'),
        padding:hp('1'),
    backgroundColor:'white',
    ...globalStyles.globalTextStyles3
            
    }
})