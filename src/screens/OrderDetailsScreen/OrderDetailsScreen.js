import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import {color} from '../../components/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import {ApiGet, ApiPost} from '../../config/helperFunction';
import {OrderDetailUrl, User_Image_Url} from '../../config/Urls';
import {
  errorMessage,
  successMessage,
} from '../../components/NotificationMessage';
import {globalStyles} from '../../config/globalStyles';
import moment from 'moment';
import {SkypeIndicator} from 'react-native-indicators';
import {NoDataView} from '../../components/NoDataView/noDataView';

// import StarRating from 'react-native-star-rating';
// import {ApiGet} from '../../config/helperFunction';
// import {ReviewUrl} from '../../config/Urls';
// import {errorMessage} from '../../components/NotificationMessage';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import moment from 'moment';
// import {useIsFocused} from '@react-navigation/native';
const OrderDetailsScreen = ({navigation}) => {
  const [activeSession, setActiveSession] = useState([]);
  const [orderDetailsState, setOrderDetailsState] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const {userData} = useSelector(state => state.userData);

  const [imageState, setImageState] = useState(false);
  const [imageNameState, setImageNameState] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  console.log('start', fadeAnim);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true, // Add This line
    }).start();
  };
  const CustomImageView = () => {
    // Will change fadeAnim value to 1 in 5 seconds

    return (
      <Pressable
        style={{position: 'absolute', backgroundColor: 'red'}}
        onPress={() => fadeOut()}>
        <Animated.View
          style={{
            ...styles.CustomImageConatainer,
            opacity: fadeAnim,
            // position: 'absolute',
          }}
          // style={[
          //   styles.fadingContainer,
          //   {
          //     // Bind opacity to animated value
          //     opacity: fadeAnim,
          //   },
          // ]}
          // style={{
          //   // Bind opacity to animated value
          //   opacity: fadeAnim,
          // }}
        >
          {/* <Pressable
          // style={styles.CustomImageConatainer}
          // onLongPress={() => {
          //   setImageState(false);
          //   console.log(6265646, imageState);
          //   // setTimeout(() => {
          //   // }, 2000);
          // }}
          onPress={() => {
            setImageState(false);
            // setTimeout(() => {
            //   console.log(62, imageState);
            // }, 3000);
            fadeOut();
          }}> */}
          <Image
            source={{uri: imageNameState}}
            resizeMode="contain"
            style={{height: hp('50'), width: wp('60')}}
          />
          {/* </Pressable> */}
        </Animated.View>
      </Pressable>
    );
  };

  const _updateSections = e => {
    setActiveSession(e);
  };
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
          <Text style={styles.parentCardTopTagText}>Guider Detail</Text>
        </View>
        <View style={styles.parentCardIconHolder}>
          <AntDesign
            name="camera"
            color={color.white}
            size={hp('3')}
            style={styles.iconStyle}
          />
          <View style={styles.parentCardRow}>
            <Text style={styles.parentCarddTextStyle}>Guider Image</Text>
            <TouchableOpacity
              onPress={() => {
                setImageNameState(
                  User_Image_Url + item?.get_journey_guider?.avatar,
                ),
                  setImageState(true),
                  fadeIn();
              }}>
              <Image
                resizeMode="contain"
                style={{height: hp('4'), borderRadius: 5, width: wp('10')}}
                source={{
                  uri: User_Image_Url + item?.get_journey_guider?.avatar,
                }}
              />
            </TouchableOpacity>
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
              {item?.get_journey_guider_profile?.full_name}
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
              {item?.get_journey_guider?.email}
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
              {item?.get_journey_guider_profile?.address}
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
                let number = item?.get_journey_guider_profile?.phone;
                Linking.openURL(`tel:${number}`);
              }}>
              <Text style={styles.parentCarddTextStyle}>
                {item?.get_journey_guider_profile?.phone}
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
              {item?.get_journey_guider_profile?.country}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => errorMessage('This Feature is still on development.')}
          // onPress={() => navigation.navigate('MapViewScreen', item)}
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

  const navigate = () => {
    navigation.goBack();
  };
  let url = OrderDetailUrl + userData.data.id;

  const GetOrderDetailFunc = () => {
    ApiGet(url, userData.access_token).then(res => {
      console.log(url, 2288);
      if (res.status == 200) {
        setOrderDetailsState(res.json.data);
        setIsloading(false);
      } else {
        successMessage('Network Failed');
        setIsloading(true);
      }
    });
  };

  useEffect(() => {
    GetOrderDetailFunc();
  }, []);
  const RenderAccordian = () => {
    return (
      <Accordion
        activeSections={activeSession}
        sections={orderDetailsState}
        underlayColor="transparent"
        renderHeader={e => renderHeader(e)}
        renderContent={e => _renderContent(e)}
        onChange={e => _updateSections(e)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <BackHeaderCom text={'Order Details'} goBack={navigate} />
      {isloading ? (
        <SkypeIndicator
          color={color.boxColor}
          size={hp('7')}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
      ) : orderDetailsState == 0 ? (
        <NoDataView text={'Order Not Found'} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}>
          {RenderAccordian()}
        </ScrollView>
      )}
      {/* {imageState && CustomImageView()} */}
      {console.log(fadeAnim, 360)}
      {fadeAnim != 0 ? CustomImageView() : null}
    </View>
  );
};

export default OrderDetailsScreen;
{
  /* <Pressable onPress={() => fadeOut()}>
<Animated.View
  // style={{ ...styles.CustomImageConatainer, opacity: fadeAnim }}
  style={[
    styles.fadingContainer,
    {
      // Bind opacity to animated value
      opacity: fadeAnim,
    },
  ]}
  // style={{
  //   // Bind opacity to animated value
  //   opacity: fadeAnim,
  // }}
>
  {/* <Pressable
// style={styles.CustomImageConatainer}
// onLongPress={() => {
//   setImageState(false);
//   console.log(6265646, imageState);
//   // setTimeout(() => {
//   // }, 2000);
// }}
onPress={() => {
setImageState(false);
// setTimeout(() => {
//   console.log(62, imageState);
// }, 3000);
fadeOut();
}}> */
}
// <Image
//   source={{uri: imageNameState}}
//   resizeMode="contain"
//   style={{height: hp('50'), width: wp('60')}}
// />
{
  /* </Pressable> */
}
// </Animated.View>
// </Pressable> */}
