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
import {ethers} from 'ethers';
import moment from 'moment';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {errorMessage} from '../../components/NotificationMessage';
import {useSelector} from 'react-redux';
import {
  AfterMetaMaskUrl,
  AfterStripeUrl,
  MetaMaskWallet,
} from '../../config/Urls';
import {SkypeIndicator} from 'react-native-indicators';

const EtherumPaymentScreen = ({navigation, route}) => {
  const {userData} = useSelector(state => state.userData);

  const items = route.params;
  const {packageEthValue, invoiceNumber, item} = items;

  const [isKeyboardVisible, setKeyboardVisible] = useState(hp('10'));
  const [timerValue, setTimerValue] = useState(true);

  const [hash, setHash] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [timer, setTimer] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const checkIn = moment(item.from_date).format('ddd, ll');
  const checkOut = moment(item.end_date).format('ddd, ll');
  const [copyState, setCopySate] = useState({
    network: false,
    wallet: false,
    ethValue: false,
  });
  let {network, wallet, ethValue} = copyState;
  const hexToDecimal = hex => {
    return parseInt(hex);
  };
  const checkInputValue = () => {
    setButtonLoader(true);
    if (hash != '' && hash != null) {
      setTimerValue(false);
      confirmOrderFunction();
    } else {
      setButtonLoader(false);
      errorMessage('Please Enter Your Tranction Hash !');
    }
  };
  const confirmOrderFunction = async () => {
    let url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=PCKVEHXYYTJUE2458NP9IQQIJ4RBVAC6YY`;
    ApiGet(url).then(async res => {
      if (res.status == 200 && res.json.result != null) {
        const {from, hash, value} = res.json.result;
        const decValue = await hexToDecimal(value);
        const data = await ethers.utils.formatEther(JSON.stringify(decValue));
        if (data == packageEthValue) {
          orderPlaceFun(from, hash, to);
        } else {
          setTimerValue(true);
          setButtonLoader(false);
          errorMessage('Please pay correct amount to place your package !');
        }
      } else {
        setButtonLoader(false);
        setTimerValue(true);
        errorMessage('Please check your internet connection.');
      }
    });
  };
  const orderPlaceFun = (from, hash) => {
    let body = JSON.stringify({
      userId: userData.data.id,
      packageId: item.id,
      invoiceNumber: invoiceNumber,
      meta_to: MetaMaskWallet,
      meta_hash: hash,
      meta_from: from,
    });
    ApiPost(AfterMetaMaskUrl, body, false, userData.access_token).then(res => {
      if (res.status == 200) {
        setButtonLoader(false);
        navigation.navigate('ThankYouScreen', res.json.journey);
      } else {
        setButtonLoader(false);
        setTimerValue(true);
        errorMessage(res.json.message);
      }
    });
  };
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
    isPlaying: timerValue,
    size: 80,
    strokeWidth: 6,
  };
  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      {...timerProps}
      // isPlaying={false}
      duration={200}
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
              input={MetaMaskWallet}
              iconVisible={true}
              copyStat={wallet}
              onCopy={() => TextCopied('wallet')}
              afterTextCopied={() => AfterTextCopied('wallet')}
            />
            <TextWithInputComponent
              name={'ETH amount'}
              input={packageEthValue}
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
                placeholderTextColor="gray"
                value={hash}
                placeholder="Hash No"
                onChangeText={text => setHash(text)}
              />
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => checkInputValue()}>
              {buttonLoader ? (
                <SkypeIndicator
                  color={color.white}
                  size={hp('3')}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <Text style={styles.payText}>Payment Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default EtherumPaymentScreen;
