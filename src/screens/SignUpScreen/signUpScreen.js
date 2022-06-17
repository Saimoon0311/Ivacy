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
import {showMessage} from 'react-native-flash-message';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {color} from '../../components/color';
import {Picker} from '@react-native-picker/picker';
import AwesomeAlert from 'react-native-awesome-alerts';

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
        } else {
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
  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      if (res.status == 200) {
        setCountryPicker(res.json.data);
      } else {
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: 'Warning',
          description:
            'Please Check Your Internet connection to get Countries Name.',
          floating: true,
          backgroundColor: color.textThirdColor,
          style: {alignItems: 'center'},
          autoHide: false,
        });
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
        <View style={styles.innerView}>
          <Image
            source={require('../../images/Group680.png')}
            style={{
              marginRight: 'auto',
              marginLeft: wp('-10'),
            }}
          />
        </View>
        <Text style={styles.mainHeading}>Signup</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: isKeyboardVisible}}>
          <View style={{width: wp('90'), alignSelf: 'center'}}>
            <TextInputCom
              value={username}
              onChangeText={username => updateState({username})}
              inputText="Username"
              placeholder="User Name"
              onFocus={() => handleInputFocus('username')}
              onBlur={() => handleInputBlur('username')}
              isFocused={isFocused.username}
            />
            <TextInputCom
              value={email}
              onChangeText={email => updateState({email})}
              inputText="email"
              placeholder="mail@gmail.com"
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              isFocused={isFocused.email}
            />
            {countryPicker.length > 0 && (
              <>
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
              </>
            )}
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
            <View style={styles.bottomView}>
              <View />
              <ArrowButtonCom
                loading={isloading}
                onPress={() => signUpFunction()}
                text="Register"
                height={hp('4.5')}
                right={wp('-35')}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
