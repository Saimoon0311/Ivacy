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
import { ApiPost } from '../../config/helperFunction';
import { SignUpUrl } from '../../config/Urls';
import {styles} from './styles';
import {showMessage} from 'react-native-flash-message';


export default function SignUpScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('25'));
  const [signUpUser, setSignUpUser] = useState({
    username: '',
    email: '',
    password: '',
    country_id: '',
  });
  const {username, email, password, country_id} = signUpUser;
  const updateState = data => setLoginUser(() => ({...signUpUser, ...data}));

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
      country_id != null
    ) {
      let body = JSON.stringify({
        username: username,
        email: email,
        password: password,
        country_id: country_id,
      });
      ApiPost(SignUpUrl,body,false).then(res=> {
        if(res.status == 200)
        {
          console.log(res.json);
          setLoading(false);

        }
        else if(res.status == 401){
          setLoading(false);
          showMessage({
            type: 'danger',
            icon: 'auto',
            message: 'Warning',
            description: res.json.message,
            floating: true,
            backgroundColor: color.textThirdColor,
            style: {alignItems: 'center'},
          })
        }
      })
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
            <TextInputCom inputText="Username" placeholder="User Name" />
            <TextInputCom inputText="email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="password" placeholder="*********" />
            <TextInputCom inputText="Country Code" placeholder="Country Code" />
        
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
