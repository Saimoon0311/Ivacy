import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  StripeProvider,
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {StripePublishKey} from '../../config/Urls';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {color} from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const StripeScreen = ({route, navigation}) => {
  const {userData} = useSelector(state => state.userData);
  let item = route.params;
  const {
    confirmPayment,
    initPaymentSheet,
    presentPaymentSheet,
    retrievePaymentIntent,
    retrieveSetupIntent,
  } = useStripe();
  const [stripeData, setStripeData] = useState({
    clientSecret: '',
    stripeValue: '',
  });
  const {stripeValue, clientSecret} = stripeData;
  const updateState = data => setStripeData(prev => ({...prev, ...data}));
  const fetchClientSecret = async () => {
    let amountToSend = item.price * 100;
    let url = 'http://192.168.0.57:2000/api/user/StripePayIntent';
    ///////////////
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountToSend,
      }),
    })
      .then(response => response.json())
      .then(res => {
        updateState({clientSecret: res?.client_secret});
        updateState({stripeValue: res});
        initPaymentScreenStripe(res?.client_secret);
      })
      .catch(err => {
        console.log(122, err);
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
    // if (error) {
    //   console.log(119, error);
    // } else {
    // }
    handlePayment(data);
  };
  const startPaymentProcess = async () => {
    await fetchClientSecret();
  };

  const handlePayment = async data => {
    const {error} = await presentPaymentSheet({
      clientSecret: data,
    });

    if (error) {
      setIsLoading(false);
    } else {
      const {paymentIntent, error} = await retrievePaymentIntent(data);
      if (paymentIntent) {
        hitOrderPlaceApi(paymentIntent);
      }
    }
  };
  useEffect(() => {
    startPaymentProcess();
  }, []);
  return (
    <StripeProvider publishableKey={StripePublishKey}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </StripeProvider>
  );
};

export default StripeScreen;
