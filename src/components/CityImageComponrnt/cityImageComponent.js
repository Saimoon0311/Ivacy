import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../color';

export const CityImageComponent = props => {
  
  const placholderView = () => {
    return (
      <View
        style={{
          ...styles.imageStyle,
          backgroundColor: 'red',
          marginLeft: wp('3'),
          marginRight: wp('1.5'),
          marginTop: hp('1.5'),
          borderRadius: 10,
        }}
      />
    );
  };
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.8'),
            marginLeft: wp('5'),
          }}>
          {props?.heading}
        </Text>
        <TouchableOpacity style={styles.hotTextTouc}>
          <Text
            style={{
              color: color.white,
              fontWeight: 'bold',
              fontSize: hp('1.7'),
            }}>
            Hot
          </Text>
        </TouchableOpacity>
      </View>
      {props?.isloading ? (
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', marginLeft: wp('2.5')}}>
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
            {placholderView()}
          </View>
        </SkeletonPlaceholder>
      ) : (
        <View>
          <FlatList
            data={props?.data}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            horizontal
            contentContainerStyle={{
              marginLeft: wp('4'),
              paddingBottom: hp('3'),
              paddingRight: wp('2'),
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  // onPress={() => navigation.navigate('SubCategory', item)}
                  style={styles.mainContainer}>
                  <ImageBackground
                    borderRadius={10}
                    resizeMode="stretch"
                    style={styles.imageStyle}
                    // source={{uri: IMAGE_BASED_URL + item?.image?.url}}
                    source={{
                      uri: 'https://cdn.britannica.com/62/153462-050-3D4F41AF/Grand-Canal-Venice.jpg',
                    }}>
                    <Text style={styles.textImageBackground}>hello</Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // marginLeft: wp('3'),
    marginRight: wp('4'),
    marginTop: hp('1.5'),
    borderRadius: 10,
  },
  imageStyle: {
    width: wp('29'),
    height: hp('12'),
  },
  hotTextTouc: {
    backgroundColor: color.boxColor,
    width: wp('10'),
    height: hp('3'),
    marginLeft: wp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },

  textImageBackground: {
    backgroundColor: color.textBackgroundColor,
    width: wp('15'),
    height: hp('3'),
    textAlign: 'center',
    color: 'white',
    fontSize: hp('1.8'),
    position: 'absolute',
    bottom: 10,
    alignContent: 'center',
  },
});
