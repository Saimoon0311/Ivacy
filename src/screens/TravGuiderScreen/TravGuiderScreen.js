import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from './style';
import * as Animatable from 'react-native-animatable';

const TravGuiderScreen = ({navigation}) => {
  const animatableViewGuest = () => {
    return (
      <Animatable.View
        animation="fadeInDownBig"
        direction={'normal'}
        delay={100}>
        <TouchableOpacity
          onPress={() => navigateFun('LoginScreen', 'Traveller')}
          style={styles.boxContainer}>
          <Text style={styles.text}>Guest</Text>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../images/boyimage.png')}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  const animatableViewHost = () => {
    return (
      <Animatable.View animation="fadeInUpBig" direction={'normal'} delay={100}>
        <TouchableOpacity
          onPress={() => navigateFun('LoginScreen', 'Guider')}
          style={styles.boxContainer}>
          <Text style={styles.text}>Host</Text>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../../images/guiderimage.png')}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  const navigateFun = (screenName, Value) => {
    navigation.navigate(screenName, Value);
    // updateState({AnimationDirection: 'normal'});
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="stretch"
        source={require('../../images/trav_guider_image.png')}>
        <View style={styles.InnerContainer}>
          {animatableViewGuest()}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen', 'Traveller')}
            style={styles.boxContainer}>
            <Text style={styles.text}>Guest</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../images/boyimage.png')}
            />
          </TouchableOpacity> */}
          {animatableViewHost()}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen', 'Guider')}
            style={styles.boxContainer}>
            <Text style={styles.text}>Host</Text>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../../images/guiderimage.png')}
            />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default TravGuiderScreen;
