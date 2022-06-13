import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

export const FrontPackageCom = props => {
  return (
    <View style={{width: wp('90'), borderRadius: 15, alignSelf: 'center'}}>
      <Image
        source={require('../../images/MaskGroup1.png')}
        style={{width: wp('90'), height: hp('25'), borderRadius: 15}}
      />
      <Text style={{fontSize: hp('2'), color: 'black', fontWeight: 'bold'}}>
        rtyu
      </Text>
    </View>
  );
};
