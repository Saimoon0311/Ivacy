import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../screens';
import MybottomTabs from './bottomnavigation';
import OnboardingScreen from '../screens/OnBoardScreen/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export default function StackNavigatior() {
  const {userData} = useSelector(state => state.userData);
  const {IsApplunchFirst} = useSelector(state => state.IsApplunchFirst);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_left',
          headerShown: false,
        }}>
        {IsApplunchFirst == true && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        {userData.access_token ? (
          <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
        ) : (
          <>
            <Stack.Screen
              name="TravGuiderScreen"
              component={screens.TravGuiderScreen}
            />
            <Stack.Screen name="LoginScreen" component={screens.LoginScreen} />
            <Stack.Screen
              name="SignUpScreen"
              component={screens.SignUpScreen}
            />
          </>
        )}
        <Stack.Screen
          name="CurrencyMethodScreen"
          component={screens.CurrencyMethodScreen}
        />
        <Stack.Screen
          name="searchBarScreen"
          component={screens.searchBarScreen}
        />
        <Stack.Screen name="PackageScreen" component={screens.PackageScreen} />
        <Stack.Screen
          name="PackageDetailScreen"
          component={screens.PackageDetailScreen}
        />
      </Stack.Navigator>
    </>
  );
}

// {isAppFirstLaunched == true ? (
//   <Stack.Navigator
//     screenOptions={{
//       animation: 'slide_from_left',
//       headerShown: false,
//     }}>
//     {console.log(32, isAppFirstLaunched)}
//     <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
//   </Stack.Navigator>
// ) : (
//   <Stack.Navigator
//     screenOptions={{
//       animation: 'slide_from_left',
//       headerShown: false,
//     }}>
//     {console.log(41, isAppFirstLaunched)}
//     {userData.access_token ? (
//       <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
//     ) : (
//       <>
//         <Stack.Screen
//           name="TravGuiderScreen"
//           component={screens.TravGuiderScreen}
//         />
//         <Stack.Screen
//           name="LoginScreen"
//           component={screens.LoginScreen}
//         />
//         <Stack.Screen
//           name="SignUpScreen"
//           component={screens.SignUpScreen}
//         />
//       </>
//     )}
//     <Stack.Screen
//       name="CurrencyMethodScreen"
//       component={screens.CurrencyMethodScreen}
//     />
//   </Stack.Navigator>
// )}
