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

const LoginScreen = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('0'));

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
        source={require('../../images/Group679.png')}>
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
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Password" placeholder="*********" />
            <TouchableOpacity style={styles.forgotTextView}>
              <Text
                style={{
                  color: color.themeColorDark,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View style={styles.bottomView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.newUserText}>New User ? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text style={styles.signupText}> Signup</Text>
                </TouchableOpacity>
              </View>
              <ArrowButtonCom
                onPress={() => navigation.navigate('MybottomTabs')}
                text="Submit"
                height={hp('4')}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
