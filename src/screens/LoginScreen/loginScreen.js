import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
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
import types from '../../redux/type';
import {showMessage} from 'react-native-flash-message';

const LoginScreen = ({route, navigation}) => {
  const disptach = useDispatch();
  const LoginType = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('0'));
  const [loginUser, setLoginUser] = useState({
    email: 'martingarix7878@gmail.com',
    password: 'password',
  });
  const [isloading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);
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
        } else if (res.status == 401) {
          setLoading(false);
          showMessage({
            type: 'danger',
            icon: 'auto',
            message: 'Warning',
            description: res.json.message,
            floating: true,
            backgroundColor: color.textThirdColor,
            style: {alignItems: 'center'},
          });
        }
        else {
          showMessage({
            type: 'danger',
            icon: 'auto',
            message: 'Warning',
            description: 'Network Request Failed',
            floating: true,
            backgroundColor: color.textThirdColor,
            style: {alignItems: 'center'},
          });
          setLoading(false);
        }
      });
    } else {
      showMessage({
        type: 'danger',
        icon: 'auto',
        message: 'Warning',
        description: 'Plesae type correct information.',
        floating: true,
        backgroundColor: color.textThirdColor,
        style: {alignItems: 'center'},
      });
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
        <ScrollView
          contentContainerStyle={{paddingBottom: isKeyboardVisible}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.innerView}>
            <Image
              source={require('../../images/Group680.png')}
              style={{
                marginRight: 'auto',
                marginLeft: wp('-10'),
                // display: isKeyboardVisible,
              }}
            />
          </View>
          <View style={styles.loginView}>
            <Text style={styles.mainHeading}>Login</Text>
            <TextInputCom
              value={email}
              onChangeText={email => updateState({email})}
              inputText="Email"
              placeholder="mail@gmail.com"
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              isFocused={isFocused.email}
            />
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
            <TouchableOpacity style={styles.forgotTextView}>
              <Text
                style={{
                  color: color.themeColorDark,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={styles.bottomView}>
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
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
