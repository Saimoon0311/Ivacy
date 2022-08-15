import React, {useRef, useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
// import {HARDHAT_PORT, HARDHAT_PRIVATE_KEY} from '@env';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

export default function TestWallet() {
  const connector = useWalletConnect();
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  return (
    <TouchableOpacity onPress={() => connectWallet()}>
      <Text>Textsudvjsbvdjsbd</Text>
    </TouchableOpacity>
  );
}
