import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {FrontPackageCom} from '../../components/FrontPackageComponent/frontPackageCom';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FrontPackageCom />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
