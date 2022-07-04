import {View, Text, Image, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../components/color';
import { VerticalCityImageComponent } from '../../components/VerticalCityImageComponent/VerticalCityImageComponent';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CountryNameUrl } from '../../config/Urls';
import { errorMessage } from '../../components/NotificationMessage';
import { ApiGet } from '../../config/helperFunction';
const ThankYouScreen = () => {
  const [countryPicker, setCountryPicker] = useState([]);

  const [isloading, setIsloading] = useState(true);
  const getAllCountryName = () => {
    ApiGet(CountryNameUrl).then(res => {
      console.log(res.json, 56666666666);
      if (res.status == 200) {
        setIsloading(false);
        setCountryPicker(res.json.data);
      } else {
        setIsloading(false);
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };

  useEffect(() => {
    getAllCountryName();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../images/Logo.png')}
        />
      </View>
      <View style={styles.thankuConatainer}>
        <Text style={styles.thankyouTxt}>Thank You!</Text>
        <Text style={styles.choseusTxt}>for Choosing us</Text>
        <Ionicons name='md-checkmark-circle-outline' color={'white'} size={100}/>
      </View>
      
      <View style={styles.orderDetContainer} > 
        <Text style={styles.orderDetxt}>Order Details</Text>
        <Ionicons name='chevron-down-sharp' style={{textAlign:'center'}} color={color.ThankYouColor} size={20}/>
      </View>
      <VerticalCityImageComponent   name={'alkjsflj'} data={countryPicker} heading={'Similar Places'}/>
    </View>
  );
};

export default ThankYouScreen;
