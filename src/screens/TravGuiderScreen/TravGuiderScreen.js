import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from './style';
import Svg from 'react-native-svg';

const TravGuiderScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require('../../images/trav_guider_image.png')}>
        <View style={styles.InnerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.boxContainer}>
            <Text style={styles.text}>Traveller</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../images/boyimage.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.boxContainer}>
            <Text style={styles.text}>Guider</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../images/guiderimage.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default TravGuiderScreen;
