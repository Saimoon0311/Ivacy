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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {ApiGet, ApiPost, ApiPostFormData} from '../../config/helperFunction';
import {CountryNameUrl, resendEmailUrl, SignUpUrl} from '../../config/Urls';
import {styles} from './styles';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {color} from '../../components/color';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../../config/globalStyles';
import {
  errorMessage,
  successMessage,
} from '../../components/NotificationMessage';
import * as Animatable from 'react-native-animatable';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SkypeIndicator} from 'react-native-indicators';
import {KeyboardAvoidingView} from 'native-base';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import { ArrowButtonComponenetDup } from '../../components/ArrowButtonComponenetDup/ArrowButtonComponenetDup';

export default function SignUpScreen({navigation}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('45'));
  const [signUpUser, setSignUpUser] = useState({
    userName: '',
    email: '',
    password: '',
    countryId: '',
    userImage: [],
    phone: '',
    userRole: 0,
  });
  // sb-ktzwd14471324@personal.example.com
  // p)FUl>U3
  const [isFocused, setIsFocused] = useState({
    userName: false,
    email: false,
    password: false,
    phone: false,
    countryId: false,
  });
  const [timerValue, setTimerValue] = useState(true);

  const [signUpCofirm, setSignUpConfirm] = useState(false);
  const [countryPicker, setCountryPicker] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [userId, setUserId] = useState('');
  const handleClick = () => setShow(!show);
  const {userName, email, password, countryId, userImage, phone, userRole} =
    signUpUser;
  const updateState = data => setSignUpUser(prev => ({...prev, ...data}));

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
  const signUpFunction = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setLoading(true);
    if (
      userName != '' &&
      userName != null &&
      email != '' &&
      email != null &&
      password != '' &&
      password != null &&
      countryId != '' &&
      countryId != null &&
      userImage.length > 0 &&
      phone != null &&
      phone != '' &&
      reg.test(email) === true
    ) {
      var formdata = new FormData();
      formdata.append('userName', userName);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('countryId', countryId);
      formdata.append('phone', Number(phone));
      formdata.append('userRole', userRole);
      formdata.append('userImage', {
        name: userImage[0].fileName,
        uri: userImage[0].uri,
        type: userImage[0].type,
      });
      ApiPostFormData(SignUpUrl, formdata).then(res => {
        if (res.status == 200) {
          const {id} = res.json.data;
          setLoading(false);
          setSignUpConfirm(true);
          setUserId(id);
        } else if (res.status == 401) {
          setLoading(false);
          errorMessage(res.json.message);
        } else {
          errorMessage('Network request failed.');
          setLoading(false);
        }
      });
    } 
    else if(userImage.length==0)
    {
      setLoading(false);
      errorMessage('Kindly select an image');

    }
    else {
      errorMessage('Plesae type correct information.');
      setLoading(false);
    }
  };
  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      if (res.status == 200) {
        setCountryPicker(res.json.data);
      } else {
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };

  const resendEmailFunction = () => {
    setLoading(true);
    ApiGet(resendEmailUrl + userId).then(res => {
      if (res.status == 200) {
        setTimer(false);
        successMessage('Email has been send');
        setLoading(false);
      } else {
        setLoading(false);
        errorMessage(
          "Please Check Your Internet connection to 'Resend Email' ",
        );
      }
    });
  };

  useEffect(() => {
    getAllCountryName();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(hp('60')); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(hp('45')); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const pickImagesFromGalary = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          updateState({userImage: res?.assets});
        }
      },
    );
  };
  const pickImagefromCamera = () => {
    launchCamera(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 300,
        maxHeight: 300,
      },
      res => {
        if (!res?.didCancel) {
          updateState({userImage: res?.assets});
        }
      },
    );
  };

  //TIMER FUNCTION
  const timerProps = {
    isPlaying: timerValue,
    size: 80,
    strokeWidth: 0,
  };
  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      {...timerProps}
      // isPlaying={false}
      duration={60}
      colors={['transparent', 'transparent', 'transparent', 'transparent']}
      colorsTime={[7, 5, 2, 0]}
      onComplete={() => setTimer(true)}>
      {({remainingTime}) => (
        <Text
          style={{
            fontWeight: '500',
            fontSize: hp('3'),
            color: 'white',
            width: wp('50'),
            textAlign: 'center',
          }}>
          {remainingTime + ' sec'}
        </Text>
      )}
    </CountdownCircleTimer>
  );

  return (
    <View>
      <ImageBackground
        source={require('../../images/background.png')}
        style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior={'position'} style={styles.container}>
          <TouchableOpacity
            style={{
              top: hp('4'),
              left: wp('2'),
              // width: wp('10'),
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="arrow-back"
              color={'white'}
              size={hp('5')}
              // style={{top: hp('4'), left: wp('2')}}
            />
          </TouchableOpacity>
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
                // marginTop: hp('9'),
              }}
            />
          </Animatable.View>

          {signUpCofirm == false ? (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: isKeyboardVisible}}>
                <Animatable.Text
                  animation="fadeInUpBig"
                  direction={'normal'}
                  delay={200}
                  style={styles.mainHeading}>
                  Signup
                </Animatable.Text>
                <View style={{width: wp('90'), alignSelf: 'center'}}>
                  <View
                    style={{
                      width: wp('90'),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    {userImage.length != 0 ? (
                      <TouchableOpacity onPress={() => pickImagesFromGalary()}>
                        <Image
                          source={{uri: userImage[0]?.uri}}
                          style={styles.userImage}
                          resizeMode="contain"
                          transition={false}
                        />
                      </TouchableOpacity>
                    ) : (
                      <>
                        <Animatable.View
                          animation="fadeInUpBig"
                          direction={'normal'}
                          delay={300}>
                          <Ionicons
                            name="camera-outline"
                            size={hp('10')}
                            color={'white'}
                            onPress={() => pickImagefromCamera()}
                          />
                        </Animatable.View>
                        <Animatable.View
                          animation="fadeInUpBig"
                          direction={'normal'}
                          delay={400}>
                          <MaterialCommunityIcons
                            name="file-image-plus-outline"
                            size={hp('10')}
                            color={'white'}
                            onPress={() => pickImagesFromGalary()}
                          />
                        </Animatable.View>
                      </>
                    )}
                  </View>
                  <Animatable.View
                    animation="fadeInUpBig"
                    direction={'normal'}
                    delay={300}>
                    <TextInputCom
                      value={userName}
                      onChangeText={userName => updateState({userName})}
                      inputText="Username"
                      placeholder="User Name"
                      onFocus={() => handleInputFocus('userName')}
                      onBlur={() => handleInputBlur('userName')}
                      isFocused={isFocused.userName}
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation="fadeInUpBig"
                    direction={'normal'}
                    delay={400}>
                    <TextInputCom
                      value={email}
                      onChangeText={email => updateState({email})}
                      inputText="Email"
                      placeholder="mail@gmail.com"
                      onFocus={() => handleInputFocus('email')}
                      onBlur={() => handleInputBlur('email')}
                      isFocused={isFocused.email}
                      keyboardType={'email-address'}
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation="fadeInUpBig"
                    direction={'normal'}
                    delay={400}>
                    <TextInputCom
                      value={phone}
                      onChangeText={phone => updateState({phone})}
                      inputText="Phone Number"
                      placeholder="+1 254536"
                      onFocus={() => handleInputFocus('phone')}
                      onBlur={() => handleInputBlur('phone')}
                      isFocused={isFocused.phone}
                      keyboardType="number-pad"
                    />
                  </Animatable.View>
                  <Animatable.View
                    animation="fadeInUpBig"
                    direction={'normal'}
                    delay={500}>
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
                  {countryPicker.length > 0 ? (
                    <Animatable.View
                      animation="fadeInUpBig"
                      direction={'normal'}
                      delay={600}>
                      <Text
                        style={{
                          marginTop: hp('2'),
                          fontSize: hp('2'),
                          color: color.white,
                        }}>
                        Country
                      </Text>
                      <View
                        style={{
                          ...styles.pickerStyle,
                          borderColor:
                            countryId != '' || countryId == null
                              ? color.white
                              : color.themeColorDark,
                        }}>
                        <Picker
                          mode="dialog"
                          selectedValue={countryId}
                          dropdownIconColor={'white'}
                          itemStyle={{color: 'white'}}
                          dropdownIconRippleColor="red"
                          style={{color: 'white'}}
                          onValueChange={countryId => {
                            updateState({countryId});
                          }}
                          collapsable={true}>
                          <Picker.Item
                            style={{color: color.themeColorDark}}
                            key={null}
                            value={null}
                            label={'Select the Country Name'}
                          />
                          {countryPicker.map(res => {
                            return (
                              <Picker.Item
                                key={res.id}
                                value={res.id}
                                label={res.name}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    </Animatable.View>
                  ) : (
                    <SkypeIndicator
                      color={color.white}
                      size={hp('6')}
                      style={{
                        alignSelf: 'center',
                        marginTop: hp('2'),
                      }}
                    />
                  )}

                  <Animatable.View
                    animation="fadeInUpBig"
                    direction={'normal'}
                    delay={700}
                    style={{...styles.bottomView,marginBottom:hp('2')}}>
                    <View />
                    <ArrowButtonComponenetDup
                  loaderColor={color.boxColor}

                      loading={isloading}
                      onPress={() => signUpFunction()}
                      text="Register"
                      height={hp('4.5')}
                      right={wp('-35')}
                    />
                  </Animatable.View>
                </View>
              </ScrollView>
            </>
          ) : (
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={100}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp('10'),
              }}>
              <Ionicons
                name="mail-unread-outline"
                color={'white'}
                size={hp('15')}
              />
              <Text
                style={{
                  ...globalStyles.globalTextStyles,
                  textAlign: 'center',
                  color: 'white',
                  fontSize: hp('3'),
                }}>
                We have send you and email to verify your email address
              </Text>
              {timer == false && UrgeWithPleasureComponent()}
              {timer && (
                <ArrowButtonComponenetDup
                loaderColor={color.boxColor}

                  right={wp('0.5')}
                  loading={isloading}
                  width={wp('37')}
                  text={'Resend Email'}
                  onPress={() => resendEmailFunction()}
                />
              )}
            </Animatable.View>
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
