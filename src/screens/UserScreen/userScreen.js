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
import TextImageComponent from '../../components/TextImageComponent/TextImageComponent';
import {useDispatch, useSelector} from 'react-redux';
import {ApiPost} from '../../config/helperFunction';
import {AboutTheApp, LogoutUrl, User_Image_Url} from '../../config/Urls';
import types from '../../Redux/type';
import {errorMessage} from '../../components/NotificationMessage';
import {SkypeIndicator} from 'react-native-indicators';

const userScreen = ({navigation}) => {
  const {userData} = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  const [userImageLoader, setUserImageLoader] = useState(true);
  const [userImage, setUserImage] = useState('');
  const logoutFun = () => {
    let body = {};
    setIsloading(true);
    ApiPost(LogoutUrl, body, false, userData.access_token).then(res => {
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
  function checkImage() {
    var request = new XMLHttpRequest();
    request.open('GET', User_Image_Url + userData.data.avatar, true);
    request.send();
    request.onload = function () {
      if (request.status == 200) {
        //if(statusText == OK)
        setUserImage(User_Image_Url + userData.data.avatar);
        setUserImageLoader(false);
      } else {
        setUserImage(
          'https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg',
        );
        setUserImageLoader(false);
      }
    };
  }
  checkImage();
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{...styles.container}}>
        {userImageLoader ? (
          <View style={styles.imageLoader}>
            <SkypeIndicator color={color.ThankYouColor} size={hp('6')} />
          </View>
        ) : (
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: userImage}}
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
        <TextImageComponent
          onPress={() => navigation.navigate('OrderDetailsScreen')}
          iconName={'bookmark-outline'}
          text={'My booked orders'}
        />
        <TextImageComponent
          onPress={() => navigation.navigate('PendingPackageScreen')}
          iconName={'pending-actions'}
          text={'My pending orders'}
          icon={true}
        />
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
          onPress={() => navigation.navigate('DeleteAccountScreen')}
          iconName={'trash-outline'}
          text={'Delete Your Account'}
          textcolor={'red'}
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
