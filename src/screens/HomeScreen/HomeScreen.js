import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TextInputCom inputText="ertyuiop" />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
