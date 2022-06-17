import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  PlatformColor,
  Platform,
} from 'react-native';
import React from 'react';
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

const HomeScreen = () => {
  const disptach = useDispatch();
  const {userData} = useSelector(state => state.userData);
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
      <FrontPackageCom />
      <TouchableOpacity onPress={() => disptach({type: types.LogoutType})}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
