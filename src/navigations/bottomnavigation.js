import React, {useEffect, useState} from 'react';
import Ionicons from 'npm i react-native-vector-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Platform,
  Dimensions,
} from 'react-native';
import {screens} from '../screens';
import {color} from '../Reusedcomponents/color';
import {Badge} from 'react-native-paper';


const Tab = createBottomTabNavigator();
function MybottomTabs() {
  // const cartDataLength = store.getState().cartDataLength.cartDataLength;
  // const [dummy, setDummy] = useState(1);
  // useEffect(() => {
  //   setDummy(1);
  // }, [cartDataLength]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: color.textPrimaryColor,
        tabBarInactiveTintColor: '#919191',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarStyle: {
          height: hp(Platform?.OS == 'ios' ? '10%' : '8%'),
          backgroundColor: 'white',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="home" color={color} size={hp('3')} />
          ),
          title: `Home`,
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={screens.HomeScreen}
      />

      <Tab.Screen
        name="cartScreen"
        options={{
          tabBarIcon: ({focused, size}) => (
            <View style={styles.cartCircle}>
              <View style={styles.cartInsideCircle}>
                <View
                  style={{
                    position: 'absolute',
                    left: wp('8'),
                    top: hp('-2.5'),
                    borderRadius: Math.round(
                      Dimensions.get('window').width +
                        Dimensions.get('window').height,
                    ),
                    width: Dimensions.get('window').width * 0.08,
                    height: Dimensions.get('window').width * 0.08,
                    backgroundColor: color.white,
                    borderColor: 'red',
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Badge size={22} style={styles.badgeContainer}>
                    {cartDataLength?.length}
                  </Badge>
                </View>
                <Ionicons
                  name="cart-outline"
                  color={'white'}
                  size={hp('5')}
                  style={{alignSelf: 'center', transform: [{rotate: '-10deg'}]}}
                />
              </View>
            </View>
          ),
          title: '',
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={screens.cartScreen}
      />
      <Tab.Screen
        name="catergoryScreen"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="list" color={color} size={hp('3')} />
          ),
          tabBarIconStyle: {
            color: 'red',
          },
          title: 'Category',
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: hp(Platform?.OS == 'ios' ? '0' : '1'),
          },
        }}
        component={screens.catergoryScreen}
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
    fontWeight: 'Poppins-Bold',
    fontSize: hp('1.5'),
    backgroundColor: color.badgeColor,
  },
});
