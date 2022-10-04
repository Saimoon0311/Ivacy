import React, {useRef} from 'react';
import {View, Text, FlatList} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  FrontPackageCom,
  placeholderView,
} from '../FrontPackageComponent/frontPackageCom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

export const LatestPackageFlatlist = props => {
  const isCarousel = useRef(null);

  return props?.isloading ? (
    <SkeletonPlaceholder>{placeholderView()}</SkeletonPlaceholder>
  ) : (
    <View style={{height: hp('40')}}>
      <Carousel
      disableVirtualization={true}
        data={props?.data}
        layout={'tinder'}
        useScrollView={true}
        ref={isCarousel}
        layoutCardOffset={'18'}
        contentContainerStyle={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{
          alignSelf: 'center',
        }}
        sliderWidth={wp('100')}
        itemWidth={wp('100')}
        itemHeight={hp('100')}
        renderItem={({item}) => {
          return (
            <View style={{alignSelf: 'center'}}>
              <FrontPackageCom navigate={props.navigate} data={item} />
            </View>
          );
        }}
      />
    </View>
  );
};
