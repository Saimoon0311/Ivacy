import {
  Text,
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
  RefreshControl,
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
import {CountryNameUrl, LatestPackageUrl} from '../../config/Urls';
import {color} from '../../components/color';
import {showMessage} from 'react-native-flash-message';
import {LatestPackageFlatlist} from '../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';
import {useCallback} from 'react';

const HomeScreen = ({navigation}) => {
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const navigate = item => {
    navigation.navigate('PackageDetailScreen', item);
  };
  const [value, setValue] = useState();

  const [topCities, setTopCities] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);

  const onRefresh = useCallback(() => {
    updateLoadingState({latestPackageLoading: true});
    setRefreshing(true);
    wait(2000).then(() => {
      getPackage();
      setRefreshing(false);
    });
  }, []);
  const disptach = useDispatch();
  const {userData} = useSelector(state => state.userData);
  const [allPackage, setAllPackage] = useState({
    latestPackage: [],
    getCountryData: [],
  });
  const [isloading, setIsloading] = useState({
    latestPackageLoading: true,
    countryLoader: true,
  });
  const updateLoadingState = data => setIsloading(prev => ({...prev, ...data}));
  const {latestPackageLoading, countryLoader} = isloading;
  const updatePackageState = data =>
    setAllPackage(prev => ({...prev, ...data}));
  const {latestPackage, getCountryData} = allPackage;
  const getPackage = () => {
    ApiGet(LatestPackageUrl, userData.access_token).then(res => {
      if (res.status == 200) {
        updatePackageState({latestPackage: res.json.data});
        updateLoadingState({latestPackageLoading: false});
      } else if (res.status == 404) {
        updatePackageState({latestPackage: []});
        updateLoadingState({latestPackageLoading: false});
      } else {
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: 'Warning',
          description: 'Network Request Faild.',
          floating: true,
          backgroundColor: color.textThirdColor,
          style: {alignItems: 'center'},
        });
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
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: 'Warning',
          description: 'Network Request Faild.',
          floating: true,
          backgroundColor: color.textThirdColor,
          style: {alignItems: 'center'},
        });
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      getCountryName();
      getPackage();
    }, 1000);
  }, []);

  const navigatecountry = item => {
    navigation.navigate('test', item);
  };

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
          navigatecountry={navigatecountry}
          data={getCountryData}
          isloading={countryLoader}
          heading={'Top Country'}
        />
        <CityImageComponent data={topCities} heading={'World Top Hotels'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
