import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Permission,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../components/color';
import {VerticalCityImageComponent} from '../../components/VerticalCityImageComponent/VerticalCityImageComponent';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  CountryNameUrl,
  Google_Map_Key,
  IMAGE_BASED_URL,
} from '../../config/Urls';
import {errorMessage} from '../../components/NotificationMessage';
import {ApiGet} from '../../config/helperFunction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ThankYouScreen = ({route, navigation}) => {
  const item = route.params;

  //     if (res.status == 200) {
  //       setIsloading(false);
  //       setCountryPicker(res.json.data);
  //     } else {
  //       setIsloading(false);
  //       errorMessage(
  //         'Please Check Your Internet connection to get Countries Name.',
  //       );
  //     }
  //   });
  // };
  // useEffect(() => {
  //   getAllCountryName();
  // }, []);
  // const renderHeader = item => {
  //   return (
  //     <View style={{...styles.parentCardStyle}}>
  //       <View style={styles.parentCardTopTag}>
  //         <Text style={styles.parentCardTopTagText}>Order Details</Text>
  //       </View>
  //       <View style={styles.parentCardIconHolder}>
  //         <AntDesign
  //           name="shoppingcart"
  //           color={color.white}
  //           size={hp('3')}
  //           style={styles.iconStyle}
  //         />
  //         <View style={styles.parentCardRow}>
  //           <Text style={styles.parentCarddTextStyle}>Order ID:</Text>
  //           <Text style={styles.parentCarddTextStyle}>
  //             {item?.invoice_number}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.parentCardIconHolder}>
  //         <AntDesign name="calendar" color={color.white} size={hp('3')} />
  //         <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
  //           <Text style={styles.parentCarddTextStyle}>Date:</Text>
  //           <Text style={styles.parentCarddTextStyle}>
  //             {moment(item?.created_at)?.format('Do-MMM-YYYY')}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.parentCardIconHolder}>
  //         <AntDesign name="codesquareo" color={color.white} size={hp('3')} />
  //         <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
  //           <Text style={styles.parentCarddTextStyle}>Payment Type:</Text>
  //           <Text style={styles.parentCarddTextStyle}>
  //             {item?.payment_type}
  //           </Text>
  //         </View>
  //       </View>
  //       <View style={styles.parentCardIconHolder}>
  //         <Ionicons
  //           name="cash-outline"
  //           color={color.white}
  //           size={hp('3')}
  //           style={styles.iconStyle}
  //         />
  //         <View style={styles.parentCardRow}>
  //           <Text style={styles.parentCarddTextStyle}>Total:</Text>
  //           <Text style={styles.parentCarddTextStyle}>
  //             ${item?.total_price}
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  return (
    <ScrollView style={styles.container}>
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
        <Ionicons
          name="md-checkmark-circle-outline"
          color={'white'}
          size={80}
        />
      </View>
      {/* <View style={styles.orderDetContainer}>
        <Text style={styles.orderDetxt}>Order Details</Text>
        <Ionicons
          name="chevron-down-sharp"
          style={{textAlign: 'center'}}
          color={color.ThankYouColor}
          size={20}
        />
      </View> */}
      <View style={{...styles.parentCardStyle}}>
        <View style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>Order Details</Text>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="shoppingcart"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Order ID:</Text>
            <Text style={styles.parentCarddTextStyle}>
              {item?.invoice_number}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign name="calendar" color={color.white} size={hp('3')} />
          <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
            <Text style={styles.parentCarddTextStyle}>Date:</Text>
            <Text style={styles.parentCarddTextStyle}>
              {moment(item?.created_at)?.format('Do-MMM-YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign name="codesquareo" color={color.white} size={hp('3')} />
          <View style={{...styles.parentCardRow, marginTop: hp('0.7')}}>
            <Text style={styles.parentCarddTextStyle}>Payment Type:</Text>
            <Text style={styles.parentCarddTextStyle}>
              {item?.payment_type}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Ionicons
            name="cash-outline"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Total:</Text>
            <Text style={styles.parentCarddTextStyle}>
              ${item?.total_price}
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.thankuConatainer}>
        <Text style={styles.thankyouTxt}>Thank You!</Text>
        <Text style={styles.choseusTxt}>for Choosing us</Text>
      </View> */}
      {/* <VerticalCityImageComponent
        name={'alkjsflj'}
        data={countryPicker}
        heading={'Similar Places'}
      /> */}
      {/* secowog808@geekjun.com */}
    </ScrollView>
  );
};

export default ThankYouScreen;
