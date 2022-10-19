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
import Lottie from 'lottie-react-native';

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
      <View style={{flexDirection: 'row',width:wp('84'), paddingLeft: ml,
    
    }}>
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.0'),
          ...globalStyles.globalTextStyles3,
          }}>
          {props?.heading}
        </Text>
        {props?.hot ?<View style={styles.hotTextTouc}>
            <Text
              style={{
                color: color.white,
                fontWeight: 'bold',
                fontSize: hp('1.7'),
                marginLeft: wp('2'),
    ...globalStyles.globalTextStyles3,

              }}>
              Hot
            </Text>
          <Lottie
            source={require('../../images/52717-fire.json')}
            autoPlay
            loop
            style={{
              marginBottom: hp('1'),
              width: wp('7'),
            }}
          />
        </View>:
        props?.component
        }
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
              props.heading == "Hot Deals By Country"&& console.log(103,item.image)

              var {image}=item
              var imageChecked=image!=null?image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Lp_vpjcJFZDWE_C0lyv5SjGWuZR3J_AtP7_ydmA2mqnRRlXdmwzVsdaCjp8LbIM-6Qk&usqp=CAU'
              return (
                <TouchableOpacity
                  onPress={() => {
                    props?.navigate(item, props?.getPackageUrl);
                  }}
                  style={{...styles.mainContainer}}>
                  <ImageBackground
                    borderRadius={10}
                    resizeMode="stretch"
                    style={styles.imageStyle}
                    source={{
                      uri:imageChecked
                      
                    }}>
                      <View style={{...styles.textImageBackground}}>

                    <Text numberOfLines={2} style={{
    ...globalStyles.globalTextStyles3,color:'white',fontSize:hp('1.5'),textAlign:'center',fontFamily:'Poppins'
    
  }}>
                      {item?.name}
                    </Text>
                      </View>
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
    justifyContent:'center',
    alignItems:'center'
  },
  hotTextTouc: {
    backgroundColor: color.boxColor,
    // width: wp('15'),
    height: hp('3'),
    marginLeft: wp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    // padding: 10,
  },

  textImageBackground: {
    backgroundColor: color.textBackgroundColor,
    width: wp('24'),
    alignItems:'center',
    height: hp('6'),
    textAlign: 'center',
    
    color: 'white',
    fontSize: hp('1.6'),
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 8,
  },
});
