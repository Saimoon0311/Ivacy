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
  });
  const [bottomSheet, setBottomSheet] = useState(false);
  const [loading, setloading] = useState({
    isloading: false,
    bottomSheetLoading: true,
  });
  // const [packageEthValue, setPackageEthValue] = useState('0');
  const {isloading, bottomSheetLoading} = loading;
  const updateLoadingState = data => setloading(prev => ({...prev, ...data}));

  const {stripeValue, clientSecret, packageEthValue, packageData} = stripeData;
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
        updateState({packageEthValue: res.json.data});
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
    updateLoadingState({bottomSheetLoading:true})
    packageData['screenOpenCount'] = 4;
    dispatch({
      type: types.SavePendngPackages,
      payload: packageData,
    });
    let invoiceNumber = Date.now() + Math.random(5).toFixed(0);

    navigation.navigate('EtherumPaynemtScreen', {item,invoiceNumber,packageEthValue});
  };
  useEffect(() => {
    if (bottomSheet == true) {
      getEtherumValue();
    }
  }, [bottomSheet]);
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
                    <Text style={styles.ethValue}>
                      {packageEthValue.toFixed(6)}
                    </Text>
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
    </StripeProvider>
  );
};

export default CurrencyMethodScreen;

{
  /* <View
style={{
  // backgroundColor: 'red',
  backgroundColor: 'rgba(42,42,42,0.6)',
  height: hp('100'),
  width: wp('100'),
  // zIndex: 1,
  position: 'absolute',
}}>
<View
  style={{
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: wp('100'),
    padding: 9,
    bottom: 0,
    position: 'absolute',
  }}>
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text
      style={{
        color: '#0A2463',
        fontSize: hp('1.7'),
        fontWeight: 'bold',
      }}>
      Crypto Payment
    </Text>
    <Entypo
      name="cross"
      color={'#0A2463'}
      style={{marginLeft: 'auto'}}
      size={hp('3')}
      onPress={() => {
        setBottomSheet(false);
        updateLoadingState({isloading: false});
      }}
    />
  </View>
  <View
    style={{
      backgroundColor: 'black',
      height: hp('0.1'),
      width: wp('95'),
      marginTop: hp('1'),
      marginBottom: hp('1'),
      alignSelf: 'center',
    }}
  />
  <ScrollView>
    {bottomSheetLoading ? (
      <SheetLoadingView />
    ) : (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: hp('2'),
          }}>
          <Image
            source={require('../../images/ethereum.png')}
            style={{
              width: wp('10'),
              height: hp('5.5'),
            }}
            resizeMode="contain"
          />
          <Text style={{fontSize: hp('2'), color: 'black'}}>
            Etherum
          </Text>
        </View>
        <Text style={{marginLeft: wp('3')}}>0.3456789</Text>
        {/* <Text style={{marginLeft: wp('3')}}>{packageEthValue}</Text> */
}
//       </View>
//     )}
//   </ScrollView>
// </View>
// </View> */}
