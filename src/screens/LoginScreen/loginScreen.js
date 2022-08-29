import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {styles} from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {LoginUrl, UserUrl} from '../../config/Urls';
import {useDispatch} from 'react-redux';
import types from '../../Redux/type';
import {errorMessage} from '../../components/NotificationMessage';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';

const LoginScreen = ({route, navigation}) => {
  const disptach = useDispatch();
  const LoginType = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('0'));
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
    // email: 'saimoon@gmail.com',
    // password: 'password',
  });
  const [isloading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
  const [alertState, setALertState] = useState(false);
  const AwesomeAlertMessage = () => {
    return (
      <AwesomeAlert
        show={alertState}
        showProgress={false}
        title="Warning!"
        message="Account deletion is in process, please verify your email to delete your ivacay account."
        contentContainerStyle={{
          width: wp('80%'),
          backgroundColor: 'white',
        }}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonStyle={styles.buttonstyle}
        cancelButtonStyle={styles.buttonstyle}
        confirmButtonTextStyle={{
          textAlign: 'center',
          color: color?.textPrimaryColor,
          fontSize: hp('2.2%'),
        }}
        titleStyle={{
          color: color.textPrimaryColor,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
        messageStyle={{color: 'gray', textAlign: 'center', color: 'black'}}
        onConfirmPressed={() => {
          setALertState(false);
        }}
      />
    );
  };
  const {email, password} = loginUser;
  const updateState = data => setLoginUser(() => ({...loginUser, ...data}));
  // Focused handler
  const handleInputFocus = textinput => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = textinput => {
    setIsFocused({
      [textinput]: false,
    });
  };
  // XXXXXXXXXXXX

  const loginFunction = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setLoading(true);
    if (
      email != '' &&
      email != null &&
      password != '' &&
      password != null &&
      reg.test(email) === true
    ) {
      let body = JSON.stringify({
        email: email,
        password: password,
      });
      ApiPost(LoginUrl, body, false).then(res => {
        if (res.status == 200) {
          disptach({
            type: types.LoginType,
            payload: res.json,
          });
          setLoading(false);
        } else if (
          res.status == 401 &&
          res.json.message == 'Please check email'
        ) {
          setLoading(false);
          setALertState(true);
        } else if (res.status == 401) {
          setLoading(false);
          errorMessage(res.json.message);
        } else {
          errorMessage('Network Request Failed.');
          setLoading(false);
        }
      });
    } else {
      errorMessage('Plesae type correct information.');
      setLoading(false);
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(hp('55')); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(hp('0')); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../images/background.png')}>
        <TouchableOpacity
          style={{
            top: hp('2'),
            left: wp('2'),
            zIndex: 1,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: 'white', fontSize: hp('2'), fontWeight: 'bold'}}>
            Go Back
          </Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{paddingBottom: isKeyboardVisible}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View
            animation="fadeInUpBig"
            direction={'normal'}
            delay={100}
            style={styles.innerView}>
            <Image
              source={require('../../images/Group680.png')}
              style={{
                marginRight: 'auto',
                marginLeft: wp('-10'),
              }}
            />
          </Animatable.View>
          <View style={styles.loginView}>
            <Animatable.Text
              animation="fadeInUpBig"
              direction={'normal'}
              delay={200}
              style={styles.mainHeading}>
              Login
            </Animatable.Text>
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={300}>
              <TextInputCom
                value={email}
                onChangeText={email => updateState({email})}
                inputText="Email"
                placeholder="mail@gmail.com"
                onFocus={() => handleInputFocus('email')}
                onBlur={() => handleInputBlur('email')}
                isFocused={isFocused.email}
              />
            </Animatable.View>
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={400}>
              <TextInputCom
                value={password}
                onChangeText={password => updateState({password})}
                inputText="Password"
                placeholder="*********"
                onFocus={() => handleInputFocus('password')}
                onBlur={() => handleInputBlur('password')}
                secureTextEntry={show ? false : true}
                eyeIconPress={handleClick}
                eyeIconName={show ? 'eye-outline' : 'eye-off-outline'}
                isFocused={isFocused.password}
                eyeIcon={true}
              />
            </Animatable.View>
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={500}>
              <TouchableOpacity
                onPress={() => {
                  let forgetPass = 'https://ivacay.co/forgot-password';
                  Linking.openURL(forgetPass);
                }}
                style={styles.forgotTextView}>
                <Text
                  style={{
                    color: color.themeColorDark,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={600}
              style={styles.bottomView}>
              {LoginType == 'Traveller' ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.newUserText}>New User ? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={styles.signupText}> Signup</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
              <ArrowButtonCom
                loading={isloading}
                onPress={() => loginFunction()}
                text="Submit"
                height={hp('4.5')}
              />
            </Animatable.View>
          </View>
        </ScrollView>
      </ImageBackground>
      {AwesomeAlertMessage()}
    </View>
  );
};

export default LoginScreen;
