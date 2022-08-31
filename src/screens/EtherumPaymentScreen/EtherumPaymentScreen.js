import {
  ScrollView,
  StyleSheet,
  Keyboard,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {DotIndicator} from 'react-native-indicators';
import {color} from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextWithInputComponent from '../../components/txtWithInputComponent/txtWithInputComponent';
import TxtInlineComponent from '../../components/txtInlineComponent/TxtInlineComponent';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import moment from 'moment';
const EtherumPaymentScreen = ({navigation, route}) => {
  const items = route.params;
  const {packageEthValue, invoiceNumber, item} = items;

  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('10'));

  const [hash, setHash] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(true);
  const checkIn = moment(item.from_date).format('ddd, ll');
  const checkOut = moment(item.end_date).format('ddd, ll');
  const [copyState, setCopySate] = useState({
    network: false,
    wallet: false,
    ethValue: false,
  });
  let {network, wallet, ethValue} = copyState;

  function TextCopied(textinput) {
    setCopySate({
      [textinput]: true,
    });
  }
  function AfterTextCopied(textinput) {
    setCopySate({
      [textinput]: false,
    });
  }
  // X
  const timerProps = {
    isPlaying: true,
    size: 80,
    strokeWidth: 6,
  };
  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      {...timerProps}
      isPlaying
      duration={100}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      onComplete={() => setTimer(false)}>
      {({remainingTime}) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(hp('40')); // or some other action
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
    <>
      <BackHeaderCom
        text="Etherum Payment"
        goBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isKeyboardVisible,
          marginTop: hp('1'),
        }}>
        <View style={styles.container}>
          {UrgeWithPleasureComponent()}
          {/* </View> */}
          {/* <View style={styles.loaderContainer} > 
      <DotIndicator color={color.white} 
      size={hp('0.8')}
  /> 
       */}
          {timer == true ? (
            <Text style={styles.bokText}>Your booking is Processing</Text>
          ) : (
            <Text style={[styles.bokText, {color: color.badgeColor}]}>
              Your booking is Expired
            </Text>
          )}
          {timer && (
            <Text style={styles.bokText}>
              Please send your amount within a time
            </Text>
          )}
          <View style={styles.dottedContaier}>
            <Text style={styles.indicateText}>
              Send the indicated amount to the address below :
            </Text>
            <TextWithInputComponent
              copyStat={'network'}
              name={'Network'}
              input={'MAINNET'}
            />
            <TextWithInputComponent
              name={'Wallet Address'}
              input={'OxE60F81d77F4104D52FB2284C029f68aA76767d'}
              iconVisible={true}
              copyStat={wallet}
              onCopy={() => TextCopied('wallet')}
              afterTextCopied={() => AfterTextCopied('wallet')}
            />
            <TextWithInputComponent
              name={'ETH amount'}
              input={JSON.stringify(packageEthValue)}
              iconVisible={true}
              copyStat={ethValue}
              onCopy={() => TextCopied('ethValue')}
              afterTextCopied={() => AfterTextCopied('ethValue')}
            />
          </View>
        </View>
        <View style={styles.secondContainer}>
          <TxtInlineComponent
            name={'Order number'}
            value={invoiceNumber}
            iconVisible={true}
          />
          <TxtInlineComponent name={'Check-in'} value={checkIn} />
          <TxtInlineComponent name={'Check-out'} value={checkOut} />
          <TxtInlineComponent name={'Payment method'} value={'ETH (MAINNET)'} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.totalTxt}> Total Price</Text>
          <View>
            <Text style={styles.totalTxt}>US$ {item.price}</Text>
            <Text style={{color: color.badgeColor, textAlign: 'center'}}>
              Non Refundable
            </Text>
          </View>
        </View>
        {timer && (
          <View style={styles.thirdContainer}>
            <Text style={styles.confirmTxt}>Confirm Order</Text>
            <View
              style={[
                styles.ConfirmInput,
                isFocused && {borderColor: color.darkGreen, borderWidth: 2},
              ]}>
              <TextInput
                style={{flex: 1, height: hp('5')}}
                onBlur={() => setIsFocused(false)}
                onFocus={e => {
                  setIsFocused(true);
                }}
                value={hash}
                placeholder="Hash No"
                onChangeText={text => setHash(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => confirmOrderFunction()}>
              <Text
                style={{
                  color: color.white,
                  fontWeight: 'bold',
                  fontSize: hp('2'),
                }}>
                Payment Confirm
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default EtherumPaymentScreen;
