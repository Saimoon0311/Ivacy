import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BackHeaderCom} from '../../../components/BackHeaderComponent/backHeaderCom';
import {styles} from './styles';
import {SliderBox, FastImage} from 'react-native-image-slider-box';
import {globalStyles} from '../../../config/globalStyles';
import {color} from '../../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CityImageComponent} from '../../../components/CityImageComponrnt/cityImageComponent';
import {
  CountryNameUrl,
  IMAGE_BASED_URL,
  User_Image_Url,
} from '../../../config/Urls';
import {ApiGet} from '../../../config/helperFunction';
import {showMessage} from 'react-native-flash-message';
import {errorMessage} from '../../../components/NotificationMessage';
import Accordion from 'react-native-collapsible/Accordion';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

const PackageDetailScreen = ({route, navigation}) => {
  const [activeSession, setActiveSession] = useState([]);
  const items = route.params;
  // setorderDetailsState(items.get_package_journeys);

  const imagesLegth = items?.get_images.map(res => {
    return IMAGE_BASED_URL + res.title;
  });
  const {userData} = useSelector(state => state.userData);
  console.log(userData, 4555555555);
  // const navigateToPackage = item => {
  //   navigation.navigate('PackageScreen', {
  //     data: item,
  //     type: 'getPackage',
  //   });
  // };

  const renderHeader = item => {
    return (
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
    );
  };
  const _renderContent = item => {
    return (
      <View style={{...styles.parentCardStyle1}}>
        <View style={styles.parentCardTopTag}>
          <Text style={styles.parentCardTopTagText}>Guest Details</Text>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="camera"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Image</Text>
            <Image
              resizeMode="contain"
              style={{height: hp('4'), borderRadius: 5, width: wp('10')}}
              source={{
                uri: User_Image_Url + userData?.data?.avatar,
              }}
            />
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="user"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Full Name</Text>
            <Text style={styles.parentCarddTextStyle}>
              {userData?.data?.get_user_profile?.full_name}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <MaterialCommunityIcons
            name="email"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Email</Text>
            <Text style={styles.parentCarddTextStyle}>
              {userData?.data?.email}

              {/* {item?.get_user?.email} */}
              {/* {userData?.data?.get_user_profile} */}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="home"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Address</Text>
            <Text style={styles.parentCarddTextStyle}>
              {userData?.data?.get_user_profile?.address}

              {/* {userData?.get_user_profile?.address} */}
            </Text>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="phone"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Phone</Text>
            <TouchableOpacity
              onPress={() => {
                let number = userData?.data?.get_user_profile?.phone;
                Linking.openURL(`tel:${number}`);
              }}>
              <Text style={styles.parentCarddTextStyle}>
                {userData?.data?.get_user_profile?.phone}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.parentCardIconHolder}>
          <Fontisto
            name="world"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Country</Text>
            <Text style={styles.parentCarddTextStyle}>
              {userData?.data?.get_user_profile?.country}
              {console.log(userData?.data?.get_user_profile)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('GuiderMapViewScreen', item)}
          style={{
            ...styles.parentCardTopTag,
            alignSelf: 'flex-end',
            marginRight: wp('3'),
          }}>
          <Text style={styles.parentCardTopTagText}>Go to Map</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _updateSections = e => {
    setActiveSession(e);
  };
  const RenderAccordian = () => {
    return (
      <Accordion
        activeSections={activeSession}
        sections={items?.get_package_journeys}
        underlayColor="transparent"
        renderHeader={e => renderHeader(e)}
        renderContent={e => _renderContent(e)}
        onChange={e => _updateSections(e)}
      />
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <BackHeaderCom goBack={goback} /> */}
        <View style={styles.container}>
          <SliderBox
            imageLoadingColor={color.textBackgroundColor}
            ImageComponent={FastImage}
            images={imagesLegth}
            style={styles.flatListMainContainer}
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
              padding: 0,
            }}
          />
          <View style={{marginLeft: wp('2')}}>
            <Text
              style={{...globalStyles.globalTextStyles, fontSize: hp('3.5')}}>
              {items?.title}
            </Text>
            <Text
              style={{
                ...globalStyles.globalTextStyles,
                fontSize: hp('2'),
                textAlign: 'justify',
                width: wp('95'),
              }}>
              {items?.description}
            </Text>
            <Text style={styles.dateStyle}>{items?.from_date}</Text>
            <Text style={styles.toStyle}>To</Text>
            <Text style={styles.dateStyle}>{items?.end_date}</Text>
            <View style={styles.priceMainContainer}>
              <View>
                <Text style={styles.pricetxt}>Price</Text>
                <Text style={styles.packtxt}>${items?.price}/package</Text>
              </View>
            </View>

            {/* <CityImageComponent
              navigate={navigateToPackage}
              ml={wp('0.1')}
              data={countryPicker}
              isloading={isloading}
              heading={'Top Countries'}
            /> */}
          </View>
        </View>
        {RenderAccordian()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageDetailScreen;
