import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Platform,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {IMAGE_BASED_URL} from '../../config/Urls';
import {color} from '../color';

export const FrontPackageCom = props => {
  let item = props.data;
  return (
    <Pressable style={styles.mainView}>
      <Image
        // source={{
        //   uri: 'https://images.pexels.com/photos/12405196/pexels-photo-12405196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        // }}
        source={{uri: IMAGE_BASED_URL + item?.get_images[0]?.title}}
        style={styles.packageImage}
      />
      <View
        style={{
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{...styles.packageTitle}}>Title</Text>
          <Text
            numberOfLines={2}
            style={{...styles.packageTitle, fontWeight: 'normal'}}>
            {' '}
            {item?.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.packageTitle}>Price</Text>
          <Text style={{...styles.packageTitle, fontWeight: 'normal'}}>
            {' '}
            {item?.price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 'auto',
              marginRight: wp('2'),
            }}>
            <FontAwesome
              style={{alignSelf: 'flex-end'}}
              name="location-arrow"
              color={color.textPrimaryColor}
              size={hp('4')}
            />
            <MaterialCommunityIcons
              name="security"
              color={color.textPrimaryColor}
              size={hp('4')}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: wp('90'),
    borderRadius: 15,
    marginLeft: wp('1'),
    marginRight: wp('1'),
    backgroundColor: 'white',
    height: hp('35'),
    borderWidth: 0.2,
    borderColor: 'black',
    overflow: 'hidden',
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
    marginTop: hp('1'),
    marginLeft: wp('2'),
  },
});
