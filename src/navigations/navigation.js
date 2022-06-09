import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../screens';
import MybottomTabs from './bottomnavigation';

const Stack = createNativeStackNavigator();

export default function StackNavigatior() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_left',
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={screens.LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={screens.SignUpScreen} />
      <Stack.Screen name="MybottomTabs" component={MybottomTabs} />
    </Stack.Navigator>
  );
}
