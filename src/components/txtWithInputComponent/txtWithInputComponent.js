import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { color } from '../color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';


const txtWithInputComponent = (props) => {
  // const [iconVisible,setIconVisible]=useState(false);
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };
  return (
    
    <View style={styles.TextWithInputComponent}>
      <Text style={styles.textName}>{props.name}</Text>
      <View style={styles.txtInput}>
        <Text numberOfLines={1} style={styles.inputName}>{props.input}</Text>
        {props.iconVisible && <MaterialIcons name='content-copy' onPress={()=>copyToClipboard(props.input)} size={20} color={color.textImagebackgroundColor}/>}
        </View>
    </View>

  )
}

export default txtWithInputComponent

const styles = StyleSheet.create({
    TextWithInputComponent:{
        width:wp('90'),
        marginTop:hp('1.5'),
        marginLeft:hp('1.5'),
    },
    textName  :{
        fontSize:hp('2.0'),
        color:color.textColor
    },
    txtInput:{
        flexDirection:'row',
        
        backgroundColor:color.txtInputbackColor,
        width:wp('88'),
        height:hp('5.5'),
        justifyContent:'space-between',
        alignItems:'center',
        padding:8,
        borderRadius:5,
        marginTop:hp('1')
    },
    inputName  :{
        fontSize:hp('2.0'),
        color:'black',
        width:wp('77'),
        // backgroundColor:'red'
    },
})