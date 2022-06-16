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
  console.log(13, userData);
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  useEffect(() => {
    (async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');

      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    })();
  }, []);
  return (
    <>
      {isAppFirstLaunched != null && (
        <Stack.Navigator
          screenOptions={{
            animation: 'slide_from_left',
            headerShown: false,
          }}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          {userData.access_token ? (
            <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
          ) : (
            <>
              <Stack.Screen
                name="TravGuiderScreen"
                component={screens.TravGuiderScreen}
              />
              <Stack.Screen
                name="LoginScreen"
                component={screens.LoginScreen}
              />
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
        </Stack.Navigator>
      )}
    </>
  );
}
