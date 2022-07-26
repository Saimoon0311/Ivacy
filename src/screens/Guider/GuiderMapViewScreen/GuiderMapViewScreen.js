import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
  LocalTile,
  MAP_TYPES,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import Geolocation from 'react-native-geolocation-service';
import {Google_Map_Key} from '../../../config/Urls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../../components/color';
import {styles} from './styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';
import {Picker} from '@react-native-picker/picker';
import io from 'socket.io-client';

const MapViewScreen = ({route, navigation}) => {
  const socket = io('http://192.168.0.111:3000');

  const [selectedValue, setSelectedValue] = useState('java');

  const [dummy, setDummy] = useState(1);
  const [location, setLocation] = useState({
    coords: {
      latitude: 24.929259462116065,
      longitude: 67.08810050245599,
      // 24.929259462116065, 67.08810050245599
      // 24.925704078615606, 67.09097186814968
      // latitude: 55.9389439451934,
      // longitude: -3.2289656424473465,
      // 55.9389439451934, -3.2289656424473465
    },
    // 24.84647610589769, 67.05584044694514
  });
  const mapRef = useRef();
  const {coords} = location;
  let origin = coords;
  let hasLocationPermission = false;
  const getCurrentLocation = () => {
    // GetLocation.getCurrentPosition({
    //   enableHighAccuracy: true,
    // })
    //   .then(location => {
    //     setLocation(51251251, location);
    //     console.log(location);
    //   })
    //   .catch(error => {
    //     const {code, message} = error;
    //     console.warn(code, message);
    //   });

    Geolocation.getCurrentPosition(
      position => {
        // setLocation(position);
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
      if (result == 'granted') {
        hasLocationPermission = true;
      } else {
        hasLocationPermission = false;
      }
    });
    check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
      if (result == 'granted') {
        hasLocationPermission = true;
      } else {
        hasLocationPermission = false;
      }
    });
    setTimeout(() => {
      if (hasLocationPermission == true) {
        // getCurrentLocation();
      } else {
        alert('please enable your location');
      }
    }, 2000);
  };
  const {width, height} = Dimensions.get('window');
  const ACPT_RATIO = width / height;
  const latitudeDelta = 0.02;
  const laongituteDalta = latitudeDelta * ACPT_RATIO;
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: latitudeDelta,
    longitudeDelta: laongituteDalta,
  });
  useEffect(() => {
    socket;
    socket.on(44, position => {
      console.log(11445678978, position);
      setDestination({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: laongituteDalta,
      });
    });
    locationPermessionCheck();
  }, [hasLocationPermission]);

  return (
    <View>
      <MapView
        mapType={'satellite'}
        // mapType={Platform.OS == 'android' ? 'satellite' : 'satellite'}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          // latitude: 55.9389439451934,
          // longitude: -3.2289656424473465,
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
          // origin={{
          //   latitude: 55.9389439451934,
          //   longitude: -3.2289656424473465,
          //   // latitude: location.coords.latitude,
          //   // longitude: location.coords.latitude,
          //   latitudeDelta: latitudeDelta,
          //   longitudeDelta: laongituteDalta,
          // }}
          origin={origin}
          // onReady={res => {
          //   mapRef.current.fitToCoordinates(res.coordinates, {
          //     animated: true,
          //   });
          // }}
          // timePrecision={true}
          precision="high"
          // onStart={params => {
          //   console.log(
          //     `Started routing between "${params.origin}" and "${params.destination}"`,
          //   );
          // }}
          // destination={{
          //   // latitude: 24.846203501300632,
          //   // longitude: 67.05603356184639,
          //   // latitude: 24.928188234567344,
          //   // longitude: 67.08859882835416,
          //   // 24.928188234567344, 67.08859882835416
          //   latitude: 55.938712751001766,
          //   longitude: -3.2303499682549397,
          //   // 55.938712751001766, -3.2303499682549397
          //   // 24.846203501300632, 67.05603356184639
          //   // 55.935225401794355, -3.209938529963149
          //   latitudeDelta: latitudeDelta,
          //   longitudeDelta: laongituteDalta,
          //   // 24.924493890239585, 67.02910107445285
          // }}
          destination={destination}
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
          // coordinate={{
          //   // latitude: 55.9389439451934,
          //   // longitude: -3.2289656424473465,
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          //   // latitude: 55.9389439451934,
          //   // longitude: -3.2289656424473465,
          //   latitudeDelta: latitudeDelta,
          //   longitudeDelta: laongituteDalta,
          // }}
          coordinate={origin}
        />
        <Marker
          coordinate={
            destination
            //   {
            //   // latitude: 24.928188234567344,
            //   // longitude: 67.08859882835416,
            //   latitude: 55.938712751001766,
            //   longitude: -3.2303499682549397,
            //   // 24.84644206199745, 67.05588335771664
            // }
          }
        />
      </MapView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>Share Your Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>
            Notification for Guider
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickercontainer}>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: heightPercentageToDP('1'),
            width: widthPercentageToDP('41.5'),
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="DRIVING" value="driving" />
          <Picker.Item label="TRANSIT" value="transit" />
          <Picker.Item label="WALKING" value="walking" />
        </Picker>
      </View>
    </View>
  );
};

export default MapViewScreen;
