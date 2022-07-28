/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
// messaging().onNotificationOpenedApp(remoteMessage => {
//   console.log(
//     'Notification caused app to open from background state:45678',
//     remoteMessage,
//   );
//   // setInitialRoute('showNotificationScreen'); // e.g. "Settings"
// });
// messaging().setOpenSettingsForNotificationsHandler(async () => {
//   // Set persistent value, using the MMKV package just as an example of how you might do it
//   MMKV.setBool(openSettingsForNotifications, true);
// });
// async function requestUserPermission() {
//   //   await messaging().registerDeviceForRemoteMessages();
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//   }
// }
// requestUserPermission();
AppRegistry.registerComponent(appName, () => App);
