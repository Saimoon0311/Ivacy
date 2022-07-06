import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {styles} from './styles';
import {SliderBox, FastImage} from 'react-native-image-slider-box';
import {globalStyles} from '../../config/globalStyles';
import {color} from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';
import {CountryNameUrl, IMAGE_BASED_URL} from '../../config/Urls';
import {ApiGet} from '../../config/helperFunction';
import {showMessage} from 'react-native-flash-message';
import {errorMessage} from '../../components/NotificationMessage';

const PackageDetailScreen = ({route, navigation}) => {
  const [countryPicker, setCountryPicker] = useState([]);

  const [isloading, setIsloading] = useState(true);

  const items = route.params;
  const [images, setImage] = useState([
    IMAGE_BASED_URL + items?.get_images[0]?.title,
    IMAGE_BASED_URL + items?.get_images[0]?.title,
    // require('../../images/sale2.png'),
    // require('../../images/sale2.png'),
    // require('../../images/sale2.png'),
  ]);
  const imagesLegth = items?.get_images.map(res => {
    return IMAGE_BASED_URL + res.title;
  });
  const navigateToPackage = item => {
    navigation.navigate('PackageScreen', {
      data: item,
      type: 'getPackage',
    });
  };
  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      if (res.status == 200) {
        setIsloading(false);
        setCountryPicker(res.json.data);
      } else {
        setIsloading(false);
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };

  useEffect(() => {
    getAllCountryName();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: hp('30')}}>
        {/* <BackHeaderCom goBack={goback} /> */}
        <View style={styles.container}>
          <SliderBox
            imageLoadingColor={color.textBackgroundColor}
            ImageComponent={FastImage}
            images={imagesLegth}
            style={styles.flatListMainContainer}
            dotColor={color.textPrimaryColor}
            inactiveDotColor="#90A4AE"
            resizeMode={'cover'}
            autoplay
            circleLoop
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
            }}
          />
          <View style={{marginLeft: wp('2')}}>
            <Text
              style={{...globalStyles.globalTextStyles, fontSize: hp('3.5')}}>
              {items.title}
            </Text>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2'),
                textAlign: 'justify',
                width: wp('95'),
              }}>
              {items.description}
            </Text>
            <Text style={styles.dateStyle}>{items?.from_date}</Text>
            <Text style={styles.toStyle}>To</Text>
            <Text style={styles.dateStyle}>{items?.end_date}</Text>
            <View style={styles.priceMainContainer}>
              <View>
                <Text style={styles.pricetxt}>Price</Text>
                <Text style={styles.packtxt}>${items.price}/package</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CurrencyMethodScreen', items)
                }
                style={styles.boxNowContainer}>
                <Text style={styles.bookNowTxt}>Book Now</Text>
              </TouchableOpacity>
            </View>
            <CityImageComponent
              navigate={navigateToPackage}
              ml={wp('0.1')}
              data={countryPicker}
              isloading={isloading}
              heading={'Top Countries'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageDetailScreen;
