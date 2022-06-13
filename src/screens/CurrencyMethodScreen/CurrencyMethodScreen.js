import {TouchableOpacity,Text, View,ImageBackground,Image} from 'react-native';
import React from 'react';
import {styles} from './style';

const CurrencyMethodScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.paymenttextstyle}>
          <Text style={styles.text2}>Choose payment method</Text>
          </View>
     
      <View style={styles.InnerContainer}>
      
        <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} style={styles.boxContainer}>
          <Text style={styles.text}>Crypto</Text>
          <Image  style={styles.image} source={require('../../images/bitcoin.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} style={styles.boxContainer}>
        <Text style={styles.text}>Visa</Text>
          <Image resizeMode='contain' style={styles.image} source={require('../../images/creditcard.png')}/>
        </TouchableOpacity>
      </View>
      </View>
 
  );
};

export default CurrencyMethodScreen;
