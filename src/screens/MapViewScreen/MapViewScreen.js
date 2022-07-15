import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
  LocalTile,
  MAP_TYPES,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {Google_Map_Key} from '../../config/Urls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../components/color';

const MapViewScreen = ({route, navigation}) => {
  const [dummy, setDummy] = useState(1);
  const [location, setLocation] = useState({
    coords: {
      // latitude: 37.4218708,
      // longitude: -122.0841223,
      latitude: 55.9389439451934,
      longitude: -3.2289656424473465,
      // 55.9389439451934, -3.2289656424473465
    },
    // 24.84647610589769, 67.05584044694514
  });
  const mapRef = useRef();

  let hasLocationPermission = false;
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        setDummy(dummy + 1);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true},
    );
  };
  const locationPermessionCheck = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      console.log(81, result);
      if (result == 'granted') {
        hasLocationPermission = true;
      } else {
        hasLocationPermission = false;
      }
    });
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
      console.log(89, result);
      if (result == 'granted') {
        hasLocationPermission = true;
      } else {
        hasLocationPermission = false;
      }
    });
    setTimeout(() => {
      if (hasLocationPermission == true) {
        getCurrentLocation();
      } else {
        alert('please enable your location');
      }
    }, 2000);
  };
  useEffect(() => {
    locationPermessionCheck();
  }, [hasLocationPermission]);
  const {width, height} = Dimensions.get('window');
  const ACPT_RATIO = width / height;
  const latitudeDelta = 0.02;
  const laongituteDalta = latitudeDelta * ACPT_RATIO;
  return (
    <MapView
      mapType={'satellite'}
      // mapType={Platform.OS == 'android' ? 'satellite' : 'satellite'}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      region={{
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude: 55.9389439451934,
        longitude: -3.2289656424473465,
        latitudeDelta: latitudeDelta,
        longitudeDelta: laongituteDalta,
      }}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      showsMyLocationButton={false}
      focusable={true}
      followsUserLocation={true}
      moveOnMarkerPress={true}
      zoomTapEnabled={true}
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
          latitude: 55.9389439451934,
          longitude: -3.2289656424473465,
          // latitude: location.coords.latitude,
          // longitude: location.coords.latitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: laongituteDalta,
        }}
        destination={{
          latitude: 55.935225401794355,
          longitude: -3.209938529963149,
          // 55.935225401794355, -3.209938529963149
          latitudeDelta: latitudeDelta,
          longitudeDelta: laongituteDalta,
          // 24.924493890239585, 67.02910107445285
        }}
        mode="WALKING"
        optimizeWaypoints={true}
        strokeColor={'red'}
        strokeWidth={2}
        apikey={Google_Map_Key}
        strokeColors={['red']}
      />
      <Marker
        // image={User_Image_Url + }
        style={{backgroundColor: 'yellow'}}
        coordinate={{
          latitude: 55.9389439451934,
          longitude: -3.2289656424473465,
        }}
        //  coordinate={location.coords}
      />
      <Marker
        coordinate={{
          latitude: 55.935225401794355,
          longitude: -3.209938529963149,
        }}
      />
    </MapView>
  );
};
