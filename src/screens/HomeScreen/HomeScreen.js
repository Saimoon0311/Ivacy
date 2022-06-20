import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  PlatformColor,
  Platform,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
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
import {LatestPackageUrl} from '../../config/Urls';
import {color} from '../../components/color';
import {showMessage} from 'react-native-flash-message';
import {LatestPackageFlatlist} from '../../components/LatestPackageFlatlist/latestPackageFlatlist';
import SearchBarComponents from '../../components/SearchBarComponents/SearchBarComponents';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';

const HomeScreen = () => {
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
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const disptach = useDispatch();
  const {userData} = useSelector(state => state.userData);
  console.log(27, userData);
  const [allPackage, setAllPackage] = useState({
    latestPackage: [],
  });
  const [isloading, setIsloading] = useState({
    latestPackageLoading: true,
    load: false,
  });
  const updateLoadingState = data =>
    setIsloading(() => ({...isloading, ...data}));
  const {latestPackageLoading} = isloading;
  const updatePackageState = data =>
    setAllPackage(() => ({...isloading, ...data}));
  const {latestPackage} = allPackage;
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
  useEffect(() => {
    getPackage();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <ScrollView contentContainerStyle={{paddingBottom: hp('5')}}>
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            fontSize: hp('3'),
            marginLeft: wp('5'),
          }}>
          Enjoy your life with us!
        </Text>

        <SearchBarComponents />
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
        />
        <CityImageComponent data={topCities} heading={'Top Cities'} />
        <CityImageComponent data={topCities} heading={'Top Cities'} />
        <TouchableOpacity onPress={() => disptach({type: types.LogoutType})}>
          <Text>HomeScreen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
