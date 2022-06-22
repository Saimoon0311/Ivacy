import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
const SearchBarComponents = props => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={styles.container}>
      <Ionicons name="search" size={25} color={color.textColor} />
      <Text style={styles.text}>Search Your Favourite Place</Text>
      {/* <TextInput
        value={value}
        placeholderTextColor={color.themeColorDark}
        style={styles.text}
        onChange={e => {
          setValue(e);
        }}
        placeholder="Search Your Favourite Place"
      /> */}
    </TouchableOpacity>
  );
};

export default SearchBarComponents;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1.5),
    width: wp('89'),
    height: hp('7'),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: color.white,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  text: {
    width: wp('70'),
    fontWeight: '600',
    color: 'gray',
    fontSize: hp('2.4'),
  },
});
