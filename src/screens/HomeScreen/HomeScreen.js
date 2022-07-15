import {
  Text,
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {FrontPackageCom} from '../../components/FrontPackageComponent/frontPackageCom';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/type';
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
} from '../../config/Urls';
import {color} from '../../components/color';
import {showMessage} from 'react-native-flash-message';
import {LatestPackageFlatlist} from '../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';
import {useCallback} from 'react';
import {errorMessage} from '../../components/NotificationMessage';
import ThankYouScreen from '../ThankYouScreen/ThankYouScreen';

const HomeScreen = ({navigation}) => {
  const disptach = useDispatch();
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
  });
  const updateLoadingState = data => {
    setIsloading(prev => ({...prev, ...data}));
  };
  const navigateToPackage = item => {
    // navigation.navigate('ThankYouScreen', {
    //   data: item,
    //   type: 'getPackage',
    // });
    navigation.navigate('PackageScreen', {
      data: item,
      type: 'getPackage',
    });
  };
  const {latestPackageLoading, countryLoader, favoredLoader} = isloading;
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
      console.log(97, res);
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
      console.log(res, 'CountryName1111');
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

  // const ThankYOuScreen = () => {
  //   navigation.navigate('ThankYOuScreen');
  // };

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
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('3'),
            marginLeft: wp('5'),
          }}>
          Enjoy your life with us!
        </Text>

        <SearchBarComponents
          onPress={() => navigation.navigate('searchBarScreen')}
        />
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('2.8'),
            marginLeft: wp('5'),
          }}>
          Top Destinations
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
          heading={'Top Places'}
          navigate={navigateToPackage}
        />
        <CityImageComponent
          ml={wp('4')}
          data={favoredScenerie}
          isloading={favoredLoader}
          heading={'Favorate Sceneries'}
          navigate={navigateToPackage}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThankYouScreen');
          }}>
          <Text> ReviewScreen For Temperory</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
