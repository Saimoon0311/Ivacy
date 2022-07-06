import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {StripePayIntent, StripePublishKey} from '../../config/Urls';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiPost} from '../../config/helperFunction';

const CurrencyMethodScreen = ({route, navigation}) => {
  const {userData} = useSelector(state => state.userData);
  let item = route.params;
  const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} =
    useStripe();
  const [stripeData, setStripeData] = useState({
    clientSecret: '',
    stripeValue: '',
  });
  const [isloading, setIsloading] = useState(false);
  const {stripeValue, clientSecret} = stripeData;
  const updateState = data => setStripeData(prev => ({...prev, ...data}));
  const fetchClientSecret = async () => {
    let amountToSend = item.price * 100;

    let body = JSON.stringify({
      amount: amountToSend,
    });
    ApiPost(StripePayIntent, body, false, userData.access_token).then(res => {
      console.log(45, res.json.client_secret);
      if (res.status == 200) {
        updateState({clientSecret: res.json.client_secret});
        updateState({stripeValue: res.json});
        initPaymentScreenStripe(res?.json.client_secret);
      } else {
        setIsloading(false);
        errorMessage('Unable to fatch data.');
      }
    });
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
      console.log(119, error);
      // setIsloading(false);
    } else {
      // setIsloading(false);
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
      console.log(89, error);
      // setIsloading(false);
    } else {
      const {paymentIntent, error} = await retrievePaymentIntent(data);
      if (paymentIntent) {
        setIsloading(false);
        navigation.navigate('ThankYouScreen');
        // hitOrderPlaceApi(paymentIntent);
      }
    }
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
            onPress={() => setIsloading(true)}
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
              setTimeout(() => {
                console.log(123, isloading);
              }, 2000);
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
    </StripeProvider>
  );
};

export default CurrencyMethodScreen;
