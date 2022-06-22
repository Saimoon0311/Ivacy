import React, {useState} from 'react';
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
import {NoDataView} from '../../components/NoDataView/noDataView';

export default function packageScreen({route, navigation}) {
  const goBack = () => {
    navigation.goBack();
  };
  const [isloading, setIsloading] = useState(true);
  let items = route.params;
  console.log(21, items);
  setTimeout(() => {
    setIsloading(false);
  }, 1000);
  const loaderView = () => {
    return <View style={{marginTop: hp('3')}}>{placeholderView()}</View>;
  };
  return (
    <View>
      <BackHeaderCom goBack={goBack} text={items?.countryName} />
      {isloading ? (
        <SkeletonPlaceholder>
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
        </SkeletonPlaceholder>
      ) : items.data.length == 0 ? (
        <NoDataView text="No Package Found" />
      ) : (
        <FlatList
          data={items.data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          contentContainerStyle={{
            paddingBottom: hp('10'),
            alignSelf: 'center',
            paddingTop: hp('3'),
          }}
          renderItem={({item}) => {
            return (
              <View style={{marginBottom: hp('3')}}>
                <FrontPackageCom
                  onPress={() =>
                    navigation.navigate('PackageDetailScreen', item)
                  }
                  data={item}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
