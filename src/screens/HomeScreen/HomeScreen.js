import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  PlatformColor,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
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

const HomeScreen = () => {
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
    <View style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <Text
        style={{
          ...globalStyles.globalTextStyles,
          marginLeft: wp('5'),
        }}>
        Hi {userData.data.username}
      </Text>
      <Text style={{...globalStyles.globalTextStyles, marginRight: wp('5')}}>
        Enjoy your life with us!
      </Text>
      <LatestPackageFlatlist
        data={latestPackage}
        isloading={latestPackageLoading}
      />
      <TouchableOpacity onPress={() => disptach({type: types.LogoutType})}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
