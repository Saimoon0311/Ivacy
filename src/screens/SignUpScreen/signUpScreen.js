import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {CountryNameUrl, SignUpUrl} from '../../config/Urls';
import {styles} from './styles';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {color} from '../../components/color';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../config/globalStyles';
import {errorMessage} from '../../components/NotificationMessage';
import * as Animatable from 'react-native-animatable';

export default function SignUpScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('25'));
  const [signUpUser, setSignUpUser] = useState({
    username: '',
    email: '',
    password: '',
    country_id: '',
  });
  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
    country_id: false,
  });
  const [signUpCofirm, setSignUpConfirm] = useState(false);
  const [countryPicker, setCountryPicker] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {username, email, password, country_id} = signUpUser;
  const updateState = data => setSignUpUser(() => ({...signUpUser, ...data}));

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
      username != '' &&
      username != null &&
      email != '' &&
      email != null &&
      password != '' &&
      password != null &&
      country_id != '' &&
      country_id != null &&
      reg.test(email) === true
    ) {
      let body = JSON.stringify({
        username: username,
        email: email,
        password: password,
        country_id: country_id,
      });
      console.log('body', body);
      ApiPost(SignUpUrl, body, false).then(res => {
        console.log('res', res);
        if (res.status == 200) {
          setLoading(false);
          setSignUpConfirm(true);
        } else if (res.status == 401) {
          setLoading(false);
          errorMessage(res.json.message);
        } else {
          errorMessage('Network request failed.');
          setLoading(false);
        }
      });
    } else {
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
        setKeyboardVisible(hp('25')); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  // const awesomeAlert = ()=>{
  //   return (
  //     <AwesomeAlert
  //       show={showAlert}
  //       showProgress={false}
  //       title="Delete a Post!"
  //       customView={()=>{
  //         return(

  //         )
  //       }}
  //       message="Are you sure you want to remove this post?"
  //       contentContainerStyle={{
  //         width: wp('80%'),
  //         backgroundColor: color.postDivider,
  //       }}
  //       overlayStyle={{backgroundColor: color.alertBgColor}}
  //       closeOnTouchOutside={true}
  //       closeOnHardwareBackPress={true}
  //       showCancelButton={true}
  //       showConfirmButton={true}
  //       confirmText="Yes"
  //       cancelText="No"
  //       confirmButtonStyle={styles.buttonstyle}
  //       cancelButtonStyle={styles.buttonstyle}
  //       cancelButtonTextStyle={{fontSize: hp('2.2%'), textAlign: 'center'}}
  //       confirmButtonTextStyle={{fontSize: hp('2.2%'), textAlign: 'center'}}
  //       titleStyle={{color: color.defaultTextColor}}
  //       messageStyle={{color: 'gray', textAlign: 'center'}}
  //       onConfirmPressed={() => {
  //         deletePost();
  //         setShowAlert(false);
  //       }}
  //       onCancelPressed={() => {
  //         setShowAlert(false);
  //       }}
  //     />
  //   );
  // }
  return (
    <View>
      <ImageBackground
        source={require('../../images/background.png')}
        style={styles.backgroundImage}>
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
        {signUpCofirm == false ? (
          <>
            <Animatable.Text
              animation="fadeInUpBig"
              direction={'normal'}
              delay={200}
              style={styles.mainHeading}>
              Signup
            </Animatable.Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: isKeyboardVisible}}>
              <View style={{width: wp('90'), alignSelf: 'center'}}>
                <Animatable.View
                  animation="fadeInUpBig"
                  direction={'normal'}
                  delay={300}>
                  <TextInputCom
                    value={username}
                    onChangeText={username => updateState({username})}
                    inputText="Username"
                    placeholder="User Name"
                    onFocus={() => handleInputFocus('username')}
                    onBlur={() => handleInputBlur('username')}
                    isFocused={isFocused.username}
                  />
                </Animatable.View>
                <Animatable.View
                  animation="fadeInUpBig"
                  direction={'normal'}
                  delay={400}>
                  <TextInputCom
                    value={email}
                    onChangeText={email => updateState({email})}
                    inputText="email"
                    placeholder="mail@gmail.com"
                    onFocus={() => handleInputFocus('email')}
                    onBlur={() => handleInputBlur('email')}
                    isFocused={isFocused.email}
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
                {countryPicker.length > 0 && (
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
                          country_id != '' || country_id == null
                            ? color.white
                            : color.themeColorDark,
                      }}>
                      <Picker
                        mode="dialog"
                        selectedValue={country_id}
                        dropdownIconColor={'white'}
                        itemStyle={{color: 'white'}}
                        dropdownIconRippleColor="red"
                        style={{color: 'white'}}
                        onValueChange={country_id => {
                          updateState({country_id});
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
                )}

                <Animatable.View
                  animation="fadeInUpBig"
                  direction={'normal'}
                  delay={700}
                  style={styles.bottomView}>
                  <View />
                  <ArrowButtonCom
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
              }}>
              We have send you and email to verify your email address
            </Text>
          </Animatable.View>
        )}
      </ImageBackground>
    </View>
  );
}
