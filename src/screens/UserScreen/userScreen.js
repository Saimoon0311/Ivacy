import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {color} from '../../components/color';
import {globalStyles} from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextImageComponent from '../../components/TextImageComponent/TextImageComponent';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {useDispatch, useSelector} from 'react-redux';
import {ApiPost} from '../../config/helperFunction';
import {AboutTheApp, LogoutUrl, User_Image_Url} from '../../config/Urls';
import types from '../../Redux/type';
import {showMessage} from 'react-native-flash-message';
import {errorMessage} from '../../components/NotificationMessage';
import {SkypeIndicator} from 'react-native-indicators';

const userScreen = ({navigation}) => {
  const {userData} = useSelector(state => state.userData);
  console.log(9, userData);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  const [isReviewloading, setIsReviewloading] = useState(false);
  const logoutFun = () => {
    let body = {};
    setIsloading(true);
    ApiPost(LogoutUrl, body, false, userData.access_token).then(res => {
      console.log(100, res);
      if (res.status == 200) {
        setIsloading(false);
        dispatch({
          type: types.LogoutType,
        });
      } else if (res.status == 401) {
        errorMessage('The app can not authorization form surver.');
        setIsloading(false);
      } else {
        errorMessage('Network Request Failed.');
        setIsloading(false);
      }
    });
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{...styles.container}}>
        {!userData.data.avatar ? (
          <View style={styles.imageLoader}>
            <SkypeIndicator color={color.ThankYouColor} size={hp('6')} />
          </View>
        ) : (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: User_Image_Url + userData.data.avatar}}
          />
        )}
        <Text
          style={{
            ...globalStyles.globalTextStyles,
            textAlign: 'center',
            color: color.blacktext,
            fontSize: hp('2.5'),
          }}>
          {userData.data.username}
        </Text>

        <TextImageComponent iconName={'person'} text={'Personal Information'} />
        {/* <TextImageComponent
          iconName={'language'}
          text={'Language & Communication'}
        /> */}
        <TextImageComponent iconName={'bookmark-outline'} text={'My orders'} />
        {/* <TextImageComponent iconName={'settings-outline'} text={'Settings'} /> */}
        {/* <TextImageComponent iconName={'chatbox'} text={'Support'} /> */}
        <TextImageComponent
          onPress={() => Linking.openURL(AboutTheApp)}
          iconName={'alert-circle-outline'}
          text={'About the app'}
        />
        <TextImageComponent
          onPress={() => navigation.navigate('ReviewScreen')}
          iconName={'md-star-outline'}
          text={'Rate us'}
        />
        <TextImageComponent
          onPress={logoutFun}
          iconName={'log-in-outline'}
          textcolor={color.textThirdColor}
          text={'Log-Out'}
          isloading={isloading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default userScreen;
