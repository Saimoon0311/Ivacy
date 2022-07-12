import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../components/color';
import {VerticalCityImageComponent} from '../../components/VerticalCityImageComponent/VerticalCityImageComponent';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CountryNameUrl} from '../../config/Urls';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiGet} from '../../config/helperFunction';
import MapView, {
  LocalTile,
  MAP_TYPES,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
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
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useRef} from 'react';
import MapViewDirections from 'react-native-maps-directions';

const ThankYouScreen = () => {
  const [countryPicker, setCountryPicker] = useState([]);
  const [dummy, setDummy] = useState(1);
  const [location, setLocation] = useState({
    coords: {
      // latitude: 37.4218708,
      // longitude: -122.0841223,
      latitude: 24.84647610589769,
      longitude: 67.05584044694514,
    },
    // 24.84647610589769, 67.05584044694514
  });
  const mapRef = useRef();
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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        setDummy(dummy + 1);
        console.log(58, position);
        setTimeout(() => {
          console.log(67, location);
        }, 2000);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true},
    );
    // getAllCountryName();
    // BackgroundGeolocation.ready(config).then(state => {
    //   // YES -- .ready() has now resolved.
    //   BackgroundGeolocation.getCurrentPosition(options);
    //   BackgroundGeolocation.start();
    // });
  }, []);
  const {width, height} = Dimensions.get('window');
  const ACPT_RATIO = width / height;
  const latitudeDelta = 0.02;
  const laongituteDalta = latitudeDelta * ACPT_RATIO;

  const onChanegRegin = async position => {
    const camera = await mapRef.current.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current.animateCamera(camera, {duration: 1000});
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../images/Logo.png')}
        />
        <MapView
          mapType={'standard'}
          // mapType={Platform.OS == 'android' ? 'none' : 'standard'}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: laongituteDalta,
          }}
          showsUserLocation={true}
          followUserLocation={true}
          zoomEnabled={true}
          showsMyLocationButton={false}
          // initialRegion={{
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          //   latitudeDelta: latitudeDelta,
          //   longitudeDelta: laongituteDalta,
          // }}
          // provider={PROVIDER_GOOGLE}
        >
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.latitude,
            }}
            destination={{
              latitude: 24.846388483291882,
              longitude: 67.05588336093875,
            }}
            mode="DRIVING"
            optimizeWaypoints={true}
            strokeColor={['red']}
            strokeWidth={5}
            apikey={'AIzaSyCu5v9OrHrhf55iPRd8JIgB_QGAlZpmlj0'}
          />
          <Marker coordinate={location.coords} />
          <Marker
            coordinate={{
              latitude: 24.846388483291882,
              longitude: 67.05588336093875,
            }}
          />
        </MapView>
        {/* <OverlayComponent style={{position: 'absolute', bottom: 50}} /> */}
        <View
          style={{
            width: wp('90'),
            height: hp('7'),
            position: 'absolute',
            top: hp('10'),
            alignSelf: 'center',
            backgroundColor: 'red',
          }}>
          {/* <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyCu5v9OrHrhf55iPRd8JIgB_QGAlZpmlj0',
              language: 'en',
            }}
          /> */}
        </View>
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
