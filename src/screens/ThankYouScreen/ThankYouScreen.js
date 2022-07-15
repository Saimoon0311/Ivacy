import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Permission,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../components/color';
import {VerticalCityImageComponent} from '../../components/VerticalCityImageComponent/VerticalCityImageComponent';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CountryNameUrl,
  Google_Map_Key,
  IMAGE_BASED_URL,
} from '../../config/Urls';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiGet} from '../../config/helperFunction';
import MapView, {
  LocalTile,
  MAP_TYPES,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ThankYouScreen = () => {
  const [countryPicker, setCountryPicker] = useState([]);
  const [isloading, setIsloading] = useState(true);
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../images/Logo.png')}
        />
      </View>
      <View style={styles.thankuConatainer}>
        <Text style={styles.thankyouTxt}>Thank You!</Text>
        <Text style={styles.choseusTxt}>for Choosing us</Text>
        <Ionicons
          name="md-checkmark-circle-outline"
          color={'white'}
          size={100}
        />
      </View>

      <View style={styles.orderDetContainer}>
        <Text style={styles.orderDetxt}>Order Details</Text>
        <Ionicons
          name="chevron-down-sharp"
          style={{textAlign: 'center'}}
          color={color.ThankYouColor}
          size={20}
        />
      </View>
      <VerticalCityImageComponent
        name={'alkjsflj'}
        data={countryPicker}
        heading={'Similar Places'}
      />
    </View>
  );
};

export default ThankYouScreen;
