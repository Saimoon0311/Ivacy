import {
  Text,
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ApiGet} from '../../config/helperFunction';
import {
  CountryNameUrl,
  FavoredSceneriesUrl,
  LatestPackageUrl,
  PackageByCountryUrl,
  PackageBySceneriesUrl,
} from '../../config/Urls';
import {LatestPackageFlatlist} from '../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';
import {useCallback} from 'react';
import {errorMessage} from '../../components/NotificationMessage';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const navigate = item => {
    navigation.navigate('PackageDetailScreen', item);
  };

  const onRefresh = useCallback(() => {
    updateLoadingState({latestPackageLoading: true});
    updateLoadingState({countryLoader: true});
    updateLoadingState({favoredLoader: true});
    setRefreshing(true);
    wait(2000).then(() => {
      getPackage();
      getCountryName();
      favoredSceneries();
      setRefreshing(false);
    });
  }, []);
  const {userData} = useSelector(state => state.userData);
  const [allPackage, setAllPackage] = useState({
    latestPackage: [],
    getCountryData: [],
    packageByCountry: [],
    favoredScenerie: [],
  });
  const [isloading, setIsloading] = useState({
    latestPackageLoading: true,
    countryLoader: true,
    favoredLoader: true,
    pageLoading: true,
  });
  const updateLoadingState = data => {
    setIsloading(prev => ({...prev, ...data}));
  };
  const navigateToPackage = (item, url) => {
    navigation.navigate('PackageScreen', {
      data: item,
      url: url,
    });
  };
  const {latestPackageLoading, countryLoader, favoredLoader, pageLoading} =
    isloading;
  const updatePackageState = data => {
    setAllPackage(prev => ({...prev, ...data}));
  };
  const {latestPackage, getCountryData, favoredScenerie} = allPackage;
  const getPackage = () => {
    ApiGet(LatestPackageUrl, userData.access_token).then(res => {
      if (res.status == 200) {
        updatePackageState({latestPackage: res.json.data});
        updateLoadingState({latestPackageLoading: false});
      } else if (res.status == 404) {
        updatePackageState({latestPackage: []});
        updateLoadingState({latestPackageLoading: false});
      } else {
        errorMessage('Network Request Faild.');
      }
    });
  };
  const favoredSceneries = () => {
    ApiGet(FavoredSceneriesUrl, userData.access_token).then(res => {
      if (res.status == 200) {
        updatePackageState({favoredScenerie: res.json.data});
        updateLoadingState({favoredLoader: false});
      } else if (res.status == 404) {
        updatePackageState({favoredScenerie: []});
        updateLoadingState({favoredLoader: false});
      } else {
        errorMessage('Network Request Faild.');
      }
    });
  };
  const getCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      if (res.status == 200) {
        updatePackageState({getCountryData: res.json.data});
        updateLoadingState({countryLoader: false});
      } else if (res.status == 404) {
        updatePackageState({getCountryData: []});
        updateLoadingState({countryLoader: false});
      } else {
        errorMessage('Network Request Faild.');
      }
    });
  };

  useEffect(() => {
    getPackage();
    getCountryName();
    favoredSceneries();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('5')}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.5'),
            marginLeft: wp('5'),
          }}>
          Your journey start right here!
        </Text>
        <Image 
        resizeMode='contain'
        source={require('../../images/walking.gif')}  
        style={{width: wp('23'), height: hp('8') }}
    />
        </View>
        <SearchBarComponents
          onPress={() => navigation.navigate('searchBarScreen')}
        />
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.2'),
            marginLeft: wp('5'),
          }}>
          Discover Places, Tours & Excursions 
        </Text>
        <LatestPackageFlatlist
          data={latestPackage}
          isloading={latestPackageLoading}
          navigate={navigate}
        />
        <CityImageComponent
          ml={wp('4')}
          data={getCountryData}
          isloading={countryLoader}
          heading={'Hot Deals By Country'}
          navigate={navigateToPackage}
          getPackageUrl={PackageByCountryUrl}
        />
        <CityImageComponent
          ml={wp('4')}
          data={favoredScenerie}
          isloading={favoredLoader}
          heading={'Destinations By Favored Scenery'}
          navigate={navigateToPackage}
          getPackageUrl={PackageBySceneriesUrl}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
