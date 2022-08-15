import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {
  AfterStripeUrl,
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
import {WebView} from 'react-native-webview';
import {useMoralis} from 'react-moralis';
import {useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {Moralis} from 'moralis';
import * as Animatable from 'react-native-animatable';
// const AsyncStorage =
//   require('@react-native-async-storage/async-storage').useAsyncStorage;

const CurrencyMethodScreen = ({route, navigation}) => {
  // const {authenticate, isAuthenticated, user, isAuthenticating, authError} =
  //   useMoralis();
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
  const _onNavigationStateChange = webViewState => {
    console.log(101, webViewState);
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
      if (res.status == 200) {
        setIsloading(false);
        navigation.navigate('ThankYouScreen', res.json.journey);
      } else {
        setIsloading(false);
        errorMessage('Unable to fatch data.');
        alert(
          `Some error acoures Your StripeId is ${paymentIntent.id} Plaese contact to Admin.`,
        );
      }
    });
  };
  // useEffect(() => {
  //   Moralis.setAsyncStorage(AsyncStorage);
  //   if (!isAuthenticated) {
  //     console.log('werwr', authError, user);
  //   } else {
  //     console.log(131, user.getUsername());
  //   }
  // }, [isAuthenticating]);
  return (
    <StripeProvider publishableKey={StripePublishKey}>
      {isloading && (
        <View style={styles.loadingView}>
          <ActivityIndicator
            size={'large'}
            color="white"
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.paymenttextstyle}>
          <Animatable.Text
            animation="fadeInRightBig"
            direction={'normal'}
            delay={100}
            style={styles.text2}>
            Choose Payment Method
          </Animatable.Text>
        </View>
        <View style={styles.InnerContainer}>
          <Animatable.View
            animation="fadeInLeftBig"
            direction={'normal'}
            delay={200}>
            <TouchableOpacity
              onPress={() => {
                errorMessage('This Feature is still on development.');
                // authenticate();
                // errorMessage('Currently this feature is in working ');
                // setWebView(true);
                // navigation.navigate('ThankYouScreen');
              }}
              style={styles.boxContainer}>
              <Text style={styles.text}>Crypto</Text>
              <Image
                style={styles.image}
                source={require('../../images/bitcoin.png')}
              />
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUpBig"
            direction={'normal'}
            delay={300}>
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
          </Animatable.View>
        </View>
        {/* {isAuthenticated && <Text>Welcome {user.get('username')}</Text>} */}
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => {
          setWebView(false);
        }}
        visible={webView}>
        <WebView
          style={{
            height: hp('100'),
            width: wp('100'),
            marginTop: Platform.OS == 'ios' ? hp('5') : hp('0'),
          }}
          source={{
            uri: 'https://ivacay.co/api/meta-mask/1/3',
          }}
          // source={{
          //   uri:
          //     'https://ivacay.co/api/meta-mask/' +
          //     item.id +
          //     '/' +
          //     userData.data.id,
          // }}
          onNavigationStateChange={_onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          // style={{marginTop: 20}}
        />
      </Modal>
    </StripeProvider>
  );
};

export default CurrencyMethodScreen;
