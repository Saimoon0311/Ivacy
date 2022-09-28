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
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {SearchFilter, SearchFilterUrl, SearchrUrl} from '../../config/Urls';
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
  // const [allActivitesId, setAllActivitesId] = useState([]);
  var allActivitesId = [];
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

  const getfilterFavourdIds = activities => {
    console.log(54, activities);
    if (activities.length > 0) {
      activities.map(res => {
        console.log(54, res.id);
        allActivitesId = [...allActivitesId, res.id];
        // setAllActivitesId(...allActivitesId, res.id);
      });
    }
  };

  const getPackagesByFilter = async url => {
    const {startPrice, country_id, favored_id, startDate, endDate, activities} =
      items.data;
    await getfilterFavourdIds(activities);
    console.log(53, items.data);
    let body = JSON.stringify({
      country_id: country_id,
      from_date: startDate,
      end_date: endDate,
      price: startPrice,
      favored: favored_id,
      activities: allActivitesId,
    });
    console.log(72, body, url);

    ApiPost(url, body, false).then(res => {
      console.log(62, res.json);
      if (res.status == 200 || res.status == 404) {
        setAllPackage(res.json.data);
        setIsloading(false);
      } else {
        setIsloading(false);
        errorMessage('Network Request Failed');
      }
    });
  };

  const getPackagesById = () => {
    let url = items?.url + items?.data?.id;
    ApiGet(url).then(res => {
      if (res.status == 200) {
        setAllPackage(res.json.data);
        setIsloading(false);
      } else {
        setIsloading(false);
        errorMessage('Network Request Failed');
      }
    });
  };

  const getPackages = () => {
    if (items?.url == SearchFilterUrl) {
      getPackagesByFilter(SearchFilterUrl);
    } else {
      getPackagesById();
      // setIsloading(false);
      // errorMessage('PLease Select Country');
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
