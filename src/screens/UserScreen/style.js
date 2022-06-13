import { StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container:{
    fontSize:hp('6'),
    
  },
  image:{
    width:wp('45'),
    height:hp('25')
  }
 });
