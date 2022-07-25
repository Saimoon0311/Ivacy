import React from 'react';
import FlashMessage from 'react-native-flash-message';
import AppTwo from './AppTwo';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/Reducer/index';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {useEffect} from 'react';

function App() {
  const getToken = () => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(token => {
        // store.dispatch({
        //   type: types.getToken,
        //   payload: token,
        // });
        console.log('token23456789', token);
      })
      .catch(e => {
        console.log(22, e);
      });
    // const unsubscribe = messaging().onMessage(async remoteMsg => {
    //   const channelId = Math.random().toString(36).substring(7);
    //   // createChannel(channelId);
    //   showNotification(channelId, {
    //     bigImage: remoteMsg.notification.imageUrl,
    //     title: remoteMsg.notification.title,
    //     message: remoteMsg.notification.body,
    //     subText: remoteMsg.data.subTitle,
    //     customData: remoteMsg.data.customData,
    //   });
    //   console.log('remoteMs', remoteMsg);
    // });
    // messaging().setBackgroundMessageHandler(async remoteMsg => {
    //   console.log('remoteMs background', remoteMsg);
    // });
    // return unsubscribe;
  };
  useEffect(async () => {
    await messaging().registerDeviceForRemoteMessages();
    // getToken();
    const token = await firebase.messaging().getToken();
    console.log(45, token);
    await messaging().requestPermission({
      providesAppNotificationSettings: true,
      sound: true,
      announcement: true,
      provisional: true,
    });
    // if (openSettingsForNotifications) {
    //   navigate('showNotificationScreen');
    // }
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate('showNotificationScreen');
    // });
    // messaging()
    //   .getDidOpenSettingsForNotification()
    //   .then(async didOpenSettingsForNotification => {
    //     if (didOpenSettingsForNotification) {
    //       console.log(8909890);
    //     }
    //   });
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppTwo />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
