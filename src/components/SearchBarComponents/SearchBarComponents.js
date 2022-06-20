import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
const SearchBarComponents = props => {
  const [value, setValue] = useState();
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={25} color={color.textColor} />
      <TextInput
        value={value}
        placeholderTextColor={color.themeColorDark}
        style={styles.text}
        onChange={e => {
          setValue(e);
        }}
        placeholder="Search Your Favourite Place"
      />
    </View>
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
    color: color.blacktext,
    fontSize: hp('2.4'),
  },
});
