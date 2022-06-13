import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';

export const BackHeaderCom = props => {
  return (
    <View style={styles.headerView}>
      <TouchableOpacity
        onPress={() => props?.goBack()}
        style={styles.backArrowView}>
        <Ionicons
          name="arrow-back"
          color={color.textPrimaryColor}
          size={hp('4')}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props?.text}</Text>
      <View style={styles.extraView} />
    </View>
  );
};
