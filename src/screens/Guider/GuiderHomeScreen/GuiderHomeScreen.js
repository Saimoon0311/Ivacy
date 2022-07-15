import {
  Text,
  StatusBar,
  Platform,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {FrontPackageCom} from '../../../components/FrontPackageComponent/frontPackageCom';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../../Redux/type';
import {globalStyles} from '../../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ApiGet} from '../../../config/helperFunction';
import {CountryNameUrl, LatestPackageUrl} from '../../../config/Urls';
import {color} from '../../../components/color';
import {showMessage} from 'react-native-flash-message';
import {LatestPackageFlatlist} from '../../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../../components/CityImageComponrnt/cityImageComponent';
import {useCallback} from 'react';
import {errorMessage} from '../../../components/NotificationMessage';
import ThankYouScreen from '../../ThankYouScreen/ThankYouScreen';

const HomeScreen = ({navigation}) => {
  const disptach = useDispatch();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const navigate = item => {
    navigation.navigate('PackageDetailScreen', item);
  };
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

  // const logoutFun = () => {
  //   let body = {};
  //   setIsloading(true);
  //   ApiPost(LogoutUrl, body, false, userData.access_token).then(res => {
  //     console.log(100, res);
  //     if (res.status == 200) {
  //       setIsloading(false);
  //       dispatch({
  //         type: types.LogoutType,
  //       });
  //     } else if (res.status == 401) {
  //       errorMessage('The app can not authorization form surver.');
  //       setIsloading(false);
  //     } else {
  //       errorMessage('Network Request Failed.');
  //       setIsloading(false);
  //     }
  //   });
  // };

  const onRefresh = useCallback(() => {
    updateLoadingState({latestPackageLoading: true});
    updateLoadingState({countryLoader: true});
    setRefreshing(true);
    wait(2000).then(() => {
      getPackage();
      getCountryName();
      setRefreshing(false);
    });
  }, []);
  const {userData} = useSelector(state => state.userData);
  const [allPackage, setAllPackage] = useState({
    latestPackage: [],
    getCountryData: [],
    packageByCountry: [],
  });
  const [isloading, setIsloading] = useState({
    latestPackageLoading: true,
    countryLoader: true,
  });
  const updateLoadingState = data => {
    setIsloading(prev => ({...prev, ...data}));
  };
  const navigateToPackage = item => {
    navigation.navigate('PackageScreen', {
      data: item,
      type: 'getPackage',
    });
  };
  const {latestPackageLoading, countryLoader} = isloading;
  const updatePackageState = data => {
    setAllPackage(prev => ({...prev, ...data}));
  };
  const {latestPackage, getCountryData} = allPackage;
  const getPackage = () => {
    ApiGet(LatestPackageUrl, userData.access_token).then(res => {
      console.log(userData.access_token, 97);
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
          Top Packages
        </Text>
        {/* <LatestPackageFlatlist
          data={latestPackage}
          isloading={latestPackageLoading}
          navigate={navigate}
        /> */}

        <FlatList
          data={latestPackage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          renderItem={({item}) => {
            return <FrontPackageCom navigate={navigate} data={item} />;
          }}
        />

        {/* <CityImageComponent
          ml={wp('4')}
          data={getCountryData}
          isloading={countryLoader}
          heading={'Top Places'}
          navigate={navigateToPackage}
        />
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('WriteReviewScreen');
          }}>
          <Text> ReviewScreen For Temperory</Text>
        </TouchableOpacity> */}
        {/* <CityImageComponent data={topCities} heading={'Top Activities'} />  */}
        {/* <TouchableOpacity onPress={() => logoutFun()}>Helloo</TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
