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
import {ApiPost} from '../../config/helperFunction';
import {SignUpUrl} from '../../config/Urls';
import {styles} from './styles';
import {showMessage} from 'react-native-flash-message';
import { ArrowButtonCom } from '../../components/ArrowButtonComponenet/arrowButtonCom';
import { color } from '../../components/color';

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
      ApiPost(SignUpUrl, body, false).then(res => {
        console.log(res.json);

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
        }else {
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
             inputText="Username" placeholder="User Name"
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
            <TextInputCom value={password}
              onChangeText={password => updateState({password})}
              inputText="Password"
              placeholder="*********"
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputBlur('password')}
              secureTextEntry={show ? false : true}
              eyeIconPress={handleClick}
              eyeIconName={show ? 'eye-outline' : 'eye-off-outline'}
              isFocused={isFocused.password}
              eyeIcon={true} />
            <TextInputCom
             value={country_id}
             onChangeText={country_id => updateState({country_id})}
             inputText="Country Code"
             placeholder="Country Code" 
             onFocus={() => handleInputFocus('country_id')}
             onBlur={() => handleInputBlur('country_id')}
             isFocused={isFocused.country_id}
            />
            <View style={styles.bottomView}>
              <View />
            <ArrowButtonCom
                loading={isloading}
                onPress={() => signUpFunction()}
                text="Register"
                height={hp('4.5')}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
