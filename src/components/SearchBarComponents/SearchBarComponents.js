import {StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../color';
import {useRef} from 'react';
import {useEffect} from 'react';

const SearchBarComponents = props => {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      // Animated.timing(scale, {
      //   toValue: scale.setValue(-2),
      //   useNativeDriver: true,
      // }),
      // Animated.timing(scale, {
      //   toValue: scale.setValue(2),
      // useNativeDriver: true,
      // }),
      Animated.timing(rotate, {
        toValue: rotate.setValue(180),
        duration: 7000,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: rotate.setValue(360),
        useNativeDriver: true,
        // duration: 4000,
      }),
    ]).start();
  }, []);
  return (
    <TouchableOpacity
      // onLongPress={() => {
      // }}
      onPress={props?.onPress}
      style={{
        ...styles.container,
        transform: [{scale}, {rotate: `${JSON.stringify(rotate)}deg`}],
      }}>
      <Ionicons name="search" size={25} color={color.textColor} />
      <Text style={styles.text}>Travel & Explore</Text>
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
