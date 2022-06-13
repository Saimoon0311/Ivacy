import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Platform, Dimensions, StyleSheet} from 'react-native';
import {screens} from '../screens/index';
import {color} from '../components/color';

const Tab = createBottomTabNavigator();
function MybottomTabs() {
  // const cartDataLength = store.getState().cartDataLength.cartDataLength;
  // const [dummy, setDummy] = useState(1);
  // useEffect(() => {
  //   setDummy(1);
  // }, [cartDataLength]);
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.borderThirdColor,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarActiveBackgroundColor: color.textPrimaryColor,
        tabBarInactiveBackgroundColor: color.textPrimaryColor,
        tabBarStyle: {
          height: hp(Platform?.OS == 'ios' ? '10%' : '8%'),
          backgroundColor: 'white',
        },
      })}>
      <Tab.Screen
        name="settingScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="settings-outline" color={color} size={hp('3.5')} />
          ),
          title: ``,
          tabBarLabelStyle: {
            fontSize: 0.5,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={screens.settingScreen}
      />

      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={hp('3.5')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0.5,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={screens.HomeScreen}
      />
      <Tab.Screen
        name="userScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="person" color={color} size={hp('3.5')} />
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 0.5,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
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
