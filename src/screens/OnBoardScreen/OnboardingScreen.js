import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {color} from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from 'react-native-paper';
import {ArrowButtonCom} from '../../components/ArrowButtonComponenet/arrowButtonCom';
import {useDispatch} from 'react-redux';
import types from '../../Redux/type';
import { ArrowButtonComponenetDup } from '../../components/ArrowButtonComponenetDup/ArrowButtonComponenetDup';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../../images/Onboard1.png'),
    title: 'Pay with Crypto.',
    subtitle:
      'You can make Payments with some Service Providers with Crypto Currency where available. Download and Connect your Crypto Wallet to pay for your services. Currently Metamask is our wallet of choice. We also offer debit and credit card as alternative payment methods.',
  },
  {
    id: '2',
    image: require('../../images/Onboard2.png'),
    title: 'Find new places',
    subtitle:
      'Connect with Local Tour Guides for your vacation and Entertainment needs. Private & Group tours available. Discover hidden gateways and create memorable experiences.',
  },
  {
    id: '3',
    image: require('../../images/Onboard3.png'),
    title: 'Communicate with friends',
    subtitle:
      'Find & share your favorite restaurants, activities, attractions, places to stay, shopping and connect with your friends!',
  },
];

const OnboardingScreen = ({navigation}) => {
  const disptach = useDispatch();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: hp('7'),
          justifyContent: 'space-between',
          paddingLeft: wp('45'),
    
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginTop: hp('8'),
            paddingLeft: wp('28'),
            // marginBottom: hp('-8'),
          }}>
          {/* Render indicator */}
          {currentSlideIndex != 2 &&
            slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: color.textColor,
                    height: 10,
                    width: 10,
                  },
                ]}
              />
            ))}
        </View>

        <View style={{marginBottom: hp('-4'), marginTop: hp('4')}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View
              style={{
                marginLeft: wp('19'),
              }}>
              <TouchableOpacity
                style={styles.getStartedBtn}
                onPress={() =>
                  disptach({
                    type: types.LunchedCompleted,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: color.textColor,
                  }}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: wp('5.5')}} />
              <ArrowButtonComponenetDup
                  loaderColor={color.boxColor}
                onPress={() => goToNextSlide()}
                mgRight={wp('10')}
                text="Next"
              />
            </View>
          )}
        </View>
      </View>
      // </ImageBackground>
    );
  };

  const Slide = ({item}) => {
    return (

      <ImageBackground style={{...styles.imageBackgroundStyle}} source={item?.image}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <View
              style={{
                width: wp('140'),
                height:hp('25'),
              }}>
              <Text style={styles.subtitle}>{item?.subtitle}</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: Platform.OS == 'android' ? hp('-10') : hp('-15'),
              justifyContent:'center',
              alignItems:'center',
            }}>
            {Footer()}
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <>
      {/* <SafeAreaView style={{ backgroundColor: "yellow"}}> */}
      <StatusBar backgroundColor={color.themColorPrimary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: hp('100')}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: wp('100'),
  flex:1,
  },
  container: {
    paddingTop: hp('50'),
    alignItems: 'baseline',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: wp('4'),
    marginTop: hp('2'),
    maxWidth: '70%',
    lineHeight: 23,
    paddingLeft: wp('5'),
  },
  title: {
    color: COLORS.white,
    fontSize: wp('7'),
    width: wp('90'),
    paddingLeft: wp('5'),
    // textAlign: 'center',
  },
  // image: {
  //   height: '100%',
  //   width: '100%',
  //   resizeMode: 'contain',
  // },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 15,
    marginBottom: hp('2'),
  },
  btn: {
    height: hp('5'),
    width: wp('20'),
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtn: {
    height: hp('5'),
    // width: wp('30'),
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
export default OnboardingScreen;
