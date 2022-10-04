import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Platform, StyleSheet, Image, Text, Pressable} from 'react-native';
import {IMAGE_BASED_URL} from '../../config/Urls';
import {color} from '../color';
import Lottie from 'lottie-react-native';

export const FrontPackageCom = props => {
  let item = props.data;
  return (
    <Pressable onPress={() => props?.navigate(item)} style={{...styles.mainView, }}>
      <Image
        // source={{
        //   uri: 'https://images.pexels.com/photos/12405196/pexels-photo-12405196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        // }}
        resizeMode="cover"
        source={{uri: IMAGE_BASED_URL + item?.get_images[0]?.title}}
        style={styles.packageImage}
      />
      <View style={{width:wp('77'),
            // backgroundColor:'red',

    }}>
        <View
          style={{
            flexDirection: 'row',
            // marginBottom: hp('-0.4'),
            marginTop: hp('-0.6'),
            width:wp('74'),
            }}>
          <Text style={{...styles.packageTitle}}>Title</Text>
          <Text
            numberOfLines={1}
            style={{
              ...styles.packageTitle,
            width: wp('72'),
              fontWeight: 'normal',
            }}>
            {item?.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row',
            width:wp('74'),

    }}>
          <Text style={{...styles.packageTitle}}>Price</Text>
          <Text style={{...styles.packageTitle, fontWeight: 'normal'}}>
            $ {item?.price}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 'auto',
              marginRight: wp('2'),
            }}>
              {/* <Lottie
            source={require('../../images/worldgif.json')}
            autoPlay
            loop
            style={{
              // width: wp('4'),
backgroundColor:'red',
              height:hp('6')
            }}
          /> */}
            {/* <Fontisto
              style={{paddingRight: wp('2')}}
              name="world"
              color={color.textPrimaryColor}
              size={hp('4')}
            /> */}
            {/* <Image 
        resizeMode='contain'
        source={require('../../images/world.gif')}  
      style={{width: wp('10'), height: hp('4') }}
    /> */}
          </View>
        </View>
        <View style={{flexDirection: 'row',
             }}>
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
      <View style={{...styles.packageImage, }} />
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

  },
  packageImage: {width: wp('90'), height: hp('25'), borderRadius: 15},
  packageTitle: {
    fontSize: hp('2'),
    color: 'black',
    fontWeight: 'bold',
    marginTop: hp('0.5'),
    marginLeft: wp('2'),
  },
});
