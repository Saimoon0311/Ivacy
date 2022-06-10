import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';


const TextComponent = props => {
  return (
    <View>
      <Text  >{props.text}</Text>
    </View>
  )
}

export default TextComponent

const styles = StyleSheet.create({})