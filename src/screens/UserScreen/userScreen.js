import {Text, View,StyleSheet, Image} from 'react-native';
import React from 'react';
import {styles} from './style';
import TextComponent from '../../components/textComponent/TextComponent';
import { color} from '../../components/color';
import { globalStyles } from '../../config/globalStyles';

const userScreen = () => {  

  return (
    <View style={styles.container}>
      <Text style={{...globalStyles.globalTextStyles,color:color.blacktext}}>Profile</Text>
      <Image style={styles.image} resizeMode='stretch' source={require('../../images/userImage.png')} />
    </View>

  );
};

export default userScreen;
