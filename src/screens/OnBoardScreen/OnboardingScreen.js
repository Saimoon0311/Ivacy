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

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../../images/Onboard1.png'),
    title: 'Pay with Crypto.',
    subtitle:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est',
  },
  {
    id: '2',
    image: require('../../images/Onboard2.png'),
    title: 'Find new places',
    subtitle:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est',
  },
  {
    id: '3',
    image: require('../../images/Onboard3.png'),
    title: 'Communicate with friends',
    subtitle:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est',
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
            // marginTop: 10,
            paddingLeft: wp('28'),
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
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

        <View>
          {currentSlideIndex == slides.length - 1 ? (
            <View
              style={{
                marginLeft: wp('15'),
                marginTop: hp('-10'),
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
              <ArrowButtonCom
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
      <ImageBackground style={styles.imageBackgroundStyle} source={item?.image}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <View
              style={{
                width: wp('140'),
              }}>
              <Text style={styles.subtitle}>{item?.subtitle}</Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: hp('-8'),
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
    height: hp('100'),
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
    fontSize: wp('10'),
    width: wp('80'),
    paddingLeft: wp('5'),
    // textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
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
