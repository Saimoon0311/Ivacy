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
import moment from 'moment/moment';

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
    if (activities.length > 0) {
      activities.map(res => {
        allActivitesId = [...allActivitesId, JSON.stringify(res.id)];
      });
    }
  };

  const getPackagesByFilter = async url => {
    const {startPrice, country_id, favored_id, startDate, endDate, activities} =
      items.data;
    await getfilterFavourdIds(activities);
    let body = JSON.stringify({
      country_id: country_id,
      from_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
      price: startPrice,
      favored: favored_id,
      // activities: ['19', '56'],
      activities: [],
      // activities: allActivitesId,
    });
    console.log(73, body);
    ApiPost(url, body, false).then(res => {
      if (res.status == 200 || res.status == 404) {
        setAllPackage(res.json.data);
        setIsloading(false);
      } else {
        console.log(78, res.json);
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
