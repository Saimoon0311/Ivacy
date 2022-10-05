import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {SliderBox, FastImage} from 'react-native-image-slider-box';
import {globalStyles} from '../../config/globalStyles';
import {color} from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CityImageComponent} from '../../components/CityImageComponrnt/cityImageComponent';
import {
  CountryNameUrl,
  IMAGE_BASED_URL,
  GetActivitesUrl,
  GetSpecFavoued,
  PackageByCountryUrl,
} from '../../config/Urls';
import {ApiGet} from '../../config/helperFunction';
import {errorMessage} from '../../components/NotificationMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {json} from 'express';
import {FlatList} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
const PackageDetailScreen = ({route, navigation}) => {
  const [countryPicker, setCountryPicker] = useState([]);
  const [activities, setActivities] = useState([]);
  const [scenery, setScenery] = useState([]);

  const [isloading, setIsloading] = useState(true);

  const items = route.params;
  const imagesLegth = items?.get_images.map(res => {
    return IMAGE_BASED_URL + res.title;
  });
  const navigateToPackage = (item, url) => {
    navigation.navigate('PackageScreen', {
      data: item,
      url: url,
    });
  };
  const getAllCountryName = (url, saveState) => {
    ApiGet(url).then(res => {
      if (res.status == 200) {
        setIsloading(false);
        saveState(res.json.data);
      } else {
        setIsloading(false);
        errorMessage(
          'Please Check Your Internet connection to get Countries Name.',
        );
      }
    });
  };
  const getDataNull = (url, state, dataType) => {
    if (dataType != null) {
      getAllCountryName(url, state);
    }
  };
  useEffect(() => {
    getAllCountryName(CountryNameUrl, setCountryPicker);
    let url = GetActivitesUrl + items.activity_2;
    let url2 = GetSpecFavoued + items.activity;
    getDataNull(url, setActivities, items.activity_2);
    getDataNull(url2, setScenery, items.activity);
  }, []);

  return (
    <SafeAreaView>
      {/* <SafeAreaView style={{marginTop: hp('-1.6')}}> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp('60')}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              top: hp('3'),
              left: wp('2'),
              position: 'absolute',
              zIndex: 1,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="arrow-back" color={'white'} size={hp('2')} />
          </TouchableOpacity>
          <SliderBox
            imageLoadingColor={color.textBackgroundColor}
            ImageComponent={FastImage}
            images={imagesLegth}
            style={styles.flatListMainContainer}
            arrow-back
            dotColor={color.textPrimaryColor}
            inactiveDotColor="#90A4AE"
            resizeMode={'cover'}
            autoplay
            circleLoop
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              // marginTop: hp('6'),
            }}
          />
          <View style={{marginLeft: wp('2')}}>
            <Text
              style={{...globalStyles.globalTextStyles,
              ...globalStyles.globalTextStyles3,
              fontSize: hp('3.5')}}>
              {items?.title}
            </Text>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2'),
                textAlign: 'justify',
                width: wp('95'),
                fontWeight: '400',
                ...globalStyles.globalTextStyles3,


              }}>
              {items?.description}
            </Text>
            <Text style={styles.dateStyle}>{items?.from_date}</Text>
            <Text style={styles.toStyle}>To</Text>
            <Text style={styles.dateStyle}>{items?.end_date}</Text>
            <Text style={{...styles.packtxt}}>Country</Text>
            <Text
              style={{...styles.boxText, width: wp('40'), textAlign: 'center',
          ...globalStyles.globalTextStyles3,
              
              }}>
              {items?.get_country?.name}
            </Text>
            {scenery.length > 0 && (
              <>
                <Text style={{...styles.packtxt, paddingBottom: hp('1')}}>
                  Favored Scenery
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {scenery.map(item => {
                    return <Text style={styles.boxText}>{item.name}</Text>;
                  })}
                </View>
              </>
            )}
            {activities.length > 0 && (
              <>
                <Text style={{...styles.packtxt, paddingBottom: hp('1')}}>
                  Activity
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {activities.map(item => {
                    return <Text style={styles.boxText}>{item.name}</Text>;
                  })}
                </View>
              </>
            )}
            {/* <Text
              style={{
                ...styles.packtxt,
                paddingBottom: hp('1'),
              }}>
              Price
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.boxText, fontSize: hp('2')}}>
                ${items?.price} package
              </Text>
            </View> */}
            {/* <View style={styles.priceMainContainer}>
              <View>
                <Text style={styles.pricetxt}>Price</Text>
                <Text style={styles.packtxt}>${items?.price} package</Text>
              </View>
            </View> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('CurrencyMethodScreen', items)}
              style={styles.boxNowContainer}>
              <Text style={styles.bookNowTxt}>Book Now (${items?.price})</Text>
            </TouchableOpacity>
            <Divider style={{marginTop: hp('2'), height: hp('1')}} />
            <CityImageComponent
              navigate={navigateToPackage}
              ml={wp('0.1')}
              data={countryPicker}
              isloading={isloading}
              heading={'Top Countries'}
              getPackageUrl={PackageByCountryUrl}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageDetailScreen;
