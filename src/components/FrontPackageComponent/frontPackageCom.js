import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Platform, StyleSheet, Image, Text, Pressable} from 'react-native';
import {IMAGE_BASED_URL} from '../../config/Urls';
import Lottie from 'lottie-react-native';

export const FrontPackageCom = props => {
  let item = props.data;
  return (
    <Pressable onPress={() => props?.navigate(item)} style={styles.mainView}>
      <Image
        // source={{
        //   uri: 'https://images.pexels.com/photos/12405196/pexels-photo-12405196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        // }}
        resizeMode="cover"
        source={{uri: IMAGE_BASED_URL + item?.get_images[0]?.title}}
        style={styles.packageImage}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: hp('-0.4'),
            marginTop: hp('0.5'),
          }}>
          <Text style={{...styles.packageTitle}}>Title</Text>
          <Text
            numberOfLines={1}
            style={{
              ...styles.packageTitle,
              width: wp('75'),
              fontWeight: 'normal',
            }}>
            {item?.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.packageTitle}}>Price</Text>
          <Text style={{...styles.packageTitle, fontWeight: 'normal'}}>
            $ {item?.price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 'auto',
              marginRight: wp('2'),
              width: wp('15'),
              height: hp('9'),
              marginTop: hp('-2'),
            }}>
            <Lottie
              source={require('../../images/worldgif.json')}
              autoPlay
              loop
              resizeMode="contain"
            />
            {/* <Fontisto
              style={{paddingRight: wp('2')}}
              name="world"
              color={color.textPrimaryColor}
              size={hp('4')}
            /> */}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: hp('-4.5')}}>
          <Text
            style={{
              ...styles.packageTitle,
            }}>
            Date
          </Text>
          <Text
            style={{
              ...styles.packageTitle,
              fontWeight: 'normal',
            }}>
            {item?.from_date}
          </Text>
          <Text
            style={{
              ...styles.packageTitle,
            }}>
            To
          </Text>
          <Text
            style={{
              ...styles.packageTitle,
              fontWeight: 'normal',
            }}>
            {item?.end_date}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export const placeholderView = () => {
  return (
    <View
      style={{
        ...styles.mainView,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'black',
      }}>
      <View style={{...styles.packageImage, backgroundColor: 'red'}} />
      <View
        style={{
          ...styles.packageTitle,
          backgroundColor: 'red',
          width: wp('50'),
          height: hp('3'),
          borderRadius: 10,
        }}
      />
      <View
        style={{
          ...styles.packageTitle,
          backgroundColor: 'red',
          width: wp('80'),
          borderRadius: 10,
          height: hp('3'),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: wp('90'),
    borderRadius: 15,
    marginLeft: wp('1'),
    marginRight: wp('1'),
    marginBottom: hp('1.5'),
    backgroundColor: 'white',
    height: hp('35'),
    borderWidth: Platform.OS == 'ios' ? 0.2 : 0,
    // borderColor: 'black',
    // overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 30,
    // elevation: hp('0.8'),
  },
  packageImage: {width: wp('90'), height: hp('25'), borderRadius: 15},
  packageTitle: {
    fontSize: hp('2'),
    color: 'black',
    fontWeight: 'bold',
    marginTop: hp('0.2'),
    marginLeft: wp('2'),
  },
});
