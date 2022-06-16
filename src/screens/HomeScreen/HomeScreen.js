import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';
import {TextInputCom} from '../../components/TextInputCompenent/textInputCom';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {FrontPackageCom} from '../../components/FrontPackageComponent/frontPackageCom';
import {useDispatch} from 'react-redux';
import types from '../../Redux/type';

const HomeScreen = () => {
  const disptach = useDispatch();
  return (
    <View style={styles.container}>
      <FrontPackageCom />
      <TouchableOpacity onPress={() => disptach({type: types.LogoutType})}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
