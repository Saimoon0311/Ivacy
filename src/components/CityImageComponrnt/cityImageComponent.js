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
  let ml = props?.ml ? props.ml : wp('4');
  const placholderView = () => {
    return (
      <View
        style={{
          ...styles.imageStyle,
          backgroundColor: 'red',
          marginLeft: wp('2'),
          marginRight: wp('1.5'),
          marginTop: hp('1.5'),
          borderRadius: 10,
        }}
      />
    );
  };
  return (
    <View>
      <View style={{flexDirection: 'row', paddingLeft: ml}}>
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.8'),
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
              paddingBottom: hp('3'),
              paddingRight: wp('2'),
              paddingLeft: ml,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props?.navigate(item);
                  }}
                  style={{...styles.mainContainer}}>
                  <ImageBackground
                    borderRadius={10}
                    resizeMode="stretch"
                    style={styles.imageStyle}
                    source={{
                      uri: 'https://images.pexels.com/photos/11577405/pexels-photo-11577405.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
                    }}>
                    <Text numberOfLines={2} style={styles.textImageBackground}>
                      {item?.name}
                    </Text>
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
    marginRight: wp('3'),
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
    width: wp('24'),
    // height: hp('3'),
    textAlign: 'center',
    color: 'white',
    fontSize: hp('1.8'),
    position: 'absolute',
    bottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 6,
  },
});
