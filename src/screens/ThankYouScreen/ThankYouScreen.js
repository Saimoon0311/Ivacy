import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../components/color';
import {VerticalCityImageComponent} from '../../components/VerticalCityImageComponent/VerticalCityImageComponent';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CountryNameUrl} from '../../config/Urls';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiGet} from '../../config/helperFunction';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  HttpEvent,
  MotionActivityEvent,
  MotionChangeEvent,
  ProviderChangeEvent,
  ConnectivityChangeEvent,
} from 'react-native-background-geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ThankYouScreen = () => {
  const [countryPicker, setCountryPicker] = useState([]);

  const [isloading, setIsloading] = useState(true);
  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      console.log(res.json, 56666666666);
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

  // useEffect(() => {
  //   getAllCountryName();
  //   BackgroundGeolocation.ready(config).then(state => {
  //     // YES -- .ready() has now resolved.
  //     BackgroundGeolocation.getCurrentPosition(options);
  //     BackgroundGeolocation.start();
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../images/Logo.png')}
        />
        {/* <MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    /> */}
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
