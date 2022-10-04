import React from 'react';
import FlashMessage from 'react-native-flash-message';
import AppTwo from './AppTwo';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Redux/Reducer/index';
import {NativeBaseProvider, Box} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {useEffect} from 'react';
// import {MoralisProvider} from 'react-moralis';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Moralis} from 'moralis';
import TestWallet from './testWallet';


function App() {
  // const getToken = () => {
  //   messaging()
  //     .getToken(firebase.app().options.messagingSenderId)
  //     .then(token => {
  //       // store.dispatch({
  //       //   type: types.getToken,
  //       //   payload: token,
  //       // });
  //       console.log('token23456789', token);
  //     })
  //     .catch(e => {
  //       console.log(22, e);
  //     });
  // };
  // useEffect(async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  //   // getToken();
  //   const token = await firebase.messaging().getToken();
  //   console.log(45, token);
  //   await messaging().requestPermission({
  //     providesAppNotificationSettings: true,
  //     sound: true,
  //     announcement: true,
  //     provisional: true,
  //   });
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
  // }, []);
  // Moralis.setAsyncStorage(AsyncStorage);
  // return <TestWallet />;
  // }
  return (
    // <MoralisProvider
    //   appId="qztkryZsOSEruTtDyIaahhDovw9yMzX6DOh5ZlBw"
    //   serverUrl="https://mkenw9w6anse.usemoralis.com:2053/server">
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NativeBaseProvider>
          <AppTwo />
        </NativeBaseProvider>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
    // {/* </MoralisProvider> */}
  );
}

export default App;
