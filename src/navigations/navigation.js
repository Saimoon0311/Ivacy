import React,{useEffect,useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../screens';
import MybottomTabs from './bottomnavigation';
import OnboardingScreen from '../screens/OnBoardScreen/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function StackNavigatior() {
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
      }}
      initialRouteName="HomeScreen">
      {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
      <Stack.Screen name="MybottomTabs" component={MybottomTabs} />

    </Stack.Navigator>
  )}
  </>
  );
}
