import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';

const TextWithInputComponent = props => {
  const copyToClipboard = text => {
    props?.onCopy();
    Clipboard.setString(text);
    setTimeout(() => {
      props?.afterTextCopied();
    }, 2000);
  };
  return (
    <View style={styles.TextWithInputComponent}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textName}>{props.name}</Text>
        {props.copyStat == true && (
          <Text style={styles.copyText}>Text Copy</Text>
        )}
      </View>
      <View style={styles.txtInput}>
        <Text numberOfLines={1} style={styles.inputName}>
          {props.input}
        </Text>
        {props.iconVisible && (
          <MaterialIcons
            name="content-copy"
            onPress={() => copyToClipboard(props.input)}
            size={20}
            color={color.textImagebackgroundColor}
          />
        )}
      </View>
    </View>
  );
};

export default TextWithInputComponent;

const styles = StyleSheet.create({
  TextWithInputComponent: {
    width: wp('90'),
    marginTop: hp('1.5'),
    marginLeft: hp('1.5'),
    // flexDirection: 'row',
  },
  textName: {
    fontSize: hp('2.0'),
    color: color.textColor,
  },
  txtInput: {
    flexDirection: 'row',

    backgroundColor: color.txtInputbackColor,
    width: wp('88'),
    height: hp('5.5'),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: hp('1'),
  },
  inputName: {
    fontSize: hp('2.0'),
    color: 'black',
    width: wp('77'),
    // backgroundColor:'red'
  },
  copyText: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: wp('2'),
    backgroundColor: color.borderThirdColor,
    padding: 5,
    color: 'white',
    borderRadius: 20,
    fontWeight: 'bold',
  },
});
