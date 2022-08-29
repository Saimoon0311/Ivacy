import React, {useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
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
import {ApiPost} from '../../config/helperFunction';
import {SearchrUrl} from '../../config/Urls';
import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {color} from '../../components/color';
import {useSelector} from 'react-redux';
import {errorMessage} from '../../components/NotificationMessage';
import {useCallback} from 'react';

export default function PackageScreen({route, navigation}) {
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setIsloading(true);
    setRefreshing(true);
    wait(2000).then(() => {
      getPackages();
      setRefreshing(false);
    });
  }, []);
  const {userData} = useSelector(state => state.userData);
  const goBack = () => {
    navigation.goBack();
  };
  const navigate = item => {
    navigation.navigate('PackageDetailScreen', item);
  };
  const [isloading, setIsloading] = useState(true);
  const [allPackage, setAllPackage] = useState([]);
  let items = route.params;
  let type = items.type != 'search' ? '0' : items.data?.is_price;
  let startPrice = items.data?.startPrice ? items.data?.startPrice : '0';
  let endPrice = items.data?.EndPrice ? items.data?.EndPrice : '0';

  const getPackages = () => {
    if (items?.data?.id != null) {
      // let url = SearchrUrl + '233';
      let url = SearchrUrl + items.data.id;
      let body = JSON.stringify({
        is_price: Number(type),
        start_price: startPrice,
        end_price: endPrice,
      });
      ApiPost(url, body, false, userData.access_token).then(res => {
        if (res.status == 200 || res.status == 404) {
          setAllPackage(res.json.data);
          setIsloading(false);
        } else {
          setIsloading(false);
          errorMessage('Network Request Failed');
        }
      });
    } else {
      setIsloading(false);
      errorMessage('PLease Select Country');
    }
  };
  useEffect(() => {
    getPackages();
  }, []);
  const loaderView = () => {
    return <View style={{marginTop: hp('3')}}>{placeholderView()}</View>;
  };
  return (
    <View>
      <BackHeaderCom goBack={goBack} text={items?.data?.name} />
      {isloading ? (
        <SkeletonPlaceholder>
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
          {loaderView()}
        </SkeletonPlaceholder>
      ) : !allPackage || allPackage.length == 0 ? (
        <NoDataView text="No Package Found" />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={allPackage}
          showsVerticalScrollIndicator={false}
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
                  navigate={navigate}
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
