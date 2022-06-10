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
import {styles} from './styles';

export default function SignUpScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('25'));

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
        source={require('../../images/Group679.png')}
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
            <TextInputCom inputText="First Name" placeholder="First Name" />
            <TextInputCom inputText="Last Name" placeholder="Last Name" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
            <TextInputCom inputText="Email" placeholder="mail@gmail.com" />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
