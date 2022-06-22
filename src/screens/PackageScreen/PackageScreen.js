import React from 'react';
import {View, Text, FlatList} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {
  FrontPackageCom,
  placeholderView,
} from '../../components/FrontPackageComponent/frontPackageCom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function packageScreen({route, navigation}) {
  const goBack = () => {
    navigation.goBack();
  };

  let items = route.params;
  return (
    <View>
      <BackHeaderCom goBack={goBack} text="Filter Screen" />
      {!items ? (
        <SkeletonPlaceholder>
          {placeholderView()}
          {placeholderView()}
          {placeholderView()}
          {placeholderView()}
          {placeholderView()}
          {placeholderView()}
          {placeholderView()}
        </SkeletonPlaceholder>
      ) : items.length == 0 ? null : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          contentContainerStyle={{
            paddingBottom: hp('3'),
            alignSelf: 'center',
          }}
          renderItem={({item}) => {
            return (
              <FrontPackageCom
                onPress={() => navigation.navigate('PackageDetailScreen', item)}
                data={item}
              />
            );
          }}
        />
      )}
    </View>
  );
}
