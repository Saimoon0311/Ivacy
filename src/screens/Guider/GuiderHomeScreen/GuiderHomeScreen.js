import {
  Text,
  StatusBar,
  Platform,
  ScrollView,
  RefreshControl,
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
import {GuiderBookPackageUrl} from '../../../config/Urls';
import {color} from '../../../components/color';
import {useCallback} from 'react';
import {
  errorMessage,
  successMessage,
} from '../../../components/NotificationMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NoDataView} from '../../../components/NoDataView/noDataView';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('You have no package yet');
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);
  const navigate = item => {
    navigation.navigate('GuiderPackageDetailScreen', item);
  };
  const logoutFun = () => {
    setTimeout(() => {
      dispatch({
        type: types.LogoutType,
      });
    }, 100);
  };

  const onRefresh = useCallback(() => {
    updateLoadingState({latestPackageLoading: true});
    setRefreshing(true);
    wait(2000).then(() => {
      GuiderBookPackages();
      setRefreshing(false);
    });
  }, []);
  const {userData} = useSelector(state => state.userData);
  const [issloading, setIssloading] = useState(false);
  const [allPackage, setAllPackage] = useState({
    latestPackage: [],
  });
  const [isloading, setIsloading] = useState({
    latestPackageLoading: true,
  });
  const updateLoadingState = data => {
    setIsloading(prev => ({...prev, ...data}));
  };
  const {latestPackageLoading} = isloading;
  const updatePackageState = data => {
    setAllPackage(prev => ({...prev, ...data}));
  };
  const {latestPackage} = allPackage;

  const GuiderBookPackages = () => {
    let body = JSON.stringify({
      guideId: userData.data.id,
    });
    ApiPost(GuiderBookPackageUrl, body, false).then(res => {
      if (res.status == 200) {
        updatePackageState({latestPackage: res.json.data});
        updateLoadingState({latestPackageLoading: false});
      } else if (res.status == 410) {
        setError(res.json.message);
        updateLoadingState({latestPackageLoading: false});
      } else {
        errorMessage('Network Request Failed.');
        setIsloading(false);
      }
    });
  };

  useEffect(() => {
    GuiderBookPackages();
  }, []);

  return (
    <View>
      {/* // <SafeAreaView style={styles.container}> */}
      <StatusBar
        hidden={false}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.headerContainer}>
        <View
          style={{
            width: wp('10'),
            height: hp('5'),
          }}
        />
        <Image
          style={styles.headerStyle}
          resizeMode={'contain'}
          source={require('../../../images/IvaCay-02-01.png')}
        />
        <View
          style={{
            width: wp('10'),
            height: hp('5'),
            marginLeft: 'auto',
          }}>
          <MaterialCommunityIcons
            onPress={() => logoutFun()}
            name="login"
            color={color.orderBoxColor}
            size={hp('4')}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('5')}}>
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
        ) : latestPackage == 0 ? (
          <NoDataView text={error} />
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
      </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default HomeScreen;
