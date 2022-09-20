import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {styles} from './style';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {
  AfterStripeUrl,
  ChangeEthValueUrl,
  CheckEthValue,
  StripePayIntentUrl,
  StripePublishKey,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import BottomSheet from 'react-native-easy-bottomsheet';
import RBSheet from 'react-native-raw-bottom-sheet';
// import {useMoralis} from 'react-moralis';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Moralis} from 'moralis';
import * as Animatable from 'react-native-animatable';
import {color} from '../../components/color';
import types from '../../Redux/type';
import WebView from 'react-native-webview';
import axios from 'axios';
// const AsyncStorage =
//   require('@react-native-async-storage/async-storage').useAsyncStorage;

const CurrencyMethodScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  // const {authenticate, isAuthenticated, user, isAuthenticating, authError} =
  //   useMoralis();
  const {userData} = useSelector(state => state.userData);
  const item = route.params;
  const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} =
    useStripe();
  const [stripeData, setStripeData] = useState({
    clientSecret: '',
    stripeValue: '',
    packageEthValue: '0',
    packageData: item,
    accessToken: '',
    approvalUrl: null,
    paymentId: null,
    isVisible: false,
  });

  const [bottomSheet, setBottomSheet] = useState(false);
  const [loading, setloading] = useState({
    isloading: false,
    bottomSheetLoading: true,
  });

  // const [packageEthValue, setPackageEthValue] = useState('0');
  const {isloading, bottomSheetLoading} = loading;
  const updateLoadingState = data => setloading(prev => ({...prev, ...data}));

  const {
    stripeValue,
    clientSecret,
    packageEthValue,
    packageData,
    accessToken,
    approvalUrl,
    paymentId,
    isVisible,
  } = stripeData;
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
          updateLoadingState({isloading: false});
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
      updateLoadingState({isloading: false});
    } else {
      handlePayment(data);
    }
  };
  const startPaymentProcess = async () => {
    updateLoadingState({isloading: true});
    await fetchClientSecret();
  };

  const handlePayment = async data => {
    const {error} = await presentPaymentSheet({
      clientSecret: data,
    });
    if (error) {
      errorMessage('Unable to fatch data.');
      updateLoadingState({isloading: false});
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
      if (res.status == 200) {
        updateLoadingState({isloading: false});
        navigation.navigate('ThankYouScreen', res.json.journey);
      } else {
        updateLoadingState({isloading: false});
        errorMessage('Unable to fatch data.');
        alert(
          `Some error acoures Your StripeId is ${paymentIntent.id} Plaese contact to Admin.`,
        );
      }
    });
  };
  const SheetLoadingView = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color="rgba(42,42,42,0.6)" />
      </View>
    );
  };
  const getEtherumValue = () => {
    let url = ChangeEthValueUrl + item.id;
    ApiGet(url).then(res => {
      if (res.status == 200) {
        // let oneUSD = 1 / res.json.USD;
        // let EthPrice = oneUSD * item.price;
        updateState({packageEthValue: res.json.data.toFixed(6)});
        // Object.freeze(packageEthValue);
        // setPackageEthValue(EthPrice);
        // ETh = EthPrice;
        updateLoadingState({bottomSheetLoading: false});
      } else {
        errorMessage('PLease check it again');
      }
    });
  };
  const afterCryptoProcced = () => {
    setBottomSheet(false);
    updateLoadingState({isloading: false});
    updateLoadingState({bottomSheetLoading: true});
    packageData['screenOpenCount'] = 4;
    dispatch({
      type: types.SavePendngPackages,
      payload: packageData,
    });
    let invoiceNumber = Date.now() + Math.random(5).toFixed(0);

    navigation.navigate('EtherumPaynemtScreen', {
      item,
      invoiceNumber,
      packageEthValue,
    });
  };
  useEffect(() => {
    if (bottomSheet == true) {
      getEtherumValue();
    }
  }, [bottomSheet]);

  //PAYPAL PAYMENT
  const startPayPalProcedureOne = () => {
    console.log(108);
    // let currency = '100';
    // currency.replace(' USD', '');

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append(
      'Authorization',
      'Bearer  A21AALOVDJvmIvZIZU9-ZfxaAkGeL_Ct_3vMVOUNinvURJGxvmN6fW3kgSBxPNAE8dU08NVomcgv0R3In29X4966OfFCUGJTQ',
      // 'Bearer A21AAIJpqBtgJrn0D10-sCw5VqO_FZE2ZCYtkKihjpju5MAtKDxgx2B_DmgHXUgTPq65_MQb8ZBoscmX2uGKWmIHX4dhG0Rzw',
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded.toString(),
      redirect: 'follow',
    };

    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(160, result);
        updateState({accessToken: result.access_token});

        startPayPalProcedureTwo(result.access_token);
      })
      .catch(error => {
        console.log(163, error);
        updateLoadingState({isloading: false});
      });
  };

  const startPayPalProcedureTwo = access_token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + access_token);
    myHeaders.append('Content-Type', 'application/json');
    console.log(access_token, 241);
    // let amount = itemTotalPrice;
    let amount = 12;
    var raw = JSON.stringify({
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: 'USD',
            details: {
              subtotal: amount,
              tax: '0',
              shipping: '0',
              handling_fee: '0',
              shipping_discount: '0',
              insurance: '0',
            },
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.sandbox.paypal.com/v1/payments/payment', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(252, result);
        const {id, links} = result;
        const approvalUrl = links.find(data => data.rel == 'approval_url');

        updateLoadingState({isloading: false});
        updateState({paymentId: id});
        updateState({approvalUrl: approvalUrl.href});
        if (result.state == 'created') {
          updateState({isVisible: true});
        }
      })
      .catch(error => {
        console.log(253, error);
        updateLoadingState({isloading: false});
      });
  };

  const _onNavigationStateChange = webViewState => {
    console.log(208, webViewState);
    if (webViewState.url.includes('https://example.com/')) {
      var url = webViewState.url;
      var paymentId = /paymentId=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
      var PayerID = /PayerID=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)

      console.log(228, url);
      console.log(229, paymentId);
      console.log(230, PayerID);
      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {payerID: PayerID},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          },
        )
        .then(response => {
          console.log(224, response);
          if (response.status == 200) {
            // hitOrderPlaceApi();
          }
        })
        .catch(err => {
          console.log(227, err);
        });
    }
  };

  const BottomSheetView = () => {
    return (
      <>
        <BottomSheet
          bottomSheetTitle={'Crypto Payment'}
          bottomSheetIconColor="#0A2463"
          bottomSheetStyle={{
            backgroundColor: 'white',
            maxHeight: 'auto',
            minHeight: '15%',
          }}
          bottomSheetTitleStyle={{color: '#0A2463'}}
          setBottomSheetVisible={() => {
            setBottomSheet(false);
            updateLoadingState({isloading: false});
            updateLoadingState({bottomSheetLoading: true});
          }}
          bottomSheetVisible={bottomSheet}>
          <ScrollView>
            {bottomSheetLoading ? (
              <SheetLoadingView />
            ) : (
              <View>
                <View style={styles.bottomSheetInnerView}>
                  <Image
                    source={require('../../images/ethereum.png')}
                    style={styles.ethImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.sheetEthText}>Etherum</Text>
                  <View style={{marginLeft: 'auto'}}>
                    <Text style={styles.ethValue}>{packageEthValue}</Text>
                    <Text style={styles.nonRefundableText}>non-refundable</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    afterCryptoProcced();
                  }}
                  style={styles.proccedView}>
                  <Text style={styles.proccedText}>Procced</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </BottomSheet>
      </>
    );
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
        <Ionicons
          style={{top: hp('6'), left: wp('5')}}
          color={'black'}
          size={hp('4')}
          name="arrow-back"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.paymenttextstyle}>
          <Animatable.Text
            animation="fadeInRightBig"
            direction={'normal'}
            delay={100}
            style={styles.text2}>
            Choose Payment Method
          </Animatable.Text>
        </View>
        <TouchableOpacity
          style={{padding: hp('6')}}
          onPress={() => startPayPalProcedureOne()}>
          <Text>Choose Payment Method</Text>
        </TouchableOpacity>
        <View style={styles.InnerContainer}>
          <Animatable.View
            animation="fadeInLeftBig"
            direction={'normal'}
            delay={200}>
            <TouchableOpacity
              onPress={() => {
                // errorMessage('This Feature is still on development.');
                // // authenticate();
                // // errorMessage('Currently this feature is in working ');
                // refRBSheet;
                updateLoadingState({isloading: true});
                setBottomSheet(true);
                // navigation.navigate('EtherumPaynemtScreen', item);
              }}
              style={styles.boxContainer}>
              <Text style={styles.text}>Crypto</Text>
              <Text style={styles.ethText}>(Etherum)</Text>
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
                updateLoadingState({isloading: true});
                startPaymentProcess();
              }}
              style={styles.boxContainer}>
              <Text style={styles.text}>PayPal</Text>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={require('../../images/paypal.png')}
              />
            </TouchableOpacity>
          </Animatable.View>
        </View>
        {/* {isAuthenticated && <Text>Welcome {user.get('username')}</Text>} */}
      </View>
      {bottomSheet && <BottomSheetView />}
      {/* <Modal
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
      </Modal> */}
      {approvalUrl && (
        <Modal
          animationType="slide"
          onRequestClose={() => {
            // setIsVisible(false);
            updateState({isVisible: false});
          }}
          visible={isVisible}>
          <WebView
            style={{
              height: hp('50'),
              width: wp('100'),
              marginTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
            }}
            source={{uri: approvalUrl}}
            onNavigationStateChange={_onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            // style={{marginTop: 20}}
          />
        </Modal>
      )}
    </StripeProvider>
  );
};

export default CurrencyMethodScreen;
