import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
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
const PackageDetailScreen = ({route,navigation}) => {
  const [topCities, setTopCities] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);
  const items=route.params;
  // console.log(15,items.get_Images.title);
  const [images,setImage] =useState([
    require('../../images/sale2.png'),
  require('../../images/sale2.png'),
  require('../../images/sale2.png'),
 ])
  // const goback = () => {
  //   navigation.goBack();
  // };
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
        <View style={{marginLeft:hp('2') }}>

        <Text style={{...globalStyles.globalTextStyles,fontSize:hp('3.5')}} >Bali</Text>
        <Text style={{...globalStyles.globalTextStyles,fontSize:hp('2'),}} >Bali is an Indonesian island known for its forested  volcanic mountains, iconic rice paddies.</Text>
        <View style={styles.priceMainContainer}>

        <View >
        <Text style={styles.pricetxt} >Price</Text>
         <Text style={styles.packtxt}>$500/package</Text> 
        </View>
         <TouchableOpacity style={styles.boxNowContainer}>
          <Text style={styles.bookNowTxt} >Book Now</Text>
          </TouchableOpacity>   
        </View>
        <CityImageComponent data={topCities} heading={'Top Cities'} />

        </View>
    {/* <Text style={{...globalStyles.globalTextStyles2,position:'absolute' ,top:40}} >Place Details</Text> */}
    </View>

    </>
  );
};

export default PackageDetailScreen;
