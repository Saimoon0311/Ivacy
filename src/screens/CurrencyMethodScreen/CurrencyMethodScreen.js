import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {
  AfterStripeUrl,
  CryptoPayUrl,
  StripePayIntent,
  StripePayIntentUrl,
  StripePublishKey,
} from '../../config/Urls';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiPost} from '../../config/helperFunction';
// import {WebView} from 'react-native-webview';

const CurrencyMethodScreen = ({route, navigation}) => {
  const {userData} = useSelector(state => state.userData);
  const item = route.params;
  const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} =
    useStripe();
  const [stripeData, setStripeData] = useState({
    clientSecret: '',
    stripeValue: '',
  });
  const [webView, setWebView] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const {stripeValue, clientSecret} = stripeData;
  const updateState = data => setStripeData(prev => ({...prev, ...data}));
  const fetchClientSecret = async () => {
    let body = JSON.stringify({
      userId: userData.data.id,
      packageId: item.id,
    });
    ApiPost(StripePayIntentUrl, body, false, userData.access_token).then(
      res => {
        console.log(56, res);
        if (res.status == 200) {
          updateState({clientSecret: res.json.pi.client_secret});
          updateState({stripeValue: res.json});
          initPaymentScreenStripe(res?.json.pi.client_secret);
        } else {
          setIsloading(false);
          errorMessage('Unable to fatch data.');
        }
      },
    );
  };
  const initPaymentScreenStripe = async data => {
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: data,
      merchantDisplayName: 'Ivacy',
      primaryButtonColor: 'red',
      customerId: userData.access_token,
      style: [{height: hp('100')}],
    });
    if (error) {
      console.log(566, error);
      errorMessage('Unable to fatch data.');
      setIsloading(false);
    } else {
      handlePayment(data);
    }
  };
  const startPaymentProcess = async () => {
    setIsloading(true);
    await fetchClientSecret();
  };

  const handlePayment = async data => {
    const {error} = await presentPaymentSheet({
      clientSecret: data,
    });
    if (error) {
      errorMessage('Unable to fatch data.');
      setIsloading(false);
    } else {
      const {paymentIntent, error} = await retrievePaymentIntent(data);
      if (paymentIntent) {
        confirmYourOrder(paymentIntent);
      }
    }
  };
  const confirmYourOrder = paymentIntent => {
    let invoiceNumber = Date.now() + Math.random(5).toFixed(0);
    let body = JSON.stringify({
      stripeId: paymentIntent.id,
      userId: userData.data.id,
      packageId: item.id,
      invoiceNumber: invoiceNumber,
    });
    ApiPost(AfterStripeUrl, body, false, userData.access_token).then(res => {
      console.log(109, res, body, userData.access_token);
      if (res.status == 200) {
        setIsloading(false);
        navigation.navigate('ThankYouScreen', res.json.journey);
      } else {
        setIsloading(false);
        errorMessage('Unable to fatch data.');
        alert(
          `Soem error acoures Your StripeId is ${paymentIntent.id} Plaese contact to Admin.`,
        );
      }
    });
  };
  return (
    <StripeProvider publishableKey={StripePublishKey}>
      {isloading && (
        <View style={styles.loadingView}>
          <ActivityIndicator
            size={'large'}
            color="white"
            style={{alignSelf: 'center'}}
          />
          <Text style={{color: 'white', fontSize: hp('3'), fontWeight: 'bold'}}>
            Loading...
          </Text>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.paymenttextstyle}>
          <Text style={styles.text2}>Choose Payment Method</Text>
        </View>
        <View style={styles.InnerContainer}>
          <TouchableOpacity
            onPress={() => {
              // errorMessage('Currently this feature is in working ');
              // setWebView(true);
              navigation.navigate('ThankYouScreen');
            }}
            style={styles.boxContainer}>
            <Text style={styles.text}>Crypto</Text>
            <Image
              style={styles.image}
              source={require('../../images/bitcoin.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsloading(true);
              startPaymentProcess();
            }}
            style={styles.boxContainer}>
            <Text style={styles.text}>Visa</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../images/creditcard.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Modal
        animationType="slide"
        onRequestClose={() => {
          setWebView(false);
        }}
        visible={webView}>
        <WebView
          style={{
            height: hp('50'),
            width: wp('100'),
            marginTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
          }}
          source={{uri: 'http://ivacay.co/pay-with/' + item.id}}
          // onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          // style={{marginTop: 20}}
        />
      </Modal> */}
    </StripeProvider>
  );
};

export default CurrencyMethodScreen;
