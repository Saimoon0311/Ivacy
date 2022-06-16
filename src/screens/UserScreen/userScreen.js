import {Text, View,StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard} from 'react-native';
import React,{useEffect,useState} from 'react';
import {styles} from './style';
import { color} from '../../components/color';
import { globalStyles } from '../../config/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextImageComponent from '../../components/TextImageComponent/TextImageComponent';
import { BackHeaderCom } from '../../components/BackHeaderComponent/backHeaderCom';


const userScreen = ({navigation}) => {  
  const goBack =()=>{
    navigation.goBack();
  }
  return (
    <>
    <BackHeaderCom goBack={goBack}/>
          
    <ScrollView  showsVerticalScrollIndicator={false}   contentContainerStyle={{...styles.container,}}>
      <Text style={{...globalStyles.globalTextStyles,color:color.blacktext,textAlign:'center',marginBottom:hp('1.5')}}>Profile</Text>
      <Image style={styles.image} resizeMode='contain' source={require('../../images/userImage.png')} />
      <Text style={{...globalStyles.globalTextStyles,textAlign:'center',color:color.blacktext,marginVertical:hp('1.5')}}>John Doe</Text>
        
<TextImageComponent iconName={"person"} text={"Personal Information"}/>
<TextImageComponent iconName={"language"} text={"Language & Communication"}/>
<TextImageComponent iconName={"bookmark-outline"} text={"My orders"}/>
<TextImageComponent iconName={"settings-outline"} text={"Settings"}/>
<TextImageComponent iconName={"chatbox"}  text={"Support"}/>
<TextImageComponent iconName={"alert-circle-outline"} text={"About the app"}/>
<TextImageComponent iconName={"md-star-outline"} text={"Rate us"}/>
<TextImageComponent iconName={"log-in-outline"} textcolor={color.textThirdColor} text={"Log-Out"}/>
</ScrollView>
</>
  );
};

export default userScreen;
