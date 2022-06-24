import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import {BackHeaderCom} from '../../components/BackHeaderComponent/backHeaderCom';
import { styles } from './styles';
import {SliderBox, FastImage} from 'react-native-image-slider-box';
import { globalStyles } from '../../config/globalStyles';
import { color } from '../../components/color';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CityImageComponent } from '../../components/CityImageComponrnt/cityImageComponent';
import { CountryNameUrl, IMAGE_BASED_URL } from '../../config/Urls';
import {ApiGet} from '../../config/helperFunction';
import { showMessage } from 'react-native-flash-message';

const PackageDetailScreen = ({route,navigation}) => {
  
  const[countryPicker,setCountryPicker]=useState([]);
  
  const [isloading,setIsloading]=useState(true);
 
  const items=route.params;
  console.log(items,244444);
  const [images,setImage] =useState([
    IMAGE_BASED_URL+items?.get_images[0]?.title,
    IMAGE_BASED_URL+items?.get_images[0]?.title,
    // require('../../images/sale2.png'),
  // require('../../images/sale2.png'),
  // require('../../images/sale2.png'),
 ])
   
  const getAllCountryName =()=>{

    ApiGet(CountryNameUrl).then(res=>{
      // console.log(res.json,56666666666);
      if(res.status==200)
      {
        setIsloading(false);
        setCountryPicker(res.json.data)
      }
      else 
      {
        setIsloading(false);
        showMessage({
          type: 'danger',
          icon: 'auto',
          message: 'Warning',
          description:
            'Please Check Your Internet connection to get Countries Name.',
          floating: true,
          backgroundColor: color.textThirdColor,
          style: {alignItems: 'center'},
          autoHide: false,
        });
      }
    })
  }


  useEffect(() => {
  
      getAllCountryName();
  }, [])
  
  return (
    <>
      {/* <BackHeaderCom goBack={goback} /> */}
      <View style={styles.container} >

        <SliderBox
          imageLoadingColor={color.textBackgroundColor}
          ImageComponent={FastImage}
          images={images}
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
        <View style={{marginLeft:wp('2') }}>

        <Text style={{...globalStyles.globalTextStyles,fontSize:hp('3.5')}} >{items?.title}</Text>
        <Text style={{...globalStyles.globalTextStyles,fontSize:hp('2'),}} >
          {items?.description}</Text>
        <View style={styles.priceMainContainer}>

        <View >
        <Text style={styles.pricetxt} >Price</Text>
         <Text style={styles.packtxt}>${items?.price}/package</Text> 
        </View>
         <TouchableOpacity style={styles.boxNowContainer}>
          <Text style={styles.bookNowTxt}>Book Now</Text>
          </TouchableOpacity>   
        </View>
        <CityImageComponent  ml={wp('0.1')} data={countryPicker} isloading={isloading} heading={'Top Countries'} />

        </View>
    </View>

    </>
  );
};

export default PackageDetailScreen;
