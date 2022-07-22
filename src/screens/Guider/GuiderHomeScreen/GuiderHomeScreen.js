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
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {
  FrontPackageCom,
  placeholderView,
} from '../../../components/FrontPackageComponent/frontPackageCom';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../../Redux/type';
import {globalStyles} from '../../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ApiGet, ApiPost} from '../../../config/helperFunction';
import {
  CountryNameUrl,
  GuiderBookPackageUrl,
  LatestPackageUrl,
} from '../../../config/Urls';
import {color} from '../../../components/color';
import {showMessage} from 'react-native-flash-message';
import {LatestPackageFlatlist} from '../../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../../components/CityImageComponrnt/cityImageComponent';
import {useCallback} from 'react';
import {
  errorMessage,
  successMessage,
} from '../../../components/NotificationMessage';
import ThankYouScreen from '../../ThankYouScreen/ThankYouScreen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeScreen = ({navigation}) => {
  const disptach = useDispatch();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const navigate = item => {
    navigation.navigate('GuiderPackageDetailScreen', item);
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
    setRefreshing(true);
    wait(2000).then(() => {
      GuiderBookPackages();
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

  const GuiderBookPackages = () => {
    let body = JSON.stringify({
      guideId: userData.data.id,
    });
    ApiPost(GuiderBookPackageUrl, body, false).then(res => {
      console.log(100, res.data, userData.data.id);
      if (res.status == 200) {
        updatePackageState({latestPackage: res.json.data});
        updateLoadingState({latestPackageLoading: false});
      } else if (res.status == 422) {
        successMessage('The Guider Id Is Required');
        updateLoadingState({latestPackageLoading: true});
      } else {
        errorMessage('Network Request Failed.');
        setIsloading(false);
      }
    });
  };

  useEffect(() => {
    GuiderBookPackages();
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
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerStyle}
            resizeMode={'cover'}
            source={require('../../../images/logo2.png')}
          />
        </View>

        {latestPackageLoading == true ? (
          <SkeletonPlaceholder>
            <View style={{justifyContent: 'center', marginTop: hp('3')}}>
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
              {placeholderView()}
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2.8'),
                marginLeft: wp('5'),
              }}>
              Booked Packages
            </Text>
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
          </View>
        )}
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
