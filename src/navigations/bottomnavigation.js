import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform, Dimensions, StyleSheet} from 'react-native';
import {screens} from '../screens/index';
import * as Animatable from 'react-native-animatable';
import {color} from '../components/color';
import { globalStyles } from '../config/globalStyles';


const Tab = createBottomTabNavigator();
function MybottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: 'transparent',
        headerShown: false,
        tabBarActiveBackgroundColor: color.boxColor,
        tabBarInactiveBackgroundColor: color.boxColor,
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: {

          height: hp('8'),
          paddingBottom: hp('0'),
          bottom: Platform.OS == 'ios' ? hp('4') : hp('2'),
          width: wp('90'),
          alignSelf: 'center',
          borderRadius: Platform.OS == 'android' ? 10 : 20,
          overflow: 'hidden',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Animatable.View
              animation="fadeInUpBig"
              direction={'normal'}
              delay={200}>
              <Ionicons
                name={color == '#ffff' ? 'home' : 'home-outline'}
                color={'white'}
                size={hp('3')}
              />
            </Animatable.View>
          ),
          title: 'Home',
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: hp('1'),
            color: 'white',
            ...globalStyles.globalTextStyles3,

          },
        }}
        component={screens.HomeScreen}
      />
      <Tab.Screen
        name="userScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Animatable.View
              animation="fadeInRightBig"
              direction={'normal'}
              delay={300}>
              <Ionicons
                name={color == '#ffff' ? 'person' : 'person-outline'}
                color={'white'}
                size={hp('3')}
              />
            </Animatable.View>
          ),
          title: 'Profile',
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: hp('1'),
            color: 'white',
            ...globalStyles.globalTextStyles3,

          },
        }}
        component={screens.userScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;

const styles = StyleSheet.create({
  cartCircle: {
    backgroundColor: color.textSecondaryColor,
    position: 'absolute',
    bottom: hp('-2'),
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.18,
    height: Dimensions.get('screen').width * 0.18,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cartInsideCircle: {
    backgroundColor: color.textSecondaryColor,
    position: 'absolute',
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.15,
    height: Dimensions.get('screen').width * 0.15,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: color.badgeColor,
  },
});
