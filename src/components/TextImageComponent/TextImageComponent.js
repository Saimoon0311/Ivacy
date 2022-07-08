import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {SkypeIndicator} from 'react-native-indicators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TextImageComponent = props => {
  const colors = props?.textcolor ? props?.textcolor : color.textColor;
  return props?.isloading ? (
    <SkypeIndicator color={color.textThirdColor} size={hp('4')} />
  ) : (
    <TouchableOpacity onPress={props?.onPress} style={styles.button}>
      <Ionicons
        style={styles.image}
        name={props?.iconName}
        color={colors}
        size={20}
      />
      <Text style={{...styles.text, color: colors}}>{props?.text}</Text>
    </TouchableOpacity>
  );
};

export default TextImageComponent;
